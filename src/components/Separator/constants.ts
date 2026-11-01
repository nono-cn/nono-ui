export const separatorTypes = ['solid', 'dashed', 'dotted'] as const
export const separatorSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const separatorPositions = ['left', 'center', 'right'] as const

export const separatorDefaults = {
  orientation: 'horizontal' as const,
  decorative: true,
  type: 'solid' as const,
  size: 'sm' as const,
  color: 'neutral',
  position: 'center' as const,
}
