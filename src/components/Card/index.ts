import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

export { default as Card } from './Card.vue'
export { cardDefaults } from './constants'

export const cardVariants = cva(
  'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
)

export const cardHeaderVariants = cva(
  'grid grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
)

export const cardLabelVariants = cva('leading-none font-semibold')

export const cardDescriptionVariants = cva('text-sm text-muted-foreground')

export const cardActionVariants = cva(
  'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
)

export const cardContentVariants = cva('px-6')

export const cardFooterVariants = cva('flex items-center px-6 [.border-t]:pt-6')

// Props
export interface CardProps {
  label?: string
  description?: string
  ui?: CardUI
}

// Fn
export type CardFn<T> = () => T

// UI
export interface CardUI {
  header?: CardFn<HTMLAttributes>
  label?: CardFn<HTMLAttributes>
  description?: CardFn<HTMLAttributes>
  action?: CardFn<HTMLAttributes>
  content?: CardFn<HTMLAttributes>
  footer?: CardFn<HTMLAttributes>
}

// Slots
export interface CardSlots {
  default?(): unknown
  header?(): unknown
  label?(): unknown
  description?(): unknown
  action?(): unknown
  footer?(): unknown
}
