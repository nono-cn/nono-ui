import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestRadiusOptions {
  id: string
  variable: string
  defaultValue: string
  mount: (radius: string | number | undefined) => VueWrapper
}

export function testRadius({ id, variable, defaultValue, mount }: TestRadiusOptions) {
  it.each([
    { input: 'none', expected: '0' },
    { input: 'sm', expected: 'var(--radius-sm, 0.25rem)' },
    { input: 'md', expected: 'var(--radius-md)' },
    { input: 'full', expected: '9999px' },
    { input: 'brand', expected: 'var(--radius-brand)' },
    { input: '12px', expected: '12px' },
    { input: 'var(--custom-radius)', expected: 'var(--custom-radius)' },
    { input: 12, expected: '12px' },
    { input: undefined, expected: defaultValue },
  ])('resuelve radius=$input', ({ input, expected }) => {
    const root = mount(input).get(id)

    expect(root.classes()).toContain(`rounded-(${variable})`)
    expect(root.attributes('style')).toContain(`${variable}: ${expected}`)
  })
}
