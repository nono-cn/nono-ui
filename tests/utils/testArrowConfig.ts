import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'
import type { PopoverArrowConfig } from '@/components/ui/Popover'

export function testArrowConfig({
  text,
  id,
  mount,
}: {
  text: string
  id: string
  mount: (config: PopoverArrowConfig) => VueWrapper | Promise<VueWrapper>
}) {
  it(text, async () => {
    const config: PopoverArrowConfig = {
      width: 12,
      height: 6,
      rounded: true,
      id: 'custom-popover-arrow',
      class: 'custom-popover-arrow',
      style: 'opacity: 0.5',
    }
    const wrapper = await mount(config)
    const arrow = wrapper.find(id)
    expect(arrow.exists()).toBe(true)
    expect(arrow.classes()).toContain(config.class)
    expect(arrow.attributes('style')).toContain('opacity: 0.5')
  })
}
