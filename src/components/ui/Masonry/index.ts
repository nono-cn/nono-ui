import { cva } from 'class-variance-authority'
import type { HTMLAttributes, VNode } from 'vue'

export { default as Masonry } from './Masonry.vue'
export { masonryDefaults } from './constants'

export const masonryVariants = cva('flex w-full items-start')
export const masonryColumnVariants = cva('flex min-w-0 flex-1 flex-col')
export const masonryItemVariants = cva('min-w-0')

export interface MasonryItem {
  height: number
  [key: string]: unknown
}
export type MasonryResponsiveColumns = { sm?: number; md?: number; lg?: number }

export interface MasonryProps {
  columns?: number | MasonryResponsiveColumns
  spacing?: number | string
  sequential?: boolean
  items: MasonryItem[]
}

export interface MasonrySlots {
  default?(props: { item: MasonryItem; index: number }): VNode[]
}

export type MasonryHTMLAttributes = HTMLAttributes
