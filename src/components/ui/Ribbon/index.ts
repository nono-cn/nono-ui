import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { ribbonItemDefaults, type ribbonPositions } from './constants'

export { default as Ribbon } from './Ribbon.vue'
export { ribbonDefaults, ribbonItemDefaults, ribbonPositions, ribbonRotations } from './constants'

export type RibbonPosition = (typeof ribbonPositions)[number]

export const ribbonVariants = cva('relative isolate block overflow-hidden')

export const ribbonBandVariants = cva(
  'pointer-events-none absolute flex h-8 w-48 items-center justify-center overflow-hidden border-y border-(--ribbon-color) bg-(--ribbon-color) px-4 text-xs font-semibold tracking-wide whitespace-nowrap text-(--ribbon-color-foreground) shadow-md',
  {
    variants: {
      position: {
        'top-right': 'top-5 right-[-3.5rem]',
        'top-left': 'top-5 left-[-3.5rem]',
        'bottom-right': 'right-[-3.5rem] bottom-5',
        'bottom-left': 'bottom-5 left-[-3.5rem]',
      } satisfies Record<RibbonPosition, string>,
    },
    defaultVariants: {
      position: ribbonItemDefaults.position,
    },
  },
)

export const ribbonContentVariants = cva('relative z-10')

// Item
export interface RibbonItem {
  label?: string
  slot?: string
  color?: string
  position?: RibbonPosition
  rotate?: number
  zIndex?: number
}

// Props
export interface RibbonProps {
  ribbons?: RibbonItem[]
  ui?: RibbonUI
}

// Context
export interface RibbonItemContext {
  item: RibbonItem
  index: number
}

// Fn
export type RibbonFn<T> = () => T
export type RibbonItemFn<T> = (context: RibbonItemContext) => T

// UI
export interface RibbonUI {
  band?: RibbonItemFn<HTMLAttributes>
  label?: RibbonItemFn<HTMLAttributes>
  content?: RibbonFn<HTMLAttributes>
}

// Slots
export type RibbonSlots = {
  default?(): unknown
  label?(props: RibbonItemContext): unknown
} & {
  [name: `label-${string}`]: ((props: RibbonItemContext) => unknown) | undefined
}
