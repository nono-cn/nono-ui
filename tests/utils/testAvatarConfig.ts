import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

import { Avatar, type AvatarProps } from '@/components/ui/Avatar'

interface TestAvatarConfigOptions {
  text: string
  mount: (input: AvatarProps) => VueWrapper | Promise<VueWrapper>
}

export function testAvatarConfig({ text, mount }: TestAvatarConfigOptions) {
  it(text, async () => {
    const input: AvatarProps = {
      src: 'avatar.png',
      size: 'lg',
      shape: 'square',
      delayMs: 300,
      icon: 'user',
      label: 'AL',
    }

    const wrapper = await mount(input)
    const avatar = wrapper.getComponent(Avatar)

    expect(avatar.props()).toMatchObject(input)
  })
}
