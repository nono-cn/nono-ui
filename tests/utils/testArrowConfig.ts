import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

// config de ejemplo válida para el arrow de cualquier componente con flecha
const arrowConfig = {
  width: 12,
  height: 6,
  rounded: true,
  class: 'custom-arrow',
  style: 'opacity: 0.5',
} as const

export function testArrowConfig({
  text,
  id,
  mount,
  getProps,
}: {
  text: string
  id: string
  mount: (config: typeof arrowConfig) => VueWrapper | Promise<VueWrapper>
  getProps: (wrapper: VueWrapper) => object
}) {
  it(text, async () => {
    const wrapper = await mount(arrowConfig)
    expect(getProps(wrapper)).toMatchObject({
      width: arrowConfig.width,
      height: arrowConfig.height,
      rounded: arrowConfig.rounded,
    })
    const arrow = wrapper.find(id)
    expect(arrow.exists()).toBe(true)
    expect(arrow.classes()).toContain(arrowConfig.class)
    expect(arrow.attributes('style')).toContain(arrowConfig.style)
  })
}
