export const inputSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const inputVariantNames = ['outline', 'plain', 'none', 'subtle', 'soft'] as const
export const inputDefaults = {
  modelValue: '',
  size: 'md' as const,
  variant: 'outline' as const,
  color: 'primary',
  highlight: false,
  loading: false,
  loadingIcon: 'spinner' as const,
}
