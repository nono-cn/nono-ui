import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

// config de ejemplo válida para el content de cualquier componente con contenido flotante
const contentConfig = {
  side: 'top',
  align: 'start',
  sideOffset: 12,
  alignOffset: 6,
  arrowPadding: 4,
  avoidCollisions: false,
  collisionPadding: 16,
  class: 'custom-content',
  style: 'opacity: 0.5',
  'aria-label': 'Content',
} as const

export function testContentConfig({
  text,
  id,
  mount,
  getProps,
}: {
  text: string
  id: string
  mount: (config: typeof contentConfig) => VueWrapper | Promise<VueWrapper>
  getProps: (wrapper: VueWrapper) => object
}) {
  it(text, async () => {
    const wrapper = await mount(contentConfig)
    expect(getProps(wrapper)).toMatchObject({
      side: contentConfig.side,
      align: contentConfig.align,
      sideOffset: contentConfig.sideOffset,
      alignOffset: contentConfig.alignOffset,
      arrowPadding: contentConfig.arrowPadding,
      avoidCollisions: contentConfig.avoidCollisions,
      collisionPadding: contentConfig.collisionPadding,
    })
    const content = wrapper.find(id)
    expect(content.exists()).toBe(true)
    expect(content.classes()).toContain(contentConfig.class)
    expect(content.attributes('style')).toContain(contentConfig.style)
    expect(content.attributes('aria-label')).toBe(contentConfig['aria-label'])
  })
}
