import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/ui/Icon'
import type { traceStatuses } from './constants'

export { default as Trace } from './Trace.vue'
export { traceDefaults, traceStatuses, traceStatusIcons } from './constants'

export type TraceStatus = (typeof traceStatuses)[number]

export const traceVariants = cva('m-0 flex w-full list-none flex-col gap-1 p-0')

export const traceItemVariants = cva('min-w-0')

export const traceTriggerVariants = cva(
  'flex w-full min-w-0 items-start gap-2 rounded-md px-2 py-1.5 text-left text-sm',
  {
    variants: {
      collapsible: {
        true: 'cursor-pointer outline-none hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        false: '',
      },
    },
    defaultVariants: { collapsible: false },
  },
)

export const traceIconVariants = cva('flex h-5 shrink-0 items-center justify-center', {
  variants: {
    status: {
      pending: 'text-muted-foreground',
      running: 'text-primary [&_svg]:animate-spin',
      success: 'text-success',
      error: 'text-error',
    } satisfies Record<TraceStatus, string>,
  },
  defaultVariants: { status: 'pending' },
})

export const traceLabelVariants = cva('font-medium text-foreground')

export const traceDescriptionVariants = cva('text-muted-foreground')

export const traceIconDropdownVariants = cva('ms-auto h-5 shrink-0 text-muted-foreground')

export const traceContentVariants = cva('ps-9 pe-2 pb-2 text-sm text-muted-foreground')

// Item
export interface TraceItem {
  value: string
  slot?: string
  label?: string
  description?: string
  status?: TraceStatus
  icon?: IconName
  content?: string
  disabled?: boolean
}

// Props
export interface TraceProps {
  modelValue?: string[]
  items?: TraceItem[]
  unmountOnHide?: boolean
  iconDropDownOpen?: IconName
  iconDropDownClose?: IconName
  ui?: TraceUI
}

// Fn
export type TraceItemFn<T> = (context: TraceItemContext) => T

// UI
export interface TraceUI {
  item?: TraceItemFn<HTMLAttributes>
  trigger?: TraceItemFn<HTMLAttributes>
  icon?: TraceItemFn<HTMLAttributes>
  label?: TraceItemFn<HTMLAttributes>
  description?: TraceItemFn<HTMLAttributes>
  content?: TraceItemFn<HTMLAttributes>
}

// Context
export interface TraceItemContext {
  item: TraceItem
  index: number
  status: TraceStatus
  open: boolean
  collapsible: boolean
  first: boolean
  last: boolean
}

// Emits
export interface TraceEmits {
  'update:modelValue': [value: string[]]
}

// Slots
export type TraceSlots = {
  icon?(props: TraceItemContext): unknown
  label?(props: TraceItemContext): unknown
  description?(props: TraceItemContext): unknown
  content?(props: TraceItemContext): unknown
  iconDropdown?(props: TraceItemContext): unknown
} & {
  [name: `icon-${string}`]: ((props: TraceItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: TraceItemContext) => unknown) | undefined
  [name: `description-${string}`]: ((props: TraceItemContext) => unknown) | undefined
  [name: `content-${string}`]: ((props: TraceItemContext) => unknown) | undefined
}
