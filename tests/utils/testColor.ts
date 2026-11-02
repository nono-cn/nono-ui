import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestColorOptions {
  id: string
  variable: string
  fallbackColor: string
  mount: (color: string) => VueWrapper | Promise<VueWrapper>
}

export function testColor({ id, variable, fallbackColor, mount }: TestColorOptions) {
  it(`con un token de tema define ${variable} con ese token`, async () => {
    const node = (await mount('error')).get(id)

    expect(node.attributes('style')).toContain(`${variable}: var(--error, var(--${fallbackColor}))`)
  })

  it(`se actualiza ${variable} al cambiar color`, async () => {
    const wrapper = await mount('error')

    await wrapper.setProps({ color: '#ff0000' })

    expect(wrapper.get(id).attributes('style')).toContain(`${variable}: #ff0000`)
  })
}
