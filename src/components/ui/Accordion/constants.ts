import type { AccordionItem } from '.'

export const accordionVariantNames = ['default', 'separated', 'bordered', 'frame'] as const
export const accordionTypes = ['single', 'multiple'] as const

export const accordionDefaults = {
  variant: 'default' as const,
  highlight: false,
  type: 'single' as const,
  collapsible: false,
  disabled: false,
  unmountOnHide: true,
  items: () => [] as AccordionItem[],
  iconDropDownOpen: 'chevronUp' as const,
  iconDropDownClose: 'chevronDown' as const,
  ui: undefined,
}
