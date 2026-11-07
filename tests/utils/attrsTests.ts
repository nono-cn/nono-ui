import { h, type Component } from 'vue'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

// Tests de attrs comunes a los componentes con `inheritAttrs: false`, que pasan a mano los
// atributos, la `class` y el `style` que reciben a su elemento raíz. Se llama dentro del
// describe del nodo:
//
// describe('attrs', () => {
//   describe('root', () => {
//     attrsTests({
//       component: Badge,
//       props: { label: 'Badge' },
//       root: '[data-test-badge-root]',
//       class: { value: 'rounded-none', expected: { borderRadius: '0px' } },
//       keeps: ['backgroundColor'],
//     })
//   })
// })
//
// Si los atributos no entran como attrs del componente sino por una prop (p. ej. `ui.label`),
// `toProps` dice cómo convertirlos en las props con que se monta:
//
// attrsTests({
//   component: Alert,
//   props: { label: 'Heads up' },
//   root: '[data-test-alert-label]',
//   toProps: (attrs) => ({ ui: { label: () => attrs } }),
//   class: { value: 'font-normal', expected: { fontWeight: '400' } },
// })

type StyleProperty = Exclude<
  {
    [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string ? K : never
  }[keyof CSSStyleDeclaration],
  number
>

interface AttrsTestsOptions {
  component: Component
  /** Props comunes a todos los casos (p. ej. las obligatorias). */
  props?: Record<string, unknown>
  /** Selector del elemento que recibe los attrs. */
  root: string
  /** Convierte los atributos de prueba en props, si no entran como attrs del componente. */
  toProps?: (attrs: Record<string, unknown>) => Record<string, unknown>
  /**
   * Una clase que choca con una del componente y lo que debe medirse con ella. Se escribe en
   * el test del componente (Tailwind solo genera las clases que encuentra en src/).
   */
  class: { value: string; expected: Partial<Record<StyleProperty, string>> }
  /** Estilos que el componente pone en `style` y que un `style` propio no debe quitar. */
  keeps?: StyleProperty[]
}

function measure(element: Element, properties: StyleProperty[]) {
  const style = getComputedStyle(element)

  return Object.fromEntries(properties.map((property) => [property, style[property]]))
}

export function attrsTests({
  component,
  props = {},
  root,
  toProps = (attrs) => attrs,
  class: customClass,
  keeps = [],
}: AttrsTestsOptions) {
  async function renderRoot(attrs: Record<string, unknown> = {}) {
    const screen = await render(() => h(component, { ...props, ...toProps(attrs) }))

    return screen.container.querySelector(root)!
  }

  it('receives the attributes', async () => {
    const element = await renderRoot({ id: 'custom-id', 'data-custom': 'value' })

    expect({
      id: element.getAttribute('id'),
      data: element.getAttribute('data-custom'),
    }).toEqual({ id: 'custom-id', data: 'value' })
  })

  it('a custom class wins over the component classes', async () => {
    const element = await renderRoot({ class: customClass.value })
    const properties = Object.keys(customClass.expected) as StyleProperty[]

    expect(measure(element, properties)).toEqual(customClass.expected)
  })

  it('a custom style is applied without losing the component style', async () => {
    const element = await renderRoot({ style: { opacity: '0.5' } })
    const withoutStyle = await renderRoot()

    expect(measure(element, ['opacity', ...keeps])).toEqual({
      ...measure(withoutStyle, keeps),
      opacity: '0.5',
    })
  })
}
