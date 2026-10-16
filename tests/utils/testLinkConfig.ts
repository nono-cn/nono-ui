import type { HTMLAttributes } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'

import { Link, type NormalizeLinkProps } from '@/components/ui/Link'

interface TestLinkConfigOptions {
  text: string
  id: string
  mount: (input: NormalizeLinkProps) => VueWrapper | Promise<VueWrapper>
}

export function testLinkConfig({ text, id, mount }: TestLinkConfigOptions) {
  it(text, async () => {
    const onClick = vi.fn()
    const input: NormalizeLinkProps & HTMLAttributes = {
      label: 'Open link',
      icon: 'chevronRight',
      to: 'https://example.com',
      onClick,
      id: 'custom-link',
      class: 'custom-link',
      style: 'opacity: 0.5',
    }

    const wrapper = await mount(input)
    const link = wrapper
      .findAllComponents(Link)
      .find((component) => component.attributes('id') === input.id)

    if (!link) throw new Error(`Expected Link ${id}`)

    expect(link.exists()).toBe(true)
    expect(link.props('label')).toBe(input.label)
    expect(link.props('icon')).toEqual(input.icon)
    expect(link.props('to')).toBe(input.to)
    expect(link.attributes('id')).toBe(input.id)
    expect(link.classes()).toContain(input.class)
    expect(link.attributes('style')).toContain('opacity: 0.5')

    await link.trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
  })
}
