export const chipSizes = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const

export const chipPositions = ['top-right', 'bottom-right', 'top-left', 'bottom-left'] as const

export const chipDefaults = {
  color: 'primary',
  inset: false,
  position: 'top-right' as const,
  show: true,
  size: '3xl' as const,
  standalone: false,
}
