export const alertVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const

export const alertDefaults = {
  closable: false,
  color: 'primary',
  decorative: false,
  description: undefined,
  icon: undefined,
  label: undefined,
  ui: undefined,
  variant: 'soft' as const,
}
