---
name: test-component
description: Escribe o amplía los tests de un componente, composable o función de nono-ui (Vitest Browser Mode en el Chromium de Docker, showcase visual al estilo Vuetify). Usar cuando se pida testear algo de src/, añadir tests a un componente o a una de sus props, slots o emits, o generar/actualizar sus capturas.
argument-hint: <Componente|composable> [prop|slot|emit]
---

# Tests de nono-ui

Argumentos: `$ARGUMENTS` — el componente o composable (p. ej. `Badge`, `useTheme`) y, opcionalmente, qué parte testear (`label`, `slots > leading`…). Si se indica una parte, testear **solo esa parte**.

## Antes de escribir
1. Leer el código: el `.vue`, su `index.ts` (props, slots, variantes) y `constants.ts` (`xxxDefaults`, `xxxSizes`…).
2. Leer el test existente, si lo hay, y seguir su estilo.
3. Si el usuario pregunta «¿qué testearías?», responder con la propuesta en una tabla y **no escribir nada** hasta que diga que sí.

## Dónde va cada test
| Qué | Archivo | Entorno |
|---|---|---|
| Componente | `src/components/X/__tests__/X.spec.browser.ts` (uno solo) | Chromium de Docker |
| Función o composable sin pantalla | `src/**/__tests__/nombre.spec.ts` | jsdom |
| Composable que necesita navegador (medir, foco, scroll) | `src/**/__tests__/nombre.spec.browser.ts` | Chromium de Docker |

- En los `.spec.ts` (jsdom) **no importar `@test`**: trae cosas del navegador. Para montar, `mount` de `@vue/test-utils`.
- Lógica pura dentro de la carpeta de un componente (p. ej. una función de `index.ts`): su propio `nombre.spec.ts`, con el nombre de lo que prueba.

## Reglas
- **Nunca comprobar clases.** Se mide el efecto real en el navegador:
  - estilos calculados: `getComputedStyle(el).color`, `borderRadius`, `opacity`…
  - tamaño y posición: `getBoundingClientRect()` (antes/después = posición en pantalla, no orden en el HTML)
  - atributos: `getAttribute(...)` (`null` = no está), texto (`textContent`, `getByText`), si un nodo existe
  - el aspecto general lo cubre `showcase`.
