export const timelineOrientations = ['vertical', 'horizontal'] as const
export const timelineAligns = ['left', 'right', 'alternate'] as const
export const timelineSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const timelineDefaults = {
  modelValue: undefined,
  orientation: 'vertical',
  align: 'right',
  size: 'md',
  color: 'primary',
  reverse: false,
  ui: undefined,
} as const
