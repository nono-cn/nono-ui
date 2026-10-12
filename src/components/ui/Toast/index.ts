import { cva, type VariantProps } from 'class-variance-authority'
import type {
  ToastProviderProps as RekaToastProviderProps,
  ToastRootEmits as RekaToastRootEmits,
  ToastRootProps as RekaToastRootProps,
  ToastViewportProps as RekaToastViewportProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { toastPositionNames, toastVariantNames } from './constants'

export { default as Toast } from './Toast.vue'
export { toastDefaults, toastPositionNames, toastVariantNames } from './constants'

export const toastVariants = cva('fixed w-80 rounded-lg border p-4 shadow-lg', {
  variants: {
    variant: {
      solid: 'border-transparent bg-(--toast-solid) text-(--toast-solid-foreground)',
      outline: 'border-(--toast-color)/40 bg-transparent text-(--toast-color)',
      plain: 'border-transparent bg-transparent text-(--toast-color)',
      subtle: 'border-(--toast-color)/20 bg-(--toast-color)/10 text-(--toast-color)',
      soft: 'border-transparent bg-(--toast-color)/10 text-(--toast-color)',
    } satisfies Record<(typeof toastVariantNames)[number], string>,
    position: {
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
    } satisfies Record<(typeof toastPositionNames)[number], string>,
  },
  defaultVariants: { variant: 'subtle', position: 'bottom-right' },
})

export type ToastVariants = VariantProps<typeof toastVariants>
export type ToastVariant = NonNullable<ToastVariants['variant']>
export type ToastPosition = NonNullable<ToastVariants['position']>

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
  position?: ToastPosition
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
