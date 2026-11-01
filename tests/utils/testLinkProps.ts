import { expect, it } from 'vitest'
import { Link, type LinkProps } from '@/components/Link'
import type { VueWrapper } from '@vue/test-utils'

interface TestLinkPropsOptions {
  text?: string
  input: LinkProps
  mount: (input: LinkProps) => VueWrapper | Promise<VueWrapper>
}

export function testLinkProps({
  text = 'forwards link props to Link',
  input,
  mount,
}: TestLinkPropsOptions) {
  it(text, async () => {
    const wrapper = await mount(input)

    expect(wrapper.getComponent(Link).props()).toMatchObject(input)
  })
}
