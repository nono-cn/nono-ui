import type { AccordionItem } from '.'

export const accordionDefaults = {
  variant: 'default' as const,
  highlight: false,
  type: 'single' as const,
  collapsible: false,
  disabled: false,
  unmountOnHide: true,
  items: () => [] as AccordionItem[],
  iconDropDownOpen: () => ({ name: 'chevronUp' as const }),
  iconDropDownClose: () => ({ name: 'chevronDown' as const }),
  ui: undefined,
}
