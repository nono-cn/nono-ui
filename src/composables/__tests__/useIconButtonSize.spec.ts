import { describe, expect, it } from 'vitest'
import { toIconButtonSize } from '../useIconButtonSize'

describe('toIconButtonSize', () => {
  it('by default returns icon', () => {
    expect(toIconButtonSize()).toBe('icon')
  })

  it.each([
    { text: 'md maps to icon', input: 'md', expected: 'icon' },
    { text: 'icon stays icon', input: 'icon', expected: 'icon' },
    { text: 'a text size maps to its icon size', input: 'sm', expected: 'icon-sm' },
    { text: 'the largest text size maps to icon-xl', input: 'xl', expected: 'icon-xl' },
    { text: 'an icon size stays the same', input: 'icon-lg', expected: 'icon-lg' },
  ] as const)('$text', ({ input, expected }) => {
    expect(toIconButtonSize(input)).toBe(expected)
  })
})
