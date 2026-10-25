import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { PaginationRootProps as RekaPaginationRootProps } from 'reka-ui'
import type { ButtonVariant } from '@/components/ui/Button'
import type { IconName } from '@/components/ui/Icon'
import { paginationDefaults, type paginationSizes } from './constants'

export { default as Pagination } from './Pagination.vue'
export { paginationDefaults, paginationSizes } from './constants'

export const paginationVariants = cva('flex w-full justify-center')
export const paginationListVariants = cva('flex flex-wrap items-center gap-1')
export const paginationItemVariants = cva('', {
  variants: {
    size: {
      xs: 'min-w-7 px-1.5',
      sm: 'min-w-8 px-2',
      md: 'min-w-9 px-2.5',
      lg: 'min-w-10 px-3',
      xl: 'min-w-11 px-3.5',
    } satisfies Record<(typeof paginationSizes)[number], string>,
  },
  defaultVariants: {
    size: paginationDefaults.size,
  },
})

export const paginationEllipsisVariants = cva(
  'flex items-center justify-center text-muted-foreground',
  {
    variants: {
      size: {
        xs: 'size-7',
        sm: 'size-8',
        md: 'size-9',
        lg: 'size-10',
        xl: 'size-11',
      } satisfies Record<(typeof paginationSizes)[number], string>,
    },
    defaultVariants: {
      size: paginationDefaults.size,
    },
  },
)

// Variants
export type PaginationVariants = VariantProps<typeof paginationItemVariants>
export type PaginationSize = NonNullable<PaginationVariants['size']>
export type PaginationControl = 'first' | 'previous' | 'next' | 'last'

// Item
export type PaginationGeneratedItem = { type: 'page'; value: number } | { type: 'ellipsis' }

// Props
export type PaginationRootProps = Partial<
  Pick<
    RekaPaginationRootProps,
    'page' | 'total' | 'itemsPerPage' | 'siblingCount' | 'showEdges' | 'disabled'
  >
>

export interface PaginationProps extends PaginationRootProps {
  showControls?: boolean
  size?: PaginationSize
  variant?: ButtonVariant
  activeVariant?: ButtonVariant
  color?: string
  activeColor?: string
  firstIcon?: IconName
  previousIcon?: IconName
  nextIcon?: IconName
  lastIcon?: IconName
  ellipsisIcon?: IconName
  ui?: PaginationUI
}

// Context
export interface PaginationContext {
  page: number
  pageCount: number
  disabled: boolean
}

export interface PaginationItemContext {
  item: PaginationGeneratedItem
  index: number
  active: boolean
  disabled: boolean
}

// Fn
export type PaginationFn<T> = (context: PaginationContext) => T
export type PaginationItemFn<T> = (context: PaginationItemContext) => T

// UI
export interface PaginationUI {
  list?: PaginationFn<HTMLAttributes>
  first?: PaginationFn<HTMLAttributes>
  previous?: PaginationFn<HTMLAttributes>
  next?: PaginationFn<HTMLAttributes>
  last?: PaginationFn<HTMLAttributes>
  item?: PaginationItemFn<HTMLAttributes>
  ellipsis?: PaginationItemFn<HTMLAttributes>
}

// Emits
export interface PaginationEmits {
  'update:page': [value: number]
}

// Slots
export type PaginationSlots = {
  leading?(props: PaginationContext): unknown
  trailing?(props: PaginationContext): unknown
  first?(props: PaginationContext): unknown
  previous?(props: PaginationContext): unknown
  next?(props: PaginationContext): unknown
  last?(props: PaginationContext): unknown
  item?(props: PaginationItemContext): unknown
  ellipsis?(props: PaginationItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: PaginationItemContext) => unknown) | undefined
}
