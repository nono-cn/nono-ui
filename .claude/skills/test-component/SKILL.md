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
| Componente | `src/components/X/__tests__/X.spec.browser.tsx` (uno solo, en JSX) | Chromium de Docker |
| Función o composable sin pantalla | `src/**/__tests__/nombre.spec.ts` | jsdom |
| Composable que necesita navegador (medir, foco, scroll) | `src/**/__tests__/nombre.spec.browser.ts` | Chromium de Docker |

- JSX en lugar de `h()`: `<Badge label="Nuevo" />`, slots como `{{ leading: () => <span /> }}` o hijos.

- En los `.spec.ts` (jsdom) **no importar `@test`**: trae cosas del navegador. Para montar, `mount` de `@vue/test-utils`.
- Lógica pura dentro de la carpeta de un componente (p. ej. una función de `index.ts`): su propio `nombre.spec.ts`, con el nombre de lo que prueba.

## Reglas
- **Criterio: ¿se ve en la captura?** Si sí, va en una story del `showcase`; si no, en un test. Aunque haya lógica detrás (un `v-if`, una prioridad, un valor por defecto), si su único efecto es visual basta la captura. Los tests son solo para lo que una captura no puede asegurar:
  - atributos y accesibilidad: `type`, `disabled`, `role`, `aria-*`, nombre accesible
  - eventos: que se emiten, que se bloquean, que no llegan al padre
  - slotProps: los argumentos que recibe el slot y el efecto de sus funciones (el `close` de Alert)
  - attrs y `ui`: que llegan al elemento (`attrsTests`)
  - el elemento que se renderiza (`as`, `asChild`), texto calculado, lógica sin efecto visual
  - Ejemplos que van en `showcase` y no en tests: que un slot sustituya a un icono o al label, qué gana cuando hay varios (`loading` sobre `leading`), el tamaño heredado de un grupo, el hover según `as`, un `size` no válido.
- **Nunca comprobar clases.** Se mide el efecto real en el navegador:
  - estilos calculados: `getComputedStyle(el).color`, `borderRadius`, `opacity`…
  - tamaño y posición: `getBoundingClientRect()` (antes/después = posición en pantalla, no orden en el HTML)
  - atributos: `getAttribute(...)` (`null` = no está), texto (`textContent`, `getByText`), si un nodo existe
  - el aspecto general lo cubre `showcase`.
- **Textos de los tests en inglés y descriptivos**: `it`, `text` de los cases, títulos de las stories y mensajes de error de los helpers. P. ej. `'with an unknown theme token paints with primary'`. Los `describe` usan las claves técnicas (`props`, `label`, `slots`, `emits`, `attrs`). **Sin comentarios** en el código de los tests ni de los helpers.
- **Estructura**: `describe('X') > describe('props') > describe('<prop>')`, luego `slots`, `emits`, `attrs` y `showcase` al final. Solo los bloques que tengan algún test (p. ej. sin `slots` si todos sus casos son visuales).
- **Tablas** (`cases`) solo en props y attrs: `const casesX = [...] as const` justo encima de `it.each(casesX)('$text', …)`. Cada caso: `{ text, input, expected: { <nodo>: { <lo medido> } } }`, con las claves de nodo según su `data-test-*` (`root`, `leading`, `'trailing-icon'`). El `it.each` monta una vez y compara un objeto con la misma forma que `expected`.
- **Slots y emits**: un `it` explícito por comportamiento, sin cases. De los slots solo se prueba lo que no se ve: los slotProps con `vi.fn` + `toHaveBeenLastCalledWith`, sus funciones por su efecto, y lo que dé accesibilidad (un control anidado en Label). Que el slot sustituya algo va en una story `Slots` con un `Part` por caso (`'leading replaces icon'`).
- **Defaults desde las constantes**: lo esperado por defecto sale de `xxxDefaults`. Si no se puede escribir directamente, comparar con el componente montado con el default explícito (`'by default has the same size as with badgeDefaults.size'`).
- **Un `it`, una responsabilidad**: sin `if` dentro del test ni valores que dependan de datos definidos lejos.
- **No probar Vue**: si la prop se pinta tal cual (`{{ props.label }}`), sin tests: ni «muestra el texto», ni «al cambiar X…», ni «por defecto no muestra nada». Esa prop va en una story del `showcase` (un label corto y uno largo). Solo cuando hay lógica propia entre la prop y el resultado (un `computed`, un `watch`, un valor por defecto con efecto que no se ve, como `aria-hidden`).
- **No probar lo que hace un componente hijo** (`Icon`, `Button`…): se prueba en el suyo. P. ej. el `aria-hidden` de un icono lo pone `Icon`, así que no va en el test de Badge ni de Alert. Sí se prueba lo que el componente le pasa (el `aria-label` que da al botón de cerrar).
- **Valores no válidos**: que un `size` o `variant` no válido use el valor por defecto se cubre añadiendo `null` y `'unknown-x'` a los valores de esa prop en su story del `showcase`, sin test.
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
```tsx
import { describe, expect, it } from 'vitest'
import { Part, render, showcase } from '@test'
import { themeColors } from '@/components/constants'
import { Badge, badgeSizes, badgeVariantNames, type BadgeProps } from '..'

const ROOT = '[data-test-badge-root]'

async function renderBadge(props: BadgeProps = {}) {
  const screen = await render(Badge, { props })
  const root = screen.container.querySelector<HTMLElement>(ROOT)!

  return { screen, root }
}

const sizes = [...badgeSizes, null, 'unknown-size'] as BadgeProps['size'][]
const variants = [...badgeVariantNames, null, 'unknown-variant'] as BadgeProps['variant'][]

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
    stories: {
      Size: () => (
        <div class="flex flex-wrap items-end gap-4">
          {sizes.map((size) => (
            <Part name={String(size)} caption>
              <Badge label="Badge" size={size} />
            </Part>
          ))}
        </div>
      ),
      'Variant x color': () => (
        <div class="grid gap-3">
          {variants.map((variant) => (
            <Part name={String(variant)} title>
              <div class="flex flex-wrap items-center gap-3">
                {themeColors.map((color) => (
                  <Part name={`${variant} / ${color}`}>
                    <Badge label={color} variant={variant} color={color} />
                  </Part>
                ))}
              </div>
            </Part>
          ))}
        </div>
      ),
    },
  })
})
```
- Los valores no válidos (`null`, `'unknown-x'`) no encajan en el tipo de la prop: el array se tipa con `as XProps['size'][]`.
- `render(Componente, { props, slots, attrs })` es asíncrono. Devuelve `container`, localizadores (`getByText`, `getByRole`…), `rerender(props)` y `emitted()`.
- Interacción: `userEvent` de `@test` (`await userEvent.click(...)`).
- Si al cambiar una prop se sustituye el nodo (p. ej. `<component :is>`), volver a buscarlo después del `rerender`.

