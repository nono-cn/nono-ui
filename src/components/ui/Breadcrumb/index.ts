import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { LinkProps } from '@/components/ui/Link'
import type { IconName } from '@/components/ui/Icon'
import { breadcrumbVariantNames } from './constants'
import { breadcrumbDefaults } from './default'

export { default as Breadcrumb } from './Breadcrumb.vue'
export { breadcrumbVariantNames } from './constants'

export const breadcrumbVariants = cva('', {
  variants: {
    variant: {
      plain: 'inline-flex rounded-xl border border-transparent px-3 py-2',
      outlined: 'inline-flex rounded-xl border border-border px-3 py-2',
      frame: 'inline-flex rounded-xl border border-border bg-muted p-1 shadow-sm',
    } satisfies Record<(typeof breadcrumbVariantNames)[number], string>,
  },
  defaultVariants: {
    variant: breadcrumbDefaults.variant,
  },
})

export const breadcrumbListVariants = cva(
  'flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5',
  {
    variants: {
      variant: {
        plain: '',
        outlined: '',
        frame: 'rounded-lg border border-border bg-background px-2 py-1',
      } satisfies Record<(typeof breadcrumbVariantNames)[number], string>,
    },
    defaultVariants: {
      variant: breadcrumbDefaults.variant,
    },
  },
)

export type BreadcrumbVariants = VariantProps<typeof breadcrumbVariants>
export type BreadcrumbVariant = NonNullable<BreadcrumbVariants['variant']>

// Item
export type BreadcrumbItem = { slot: string } & Omit<LinkProps, 'variant' | 'color'>

// Props
export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  ellipsisIndex?: [start: number, end: number]
  ellipsisIcon?: IconName
  separatorIcon?: IconName
  variant?: BreadcrumbVariant
  ui?: BreadcrumbUI
}

// Fn
export type BreadcrumbFn<T> = () => T
export type BreadcrumbItemFn<T> = (context: BreadcrumbItemContext) => T

// UI
export interface BreadcrumbUI {
  list?: BreadcrumbFn<HTMLAttributes>
  ellipsisContainer?: BreadcrumbFn<HTMLAttributes>
  separatorContainer?: BreadcrumbFn<HTMLAttributes>
  item?: BreadcrumbItemFn<HTMLAttributes>
}

// Context
export interface BreadcrumbItemContext {
  item: BreadcrumbItem
  index: number
  first: boolean
  last: boolean
  linked: boolean
  ellipsis: boolean
}

export interface BreadcrumbEllipsisContext {
  items: BreadcrumbItem[]
}

// Slots
export type BreadcrumbSlots = {
  ellipsis?(props: BreadcrumbEllipsisContext): unknown
  separator?(): unknown
  item?(props: BreadcrumbItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: BreadcrumbItemContext) => unknown) | undefined
}
