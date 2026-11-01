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

  it(`con un color CSS define ${variable} con ese color`, async () => {
    const node = (await mount('#ff0000')).get(id)

    expect(node.attributes('style')).toContain(`${variable}: #ff0000`)
  })
}
