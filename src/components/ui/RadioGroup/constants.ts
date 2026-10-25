import type { RadioGroupItem } from '.'

export const radioGroupSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const radioGroupVariantNames = ['list', 'card', 'table'] as const
export const radioGroupOrientations = ['vertical', 'horizontal'] as const
export const radioGroupIndicators = ['start', 'end', 'hidden'] as const

export const radioGroupDefaults = {
  items: () => [] as RadioGroupItem[],
  legend: undefined,
  orientation: 'vertical' as const,
  size: 'md' as const,
  variant: 'list' as const,
  indicator: 'start' as const,
  color: 'primary',
  disabled: false,
  required: false,
  loop: true,
  name: undefined,
  ui: undefined,
}
