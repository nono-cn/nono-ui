export const breadcrumbVariantNames = ['plain', 'outlined', 'frame'] as const
export const breadcrumbDefaults = {
  items: () => [],
  ellipsisIndex: undefined,
  ellipsisIcon: 'moreHorizontal' as const,
  separatorIcon: 'chevronRight' as const,
  variant: 'plain' as const,
  ui: undefined,
}
