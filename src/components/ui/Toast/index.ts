import type {
  ToastProviderProps as RekaToastProviderProps,
  ToastRootEmits as RekaToastRootEmits,
  ToastRootProps as RekaToastRootProps,
  ToastViewportProps as RekaToastViewportProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Toast } from './Toast.vue'
export { toastDefaults } from './constants'

export type ToastProviderProps = Pick<
  RekaToastProviderProps,
  | 'disableSwipe'
  | 'duration'
  | 'label'
  | 'limit'
  | 'swipeDirection'
  | 'swipeThreshold'
  | 'toastManager'
>

export type ToastViewportConfig = Pick<RekaToastViewportProps, 'hotkey' | 'label'> &
  Pick<HTMLAttributes, 'class' | 'style'>

export type ToastProps = Omit<RekaToastRootProps, 'defaultOpen' | 'as' | 'asChild'> & {
  label?: string
  description?: string
}
export type ToastEmits = RekaToastRootEmits

export interface ToastSlotProps {
  open: boolean
  remaining: number
  duration: number
}

export interface ToastSlots {
  default?(props: ToastSlotProps): unknown
  label?(): unknown
  description?(): unknown
}
