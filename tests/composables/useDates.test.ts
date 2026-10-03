import { describe, expect, it } from 'vitest'

import { formatDate, toDatetime } from '@/composables/useDates'

const datetime = '2024-01-15T13:45:00.000Z'
const format: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}

describe('formatDate', () => {
  it('Format date with locale and format options', () => {
    expect(formatDate(datetime, { locale: 'en-US', format })).toBe('January 15, 2024')
  })
})

describe('toDatetime', () => {
  it.each([
    [datetime, datetime],
    [Date.parse(datetime), datetime],
    [new Date(datetime), datetime],
  ])('Convert %s to datetime attribute', (value, expectedDatetime) => {
    expect(toDatetime(value)).toBe(expectedDatetime)
  })
})
