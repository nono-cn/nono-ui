export const buttonTextSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const buttonIconSizes = ['icon-xs', 'icon-sm', 'icon', 'icon-lg', 'icon-xl'] as const
export const buttonSizes = [...buttonTextSizes, ...buttonIconSizes] as const
export const buttonVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft', 'link'] as const

export const buttonDefaults = {
  as: 'button' as const,
  asChild: false,
  label: undefined,
  variant: 'solid' as const,
  size: 'md' as const,
  radius: 'md' as const,
  loading: false,
  color: 'primary',
  icon: undefined,
  trailingIcon: undefined,
}
