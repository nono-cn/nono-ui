import type { HTMLAttributes, VNode } from 'vue'

export { default as Masonry } from './Masonry.vue'
export { masonryDefaults } from './defaults'

export type MasonryItem = unknown

export interface MasonryProps {
  columns?: number
  spacing?: number | string
  sequential?: boolean
  items: MasonryItem[]
}

export interface MasonrySlots {
  default?(props: { item: MasonryItem; index: number }): VNode[]
}

export type MasonryHTMLAttributes = HTMLAttributes
