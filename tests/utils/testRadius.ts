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
    { input: 'xs', expected: 'var(--radius-xs)' },
    { input: 'sm', expected: 'var(--radius-sm, 0.25rem)' },
    { input: 'md', expected: 'var(--radius-md)' },
    { input: 'lg', expected: 'var(--radius-lg)' },
    { input: 'xl', expected: 'var(--radius-xl)' },
    { input: '2xl', expected: 'var(--radius-2xl)' },
    { input: '3xl', expected: 'var(--radius-3xl)' },
    { input: '4xl', expected: 'var(--radius-4xl)' },
    { input: 'full', expected: '9999px' },
    { input: 'brand', expected: 'var(--radius-brand)' },
    { input: '12px', expected: '12px' },
    { input: '1rem', expected: '1rem' },
    { input: '50%', expected: '50%' },
    { input: 'var(--custom-radius)', expected: 'var(--custom-radius)' },
    { input: '12', expected: '12px' },
    { input: 12, expected: '12px' },
    { input: 0, expected: '0px' },
    { input: undefined, expected: defaultValue },
  ])('resuelve radius=$input', ({ input, expected }) => {
    const root = mount(input).get(id)

    expect(root.classes()).toContain(`rounded-(${variable})`)
    expect(root.attributes('style')).toContain(`${variable}: ${expected}`)
  })
}
