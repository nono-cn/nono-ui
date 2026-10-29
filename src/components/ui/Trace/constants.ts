import type { TraceItem } from '.'

export const traceStatuses = ['pending', 'running', 'success', 'error'] as const

export const traceStatusIcons = {
  pending: 'minus',
  running: 'spinner',
  success: 'check',
  error: 'error',
} as const

export const traceDefaults = {
  items: () => [] as TraceItem[],
  unmountOnHide: true,
  iconDropDownOpen: 'chevronUp' as const,
  iconDropDownClose: 'chevronDown' as const,
  ui: undefined,
}
