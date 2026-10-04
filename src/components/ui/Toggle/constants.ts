export const toggleVariantNames = ['outline', 'plain'] as const
export const toggleTextSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const toggleIconSizes = ['icon-xs', 'icon-sm', 'icon', 'icon-lg', 'icon-xl'] as const
export const toggleSizes = [...toggleTextSizes, ...toggleIconSizes] as const

export const toggleDefaults = {
  modelValue: false,
  label: undefined,
  icon: undefined,
  trailingIcon: undefined,
  variant: 'outline' as const,
  size: 'md' as const,
  color: 'neutral',
}
