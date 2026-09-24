import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'
import type { HTMLAttributes } from 'vue'

type ContentTestConfig = Pick<HTMLAttributes, 'id' | 'class' | 'style' | 'aria-label'> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

export function testContentConfig({
  text,
  id,
  omit = [],
  mount,
}: {
  text: string
  id: string
  omit?: Array<'id' | 'aria-label'>
  mount: (config: ContentTestConfig) => VueWrapper | Promise<VueWrapper>
}) {
  it(text, async () => {
    const config: ContentTestConfig = {
      side: 'top',
      sideOffset: 12,
      id: 'custom-content',
      class: 'custom-content',
      style: 'opacity: 0.5',
      'aria-label': 'Content',
    }
    const wrapper = await mount(config)
    const content = wrapper.find(id)
    expect(content.exists()).toBe(true)
    if (!omit.includes('id')) expect(content.attributes('id')).toBe(config.id)
    expect(content.classes()).toContain(config.class)
    expect(content.attributes('style')).toContain('opacity: 0.5')
    if (!omit.includes('aria-label')) {
      expect(content.attributes('aria-label')).toBe(config['aria-label'])
    }
  })
}
