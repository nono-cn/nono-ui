import type { MeterGroupItem } from '.'

export const meterGroupSizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export const meterGroupOrientations = ['horizontal', 'vertical'] as const

export const meterGroupDefaults = {
  items: () => [] as MeterGroupItem[],
  max: 100,
  orientation: 'horizontal' as const,
  size: 'md' as const,
  status: false,
  getValueLabel: undefined,
  getValueText: undefined,
  ui: undefined,
}

export const meterGroupItemDefaults = {
  color: 'primary',
}
