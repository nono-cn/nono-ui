import type { HTMLAttributes } from 'vue'
import type { CollapsibleRootProps as RekaCollapsibleRootProps } from 'reka-ui'

export { default as Collapsible } from './Collapsible.vue'
export { collapsibleDefaults } from './constants'

// Props Reka
export type CollapsibleRootProps = Pick<RekaCollapsibleRootProps, 'disabled' | 'unmountOnHide'>
// Props
export interface CollapsibleProps extends CollapsibleRootProps {
  modelValue?: boolean
  ui?: CollapsibleUI
}

// Fn
export type CollapsibleFn<T> = (context: CollapsibleContext) => T

// UI
export interface CollapsibleUI {
  content?: CollapsibleFn<HTMLAttributes>
}

// Context
export interface CollapsibleContext {
  open: boolean
}

// Emits
export interface CollapsibleEmits {
  'update:modelValue': [value: boolean]
}

// Slots
export interface CollapsibleSlots {
  default?(props: CollapsibleContext): unknown
  content?(props: CollapsibleContext): unknown
}
