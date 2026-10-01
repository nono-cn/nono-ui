export const checkboxSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const checkboxDefaults = {
  trueValue: true,
  falseValue: false,
  size: 'md' as const,
  color: 'primary',
  icon: 'check' as const,
  indeterminateIcon: 'minus' as const,
  ui: undefined,
}
