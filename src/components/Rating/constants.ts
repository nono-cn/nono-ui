export const ratingSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const ratingOrientations = ['horizontal', 'vertical'] as const

export const ratingDefaults = {
  length: 5,
  clearable: false,
  hoverable: false,
  loop: false,
  disabled: false,
  readonly: false,
  required: false,
  name: undefined,
  step: 1 as const,
  orientation: 'horizontal' as const,
  size: 'md' as const,
  color: 'primary',
  icon: 'star' as const,
}
