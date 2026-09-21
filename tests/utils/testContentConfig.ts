import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'
import type { PopoverContentConfig } from '@/components/ui/Popover'

export function testContentConfig({
  text,
  id,
  omit = [],
  mount,
}: {
  text: string
  id: string
  omit?: string[]
  mount: (config: PopoverContentConfig) => VueWrapper | Promise<VueWrapper>
}) {
  it(text, async () => {
    const config: PopoverContentConfig = {
      side: 'top',
      sideOffset: 12,
      id: 'custom-popover-content',
      class: 'custom-popover-content',
      style: 'opacity: 0.5',
      'aria-label': 'Content',
    }
    const wrapper = await mount(config)
    const content = wrapper.find(id)
    expect(content.exists()).toBe(true)
    if (!omit.includes('id')) expect(content.attributes('id')).toBe(config.id)
    expect(content.classes()).toContain(config.class)
    expect(content.attributes('style')).toContain('opacity: 0.5')
    expect(content.attributes('aria-label')).toBe(config['aria-label'])
  })
}
