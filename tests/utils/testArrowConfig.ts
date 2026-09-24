import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'
import type { HTMLAttributes } from 'vue'

type ArrowTestConfig = Pick<HTMLAttributes, 'id' | 'class' | 'style'> & {
  width?: number
  height?: number
}

export function testArrowConfig({
  text,
  id,
  mount,
}: {
  text: string
  id: string
  mount: (config: ArrowTestConfig) => VueWrapper | Promise<VueWrapper>
}) {
  it(text, async () => {
    const config: ArrowTestConfig = {
      width: 12,
      height: 6,
      id: 'custom-arrow',
      class: 'custom-arrow',
      style: 'opacity: 0.5',
    }
    const wrapper = await mount(config)
    const arrow = wrapper.find(id)
    expect(arrow.exists()).toBe(true)
    expect(arrow.classes()).toContain(config.class)
    expect(arrow.attributes('id')).toBe(config.id)
    expect(arrow.attributes('style')).toContain('opacity: 0.5')
  })
}
