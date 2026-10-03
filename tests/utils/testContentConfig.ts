import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'
import type { PopoverContentConfig } from '@/components/ui/Popover'

export function testContentConfig({
  text,
  id,
  omit = [],
  mount,
  getProps,
}: {
  text: string
  id: string
  omit?: string[]
  mount: (config: PopoverContentConfig) => VueWrapper | Promise<VueWrapper>
  getProps: (wrapper: VueWrapper) => Record<string, unknown>
}) {
  it(text, async () => {
    const config: PopoverContentConfig = {
      side: 'top',
      align: 'start',
      sideOffset: 12,
      alignOffset: 6,
      arrowPadding: 4,
      avoidCollisions: false,
      collisionPadding: 16,
      id: 'custom-popover-content',
      class: 'custom-popover-content',
      style: 'opacity: 0.5',
      'aria-label': 'Content',
    }
    const wrapper = await mount(config)
    expect(getProps(wrapper)).toMatchObject({
      side: config.side,
      align: config.align,
      sideOffset: config.sideOffset,
      alignOffset: config.alignOffset,
      arrowPadding: config.arrowPadding,
      avoidCollisions: config.avoidCollisions,
      collisionPadding: config.collisionPadding,
    })
    const content = wrapper.find(id)
    expect(content.exists()).toBe(true)
    if (!omit.includes('id')) expect(content.attributes('id')).toBe(config.id)
    expect(content.classes()).toContain(config.class)
    expect(content.attributes('style')).toContain('opacity: 0.5')
    expect(content.attributes('aria-label')).toBe(config['aria-label'])
  })
}
