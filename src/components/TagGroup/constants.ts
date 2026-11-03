import type { TagGroupItem } from '.'

export const tagGroupSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const tagGroupVariantNames = ['outline', 'soft', 'solid'] as const
export const tagGroupSelectionModes = ['none', 'single', 'multiple'] as const
export const tagGroupEscapeKeyBehaviors = ['clearSelection', 'none'] as const

export const tagGroupDefaults = {
  items: () => [] as TagGroupItem[],
  empty: undefined,
  selectionMode: 'none' as const,
  removable: false,
  size: 'md' as const,
  variant: 'outline' as const,
  radius: 'md' as const,
  color: 'primary',
  disabled: false,
  disallowEmptySelection: false,
  escapeKeyBehavior: 'clearSelection' as const,
  loop: true,
  ui: undefined,
}
