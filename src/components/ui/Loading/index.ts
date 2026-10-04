import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { IconName } from '@/components/ui/Icon'

export { default as Loading } from './Loading.vue'
export { loadingDefaults } from './constants'

export const loadingVariants = cva('w-full')
export const loadingIndicatorVariants = cva('flex w-full items-center justify-center')
export const loadingContentVariants = cva('w-full')
export const loadingIconVariants = cva('animate-spin')

// Fn
export type LoadingFn<T> = (context: LoadingContext) => T

// UI
export interface LoadingUI {
  loading?: LoadingFn<HTMLAttributes>
  content?: LoadingFn<HTMLAttributes>
}

// Props
export interface LoadingProps {
  loading?: boolean
  icon?: IconName
  ui?: LoadingUI
}

// Context
export interface LoadingContext {
  loading: boolean
}

// Slots
export interface LoadingSlots {
  default?(props: LoadingContext): unknown
  loading?(props: LoadingContext): unknown
}
