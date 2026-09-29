import { cva, type VariantProps } from 'class-variance-authority'
import type {
  AccordionItemProps as RekaAccordionItemProps,
  AccordionRootProps as RekaAccordionRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/ui/Icon'

export { default as Accordion } from './Accordion.vue'

export const accordionVariants = cva('', {
  variants: {
    variant: {
      default: '',
      separated: 'space-y-2',
      bordered: 'rounded-md border px-4',
      frame:
        'relative overflow-hidden rounded-xl border border-border bg-muted p-1 shadow-sm before:pointer-events-none before:absolute before:inset-1 before:z-10 before:rounded-lg before:border before:border-border',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const accordionItemVariants = cva('border-b last:border-b-0', {
  variants: {
    variant: {
      default: '',
      separated: 'rounded-md border px-4',
      bordered: '',
      frame: 'bg-background',
    },
    highlight: {
      true: 'data-[state=open]:bg-muted',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    highlight: false,
  },
})

export const accordionTriggerVariants = cva(
  'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-bold transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:underline',
        separated: 'hover:no-underline',
        bordered: 'hover:no-underline',
        frame: 'gap-3 rounded-none px-4 py-3 hover:no-underline focus-visible:rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const accordionContentVariants = cva(
  'overflow-hidden pt-0 pb-4 text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      variant: {
        default: '',
        separated: '',
        bordered: '',
        frame: 'pb-3 pl-4 pr-3',
      },
      hasIcon: {
        true: 'pl-6',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hasIcon: false,
    },
    compoundVariants: [
      {
        variant: 'frame',
        hasIcon: true,
        class: 'pl-10',
      },
    ],
  },
)

export type AccordionVariants = VariantProps<typeof accordionVariants>
export type AccordionVariant = NonNullable<AccordionVariants['variant']>

export type AccordionItemValue = string
export type AccordionValue = AccordionItemValue | AccordionItemValue[] | undefined

export interface AccordionItem extends Pick<
  RekaAccordionItemProps,
  'value' | 'disabled' | 'unmountOnHide'
> {
  slot?: string
  label?: string
  description?: string
  icon?: IconName
}

// Props
export interface AccordionProps extends Pick<
  RekaAccordionRootProps,
  'type' | 'collapsible' | 'disabled' | 'unmountOnHide'
> {
  variant?: AccordionVariant
  highlight?: boolean
  modelValue?: AccordionValue
  items?: AccordionItem[]
  iconDropDownOpen?: IconName
  iconDropDownClose?: IconName
  ui?: AccordionUI
}

// Fn
export type AccordionItemFn<T> = (context: AccordionItemContext) => T

// UI
export interface AccordionUI {
  item?: AccordionItemFn<HTMLAttributes>
  trigger?: AccordionItemFn<HTMLAttributes>
  content?: AccordionItemFn<HTMLAttributes>
}

export interface AccordionItemContext {
  item: AccordionItem
  index: number
  open: boolean
  first: boolean
  last: boolean
}

export function createAccordionItemContext(
  item: AccordionItem,
  index: number,
  value: AccordionValue,
  itemCount: number,
): AccordionItemContext {
  return {
    item,
    index,
    open: Array.isArray(value) ? value.includes(item.value) : value === item.value,
    first: index === 0,
    last: index === itemCount - 1,
  }
}

// Emits
export interface AccordionEmits {
  'update:modelValue': [value: AccordionValue]
}

// Slots
export type AccordionSlots = {
  trigger?(props: AccordionItemContext): unknown
  leading?(props: AccordionItemContext): unknown
  label?(props: AccordionItemContext): unknown
  content?(props: AccordionItemContext): unknown
  iconDropdown?(props: AccordionItemContext): unknown
} & {
  [name: `trigger-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `leading-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
}
