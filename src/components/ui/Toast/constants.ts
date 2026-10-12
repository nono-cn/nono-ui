export const toastVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const

export const toastDefaults = {
  color: 'primary',
  forceMount: false,
  type: 'foreground',
  variant: 'subtle' as const,
} as const