## showcase
`showcase({ stories, mobile })` genera en el test una página con una sección por story y la captura entera en `light` y `dark`:
- `stories`: `{ 'Título': () => <jsx /> }`. Cada story ocupa todo el ancho y su layout se escribe a mano con Tailwind (`flex`, `grid grid-cols-2`…), como en Vuetify. Valores sacados de las constantes (`xxxSizes`, `xxxVariantNames`, `themeColors`) con `.map`.
- **`<Part name>`** de `@test` envuelve cada pieza con nombre: si la captura falla, el error dice cuáles han cambiado (`Changed: Variant x color > soft / primary`).
  - `caption`: pie debajo (`true` = el `name`, o un texto).
  - `title`: título encima, a la izquierda (`true` = el `name`, o un texto). Para filas: un `Part` con `title` que contiene un `div` con los `Part` de cada valor.
  - Anidados, el diff nombra solo el más interno que ha cambiado.
- **Estados forzados**: `data-showcase-force="hover"` en un elemento (o varios estados: `"hover active"`) fuerza esa pseudoclase en la captura por CDP: `hover`, `focus-visible`, `active`… Así se ven a la vez en muchos elementos, cosa que el ratón o el foco reales no permiten. P. ej. `<Button label="Button" data-showcase-force="focus-visible" />`. Para estados por variante y color, una story `Variant x color x state`.
- Componentes anchos (`w-full`) como Alert: en `grid grid-cols-2`, para que midan media página.
- Un booleano se pinta con `true` y `false`; un componente que necesita contenido para verse (Chip) lo recibe como hijo en cada pieza.
- **Qué va en tests y qué en `showcase`**: ver el criterio de Reglas. Todo lo que se ve (size, variant, color, radius, iconos, slots que sustituyen contenido, prioridades visuales) solo en `showcase`, con un `Part` con nombre por caso para que el diff diga cuál ha cambiado.
- `mobile: true` **solo si el diseño cambia con el ancho** (diálogos, pestañas, paginación…). Por defecto, 2 capturas.
- No se multiplican las paletas `data-neutral` en cada componente: van en un test propio del tema.
- No usar los ejemplos de las docs.

## Pasos
1. Docker Desktop abierto (`npm test` levanta el navegador solo con `pretest`).
2. Escribir **de uno en uno**: la parte pedida, y esperar confirmación antes de seguir con otra.
3. `npm test -- X` (o `npm run test:watch -- X`).
4. Si es la primera vez del `showcase`, fallará con *"No existing reference screenshot found"*: generar con `npm run test:update -- X`.
5. **Abrir y revisar** las capturas de `__tests__/__screenshots__/X.spec.browser.tsx/` (`light-desktop-chromium.png`…) antes de darlas por buenas.
6. Lint y tipos: `npx eslint src/components/X` y `npx vue-tsc --noEmit`.
7. Commit solo si el usuario lo pide, directamente en `main`, con el test **y sus PNG**.

## Si algo falla
| Mensaje | Qué hacer |
|---|---|
| *No browser at ws://127.0.0.1:6677/* | Abrir Docker Desktop y relanzar |
| *No existing reference screenshot found* | `npm run test:update -- X` y revisar las PNG |
| *N pixels differ* | El error empieza con *Changed:* y lista lo que ha cambiado: story y `Part` (`Size > xs`, `Variant x color > soft / primary`); lo que solo se ha movido no sale. Mirar su diferencia en `.vitest-attachments/` y actualizar solo si el cambio es intencionado |
| Tras `test:update` la PNG sigue enseñando lo de antes | El cambio es tan suave que no pasa el umbral, así que no falla y `-u` no la reescribe. Borrar esa PNG y volver a generar |
| *No test files found* | El filtro no coincide, o falta `__tests__` / la terminación `.spec(.browser).ts` |
| Prettier marca archivos que no has tocado | Solo finales de línea (CRLF por `core.autocrlf`); el contenido está bien |
