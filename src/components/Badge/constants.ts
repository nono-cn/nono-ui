export const badgeSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const badgeVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
export const badgeDefaults = {
  label: undefined,
  size: 'md' as const,
  variant: 'solid' as const,
  radius: 'md' as const,
  color: 'primary',
  icon: undefined,
  trailingIcon: undefined,
}
