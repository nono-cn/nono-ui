export const toastVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
export const toastPositionNames = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

export const toastDefaults = {
  color: 'primary',
  forceMount: false,
  position: 'bottom-right' as const,
  type: 'foreground',
  variant: 'subtle' as const,
} as const
