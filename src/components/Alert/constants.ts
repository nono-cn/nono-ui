export const alertVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const

export const alertDefaults = {
  variant: 'soft' as const,
  closable: false,
  decorative: false,
  closeButton: undefined,
  color: 'primary',
  description: undefined,
  icon: undefined,
  label: undefined,
  ui: undefined,
}
