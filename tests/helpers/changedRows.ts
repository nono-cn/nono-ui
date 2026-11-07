import { commands } from 'vitest/browser'

// Cuando falla la captura del showcase, compara la referencia con la actual y añade al error
// qué ha cambiado: primero fila por fila y, dentro de las filas cambiadas, cada variante
// (un valor de una prop o una celda de gridOn).

/** Zona de la captura, en píxeles relativos a la galería. */
export interface ShowcaseBox {
  title: string
  top: number
  bottom: number
  left: number
  right: number
  /** Variantes de la fila con nombre propio. */
  parts: ShowcaseBox[]
}

// Diferencia mínima por canal para contar un píxel como cambiado.
const TOLERANCE = 8
// Píxeles distintos que se ignoran en una zona: al desplazarse medio píxel, el suavizado del
// texto cambia unos pocos píxeles aunque el contenido sea el mismo.
const NOISE_PIXELS = 32
// Cuánto se busca a los lados una variante: si otra de su fila se ensancha, se desplaza.
const MAX_SHIFT_X = 64

async function loadPixels(path: string) {
  const image = new Image()
  image.src = `data:image/png;base64,${await commands.readImageBase64(path)}`
  await image.decode()

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext('2d')!
  context.drawImage(image, 0, 0)

  return context.getImageData(0, 0, image.width, image.height)
}

// Compara la zona de la captura actual con la de la referencia desplazada (dx, dy): el píxel
// (x, y) de la actual se compara con el (x - dx, y - dy) de la referencia.
function differsAt(reference: ImageData, actual: ImageData, box: ShowcaseBox, dx: number, dy: number) {
  const right = Math.min(box.right, actual.width)
  const bottom = Math.min(box.bottom, actual.height)

  // Si la zona no cabe en la referencia con ese desplazamiento, cuenta como cambiada.
  if (box.left - dx < 0 || box.top - dy < 0) return true
  if (right - dx > reference.width || bottom - dy > reference.height) return true

  let differing = 0
  for (let y = box.top; y < bottom; y++) {
    for (let x = box.left; x < right; x++) {
      const a = ((y - dy) * reference.width + (x - dx)) * 4
      const b = (y * actual.width + x) * 4
      for (let channel = 0; channel < 4; channel++) {
        if (Math.abs(reference.data[a + channel]! - actual.data[b + channel]!) > TOLERANCE) {
          if (++differing > NOISE_PIXELS) return true
          break
        }
      }
    }
  }

  return false
}

// 0, 1, 2… hasta `to` (también negativo)
function range(to: number) {
  return Array.from({ length: Math.abs(to) + 1 }, (_, i) => i * Math.sign(to || 1))
}

// 0, -1, 1, -2, 2… hasta ±max
function around(max: number) {
  return [0, ...Array.from({ length: max }, (_, i) => [-(i + 1), i + 1]).flat()]
}

// Una zona ha cambiado si no aparece igual en la referencia con ningún desplazamiento: si
// algo de encima ha crecido, lo de debajo solo se ha movido (en vertical, entre 0 y la
// diferencia de alto de la página); si una variante se ensancha, las de su lado se mueven.
function boxDiffers(
  reference: ImageData,
  actual: ImageData,
  box: ShowcaseBox,
  shiftsX: number[],
  shiftsY: number[],
) {
  return !shiftsY.some((dy) => shiftsX.some((dx) => !differsAt(reference, actual, box, dx, dy)))
}

function screenshotPath(message: string, label: string) {
  return message.match(new RegExp(`${label} screenshot:\\s*(.+?\\.png)`))?.[1]
}

/** Añade al error de `toMatchScreenshot` qué filas y variantes del showcase han cambiado. */
export async function describeChanges(error: unknown, rows: ShowcaseBox[]) {
  if (!(error instanceof Error)) return

  // eslint-disable-next-line no-control-regex
  const message = error.message.replace(/\x1b\[[0-9;]*m/g, '')
  const referencePath = screenshotPath(message, 'Reference')
  const actualPath = screenshotPath(message, 'Actual')
  // Sin las dos rutas (p. ej. no hay referencia todavía) no hay nada que comparar.
  if (!referencePath || !actualPath) return

  try {
    const [reference, actual] = await Promise.all([
      loadPixels(referencePath),
      loadPixels(actualPath),
    ])
    const shiftsY = range(actual.height - reference.height)
    const shiftsX = around(MAX_SHIFT_X)

    const changed = rows
      .filter((row) => boxDiffers(reference, actual, row, [0], shiftsY))
      .map((row) => {
        const parts = row.parts.filter((part) =>
          boxDiffers(reference, actual, part, shiftsX, shiftsY),
        )
        // Sin variantes cambiadas (o sin variantes con nombre), ha cambiado la fila en sí.
        return parts.length ? `${row.title} > ${parts.map((p) => p.title).join(', ')}` : row.title
      })
    if (!changed.length) return

    const lines = ['Changed:', ...changed.map((title) => `  ${title}`)]
    if (reference.height !== actual.height) {
      lines.push(`The page height changed (${reference.height}px → ${actual.height}px).`)
    }
    error.message = `${lines.join('\n')}\n\n${error.message}`
  } catch (reason) {
    // Si no se pueden comparar las capturas, se avisa y se deja el error original.
    const detail = reason instanceof Error ? reason.message : String(reason)
    error.message = `Could not compare the screenshots (${detail}). If you are in watch mode, restart it.\n\n${error.message}`
  }
}
