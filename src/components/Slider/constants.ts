export const sliderSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const sliderOrientations = ['horizontal', 'vertical'] as const
export const sliderThumbAlignments = ['contain', 'overflow'] as const

export const sliderDefaults = {
  modelValue: () => [0],
  min: 0,
  max: 100,
  step: 1,
  minStepsBetweenThumbs: 0,
  orientation: 'horizontal' as const,
  inverted: false,
  disabled: false,
  thumbAlignment: 'contain' as const,
  name: undefined,
  required: false,
  size: 'md' as const,
  color: 'primary',
  ui: undefined,
}
