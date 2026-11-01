import type { DateValue } from '@/composables/useDates'

export { default as Time } from './Time.vue'

export interface TimeProps {
  datetime: DateValue
  locale?: string | string[]
  format?: Intl.DateTimeFormatOptions
}

export interface TimeContext {
  date: string
}

export function createTimeContext(date: string): TimeContext {
  return { date }
}

export interface TimeSlots {
  default?(props: TimeContext): unknown
}
