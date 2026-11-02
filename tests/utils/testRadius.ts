import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestRadiusOptions {
  id: string
  variable: string
  mount: (radius: string) => VueWrapper | Promise<VueWrapper>
}

export function testRadius({ id, variable, mount }: TestRadiusOptions) {
  it(`con radius define ${variable} con ese radio`, async () => {
    const node = (await mount('full')).get(id)

    expect(node.attributes('style')).toContain(`${variable}: 9999px`)
  })

  it(`se actualiza ${variable} al cambiar radius`, async () => {
    const wrapper = await mount('none')

    await wrapper.setProps({ radius: 'full' })

    expect(wrapper.get(id).attributes('style')).toContain(`${variable}: 9999px`)
  })
}
