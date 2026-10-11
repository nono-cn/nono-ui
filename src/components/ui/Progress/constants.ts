export const progressSizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export const progressOrientations = ['horizontal', 'vertical'] as const
export const progressAnimations = ['carousel', 'carousel-inverse', 'swing', 'elastic'] as const

export const progressDefaults = {
  max: 100,
  modelValue: 0,
  label: undefined,
  color: 'primary' as const,
  trackColor: undefined,
  size: 'md' as const,
  animation: 'carousel' as const,
  orientation: 'horizontal' as const,
  inverted: false,
  ui: undefined,
}
