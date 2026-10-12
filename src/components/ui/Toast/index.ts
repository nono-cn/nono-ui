import { cva, type VariantProps } from 'class-variance-authority'
import type {
  ToastProviderProps as RekaToastProviderProps,
  ToastRootEmits as RekaToastRootEmits,
  ToastRootProps as RekaToastRootProps,
  ToastViewportProps as RekaToastViewportProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { toastVariantNames } from './constants'

export { default as Toast } from './Toast.vue'
export { toastDefaults, toastVariantNames } from './constants'

export const toastVariants = cva('rounded-lg border p-4 shadow-lg', {
  variants: {
    variant: {
      solid: 'border-transparent bg-(--toast-solid) text-(--toast-solid-foreground)',
      outline: 'border-(--toast-color)/40 bg-transparent text-(--toast-color)',
      plain: 'border-transparent bg-transparent text-(--toast-color)',
      subtle: 'border-(--toast-color)/20 bg-(--toast-color)/10 text-(--toast-color)',
      soft: 'border-transparent bg-(--toast-color)/10 text-(--toast-color)',
    } satisfies Record<(typeof toastVariantNames)[number], string>,
  },
  defaultVariants: { variant: 'subtle' },
})

export type ToastVariants = VariantProps<typeof toastVariants>
export type ToastVariant = NonNullable<ToastVariants['variant']>

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
  color?: string
  variant?: ToastVariant
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
