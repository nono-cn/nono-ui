export const progressCircularSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const progressCircularDefaults = {
  max: 100,
  modelValue: 0,
  label: undefined,
  color: 'primary' as const,
  trackColor: undefined,
  size: 'md' as const,
  thickness: 8,
  ui: undefined,
}
