import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestShadowOptions {
  text: string
  id: string
  varShadow: string
  defaultShadow: string
  shadows: readonly string[]
  mount: (shadow: string | undefined) => VueWrapper
  className?: string
}

export function testShadow({
  text,
  id,
  varShadow,
  defaultShadow,
  shadows,
  mount,
  className,
}: TestShadowOptions) {
  it.each([...shadows, 'eval', undefined])(`${text} resuelve shadow=%s`, (shadow) => {
    const root = mount(shadow).get(id)
    const name = shadow ?? defaultShadow

    expect(root.attributes('style')).toContain(
      `${varShadow}: var(--shadow-${name}, var(--shadow-${defaultShadow}))`,
    )
    if (className) expect(root.classes()).toContain(className)
  })

  it('acepta un valor CSS personalizado', () => {
    const value = '0 2px 8px rgb(0 0 0 / 0.2)'
    const root = mount(value).get(id)

    expect(root.attributes('style')).toContain(`${varShadow}: ${value}`)
    if (className) expect(root.classes()).toContain(className)
  })
}
