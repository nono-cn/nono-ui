export const kbdSizes = ['sm', 'md', 'lg'] as const
export const kbdVariantNames = ['solid', 'outline', 'soft', 'subtle'] as const

export const kbdDefaults = {
  label: undefined,
  size: 'md' as const,
  variant: 'subtle' as const,
  color: 'neutral',
  radius: 'sm' as const,
}
