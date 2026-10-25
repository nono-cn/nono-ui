export const paginationSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const paginationDefaults = {
  total: 0,
  itemsPerPage: 10,
  siblingCount: 2,
  showEdges: true,
  disabled: false,
  showControls: true,
  size: 'md' as const,
  variant: 'outline' as const,
  activeVariant: 'solid' as const,
  color: 'primary',
  activeColor: undefined,
  firstIcon: 'chevronsLeft' as const,
  previousIcon: 'chevronLeft' as const,
  nextIcon: 'chevronRight' as const,
  lastIcon: 'chevronsRight' as const,
  ellipsisIcon: 'moreHorizontal' as const,
  ui: undefined,
}
