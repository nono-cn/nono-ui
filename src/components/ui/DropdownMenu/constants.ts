export const dropdownMenuSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const dropdownMenuDefaults = {
  open: false,
  modal: true,
  disabled: false,
  size: 'md' as const,
  items: undefined,
}
