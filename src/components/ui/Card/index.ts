import type { HTMLAttributes } from 'vue'

export { default as Card } from './Card.vue'
export { cardDefaults } from './constants'

export type CardFn<T> = () => T

export interface CardUI {
  header?: CardFn<HTMLAttributes>
  label?: CardFn<HTMLAttributes>
  description?: CardFn<HTMLAttributes>
  action?: CardFn<HTMLAttributes>
  content?: CardFn<HTMLAttributes>
  footer?: CardFn<HTMLAttributes>
}

export interface CardProps {
  label?: string
  description?: string
  ui?: CardUI
}

export interface CardSlots {
  default?(): unknown
  header?(): unknown
  label?(): unknown
  description?(): unknown
  action?(): unknown
  footer?(): unknown
}