- **Textos de los tests en inglés y descriptivos**: `it`, `text` de los cases, títulos de las stories y mensajes de error de los helpers. P. ej. `'with an unknown theme token paints with primary'`. Los `describe` usan las claves técnicas (`props`, `label`, `slots`, `emits`, `attrs`). Los comentarios del código pueden seguir en español.
- **Estructura**: `describe('X') > describe('props') > describe('<prop>')`, luego `slots`, `emits`, `attrs` y `showcase` al final.
- **Tablas** (`cases`) solo en props y attrs: `const casesX = [...] as const` justo encima de `it.each(casesX)('$text', …)`. Cada caso: `{ text, input, expected: { <nodo>: { <lo medido> } } }`, con las claves de nodo según su `data-test-*` (`root`, `leading`, `'trailing-icon'`). El `it.each` monta una vez y compara un objeto con la misma forma que `expected`.
- **Slots y emits**: un `it` explícito por comportamiento, sin cases. Los slotProps se prueban con `vi.fn` + `toHaveBeenLastCalledWith`, y sus funciones por su efecto.
- **Defaults desde las constantes**: lo esperado por defecto sale de `xxxDefaults`. Si no se puede escribir directamente, comparar con el componente montado con el default explícito (`'by default has the same size as with badgeDefaults.size'`).
- **Un `it`, una responsabilidad**: sin `if` dentro del test ni valores que dependan de datos definidos lejos.
- **No probar Vue**: si la prop se pinta tal cual (`{{ props.label }}`), sin tests: ni «muestra el texto», ni «al cambiar X…», ni «por defecto no muestra nada». Esa prop va como fila en `showcase` (`label: ['Badge', 'A longer badge label']`). Solo cuando hay lógica propia entre la prop y el resultado (un `computed`, un `watch`, un valor por defecto con efecto que no se ve, como `aria-hidden`).
- **No probar lo que hace un componente hijo** (`Icon`, `Button`…): se prueba en el suyo. P. ej. el `aria-hidden` de un icono lo pone `Icon`, así que no va en el test de Badge ni de Alert. Sí se prueba lo que el componente le pasa (el `aria-label` que da al botón de cerrar).
- **Si la lógica solo cambia el aspecto, basta el `showcase`**: p. ej. que un `size` o `variant` no válido use el valor por defecto se cubre añadiendo `null` y `'unknown-x'` a los valores de esa prop en `showcase`, sin test.
- **Nodos como constantes** arriba del archivo, sin comentario: `const ROOT = '[data-test-badge-root]'`. Solo los que el archivo usa (ESLint da error con los no usados).
- No ampliar los helpers compartidos (`tests/helpers`) con casos de un componente: van en su test o en un helper local (`renderBadge`).
- **attrs** con `attrsTests` de `@test` (`tests/utils/attrsTests.ts`), no a mano: comprueba que los atributos llegan a la raíz, que una `class` propia gana y que un `style` propio no quita los del componente. La clase la pone el test del componente (Tailwind solo genera las de `src/`):
  Se llama dentro de `describe('attrs') > describe('<nodo>')`, escritos en el test del componente:
  ```ts
  describe('attrs', () => {
    describe('root', () => {
      attrsTests({
        component: Badge,
        props: { label: 'Nuevo' },
        root: ROOT,
        class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
        keeps: ['backgroundColor'],
      })
    })
  })
  ```
  Si el componente manda los attrs a otro elemento (el contenido de un Dialog, Tooltip…), `root` es ese elemento.
  Los atributos que entran por `ui` (`ui.label`, `ui.content`…) se prueban igual, en `describe('props') > describe('ui') > describe('<nodo>')`, con `toProps` para decir por dónde entran: `toProps: (attrs) => ({ ui: { label: () => attrs } })`. Si la función de `ui` recibe contexto, aparte un `it` con `vi.fn` + `toHaveBeenLastCalledWith`.
- Avisar si un test está mal o si falta cobertura.

## Plantilla de un componente
```ts
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { render, showcase } from '@test'
import { themeColors } from '@/components/constants'
import { Badge, badgeDefaults, badgeSizes, type BadgeProps } from '..'

const ROOT = '[data-test-badge-root]'

async function renderBadge(props: BadgeProps = {}) {
  const screen = await render(Badge, { props })
  const root = screen.container.querySelector<HTMLElement>(ROOT)!

  return { screen, root }
}

// color que calcula el navegador para un valor CSS (var(--x), #hex…)
function resolveColor(value: string) {
  const probe = document.body.appendChild(document.createElement('span'))
  probe.style.color = value
  const color = getComputedStyle(probe).color
  probe.remove()

  return color
}

describe('Badge', () => {
  describe('props', () => {
    describe('color', () => {
      const casesColor = [
        {
          text: 'with a theme token paints with that token color',
          input: { color: 'error', variant: 'outline' },
          expected: { root: { color: 'var(--error)' } },
        },
      ] as const

      it.each(casesColor)('$text', async ({ input, expected }) => {
        const { root } = await renderBadge(input)

        expect({ root: { color: getComputedStyle(root).color } }).toEqual({
          root: { color: resolveColor(expected.root.color) },
        })
      })
    })
  })

  showcase({
    component: Badge,
    base: { label: 'Badge' },
    props: { size: badgeSizes, color: [...themeColors, '#6366f1'] },
    stories: { 'With icon': () => h(Badge, { label: 'Badge', icon: 'check' }) },
  })
})
```
- `render(Componente, { props, slots, attrs })` es asíncrono. Devuelve `container`, localizadores (`getByText`, `getByRole`…), `rerender(props)` y `emitted()`.
- Interacción: `userEvent` de `@test` (`await userEvent.click(...)`).
- Si al cambiar una prop se sustituye el nodo (p. ej. `<component :is>`), volver a buscarlo después del `rerender`.

