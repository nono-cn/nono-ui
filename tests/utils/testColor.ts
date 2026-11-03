import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestColorOptions {
  id: string
  variable: string
  fallbackColor: string
  mount: (color: string) => VueWrapper | Promise<VueWrapper>
  setColor?: (wrapper: VueWrapper, color: string) => Promise<void>
}

export function testColor({
  id,
  variable,
  fallbackColor,
  mount,
  setColor = (wrapper, color) => wrapper.setProps({ color }),
}: TestColorOptions) {
  it(`con un token de tema define ${variable} con ese token`, async () => {
    const node = (await mount('error')).get(id)

    expect(node.attributes('style')).toContain(`${variable}: var(--error, var(--${fallbackColor}))`)
  })

  it(`se actualiza ${variable} al cambiar color`, async () => {
    const wrapper = await mount('error')

    await setColor(wrapper, '#ff0000')

    expect(wrapper.get(id).attributes('style')).toContain(`${variable}: #ff0000`)
  })
}
