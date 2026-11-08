import { describe, expect, it } from 'vitest'
import { fitText } from '..'

const upTo = (length: number) => (text: string) => text.length <= length

describe('fitText', () => {
  it.each([
    { text: 'a text that fits is kept whole', input: { text: 'JD', max: 2 }, expected: 'JD' },
    {
      text: 'a text that does not fit is cut with three dots',
      input: { text: 'Jane Doe', max: 6 },
      expected: 'Jan...',
    },
    {
      text: 'the cut does not end in a space',
      input: { text: 'Jane Doe Smith', max: 8 },
      expected: 'Jane...',
    },
    {
      text: 'when no letter fits only the dots are left',
      input: { text: 'Jane Doe', max: 0 },
      expected: '...',
    },
  ] as const)('$text', ({ input, expected }) => {
    expect(fitText(input.text, upTo(input.max))).toBe(expected)
  })
})
