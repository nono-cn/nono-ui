export const textareaSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const textareaVariantNames = ['outline', 'subtle', 'soft', 'plain', 'none'] as const

export const textareaDefaults = {
  modelValue: '',
  autoresize: false,
  size: 'md' as const,
  color: 'primary',
  highlight: false,
  variant: 'outline' as const,
}