## showcase
`showcase({ component, base, props, stories, mobile })` genera en el test una página con todas las variantes y la captura entera en `light` y `dark`:
- `props`: una fila por prop, una variante por valor; un booleano pinta `true` y `false`. Valores sacados de las constantes (`xxxSizes`, `xxxVariantNames`, `themeColors`).
- `base`: props comunes a todas las variantes (las obligatorias).
- `slots`: slots comunes a las variantes de `props`, cuando el componente necesita contenido para verse (p. ej. `{ default: () => h('div', …) }` en Chip).
- `stories`: casos a mano, como funciones con `h()` (los tests no compilan JSX).
- Combinaciones con **`gridOn(filas, columnas, (fila, columna) => h(...))`** de `@test`, como en Vuetify: una fila titulada por cada valor, con una celda por columna. Con `[null]` como filas, una sola fila sin título. Con `{ captions: true }` como cuarto argumento, cada celda lleva debajo el valor de su columna (p. ej. el color, con un label corto como `'K'`).
  ```ts
  stories: {
    'Variant x color': gridOn(badgeVariantNames, themeColors, (variant, color) =>
      h(Badge, { label: color, variant, color }),
    ),
  }
  ```
- **Qué va en tests y qué en `showcase`**, como Vuetify: lo visual (size, variant, color, radius, iconos…) solo en `showcase`, sin tests de comportamiento. Los tests, para lo que no se ve o la captura no asegura: texto calculado (un sufijo, un plural, un valor formateado; no una prop pintada tal cual), accesibilidad, slots, attrs, emits, lógica (p. ej. un sufijo `+` por `max`).
- `columns: N` reparte el ancho de la página en N columnas iguales para las variantes y las celdas de `gridOn` (una story con `gridOn` ocupa la fila entera). Para componentes anchos (`w-full`) como Alert, que así miden 1/N de la página sin darles un ancho fijo; sin él, van en línea.
- `hideCaptions: ['label', …]` quita el pie de las filas de esas props cuando el valor ya se lee en la variante (textos como `label` o `description`). El diff sigue nombrando cada variante.
- `mobile: true` **solo si el diseño cambia con el ancho** (diálogos, pestañas, paginación…). Por defecto, 2 capturas.
- No se multiplican las paletas `data-neutral` en cada componente: van en un test propio del tema.
- No usar los ejemplos de las docs.

## Pasos
1. Docker Desktop abierto (`npm test` levanta el navegador solo con `pretest`).
2. Escribir **de uno en uno**: la parte pedida, y esperar confirmación antes de seguir con otra.
3. `npm test -- X` (o `npm run test:watch -- X`).
4. Si es la primera vez del `showcase`, fallará con *"No existing reference screenshot found"*: generar con `npm run test:update -- X`.
5. **Abrir y revisar** las capturas de `__tests__/__screenshots__/X.spec.browser.ts/` (`light-desktop-chromium.png`…) antes de darlas por buenas.
6. Lint y tipos: `npx eslint src/components/X` y `npx vue-tsc --noEmit`.
7. Commit solo si el usuario lo pide, directamente en `main`, con el test **y sus PNG**.

## Si algo falla
| Mensaje | Qué hacer |
|---|---|
| *No browser at ws://127.0.0.1:6677/* | Abrir Docker Desktop y relanzar |
| *No existing reference screenshot found* | `npm run test:update -- X` y revisar las PNG |
| *N pixels differ* | El error empieza con *Changed:* y lista lo que ha cambiado: fila y variante (`Props > size > xs`, `Stories > Variant x color > soft / primary`); lo que solo se ha movido no sale. Mirar su diferencia en `.vitest-attachments/` y actualizar solo si el cambio es intencionado |
| Tras `test:update` la PNG sigue enseñando lo de antes | El cambio es tan suave que no pasa el umbral, así que no falla y `-u` no la reescribe. Borrar esa PNG y volver a generar |
| *No test files found* | El filtro no coincide, o falta `__tests__` / la terminación `.spec(.browser).ts` |
| Prettier marca archivos que no has tocado | Solo finales de línea (CRLF por `core.autocrlf`); el contenido está bien |
