import type { TabItem } from '.'

export const tabsVariantNames = ['default', 'line'] as const
export const tabsOrientations = ['horizontal', 'vertical'] as const
export const tabsActivationModes = ['automatic', 'manual'] as const

export const tabsDefaults = {
  orientation: 'horizontal' as const,
  activationMode: 'automatic' as const,
  unmountOnHide: true,
  loop: true,
  variant: 'default' as const,
  color: 'primary',
  tabs: () => [] as TabItem[],
  ui: undefined,
}
