export const stepperSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const stepperOrientations = ['horizontal', 'vertical'] as const

export const stepperDefaults = {
  orientation: 'horizontal' as const,
  size: 'md' as const,
  linear: true,
  disabled: false,
  color: 'primary' as const,
  steps: () => [],
  ui: undefined,
}
