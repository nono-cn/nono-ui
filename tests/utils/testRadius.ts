import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestRadiusOptions {
  text: string
  id: string
  varRadius: string
  defaultRadius: string
  radii: readonly string[]
  mount: (radius: string | undefined) => VueWrapper
  className?: string
}

export function testRadius({
  text,
  id,
  varRadius,
  defaultRadius,
  radii,
  mount,
  className,
}: TestRadiusOptions) {
  it.each([...radii, 'eval', undefined])(`${text} resuelve radius=%s`, (radius) => {
    const root = mount(radius).get(id)
    const name = radius ?? defaultRadius

    expect(root.attributes('style')).toContain(
      `${varRadius}: var(--radius-${name}, var(--radius-${defaultRadius}))`,
    )
    if (className) expect(root.classes()).toContain(className)
  })

  it.each(['1rem', '12px'])(`${text} acepta el valor CSS %s`, (radius) => {
    const root = mount(radius).get(id)

    expect(root.attributes('style')).toContain(`${varRadius}: ${radius}`)
    if (className) expect(root.classes()).toContain(className)
  })
}
