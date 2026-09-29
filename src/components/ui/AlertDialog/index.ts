import type {
  AlertDialogContentProps as RekaAlertDialogContentProps,
  AlertDialogEmits as RekaAlertDialogEmits,
  AlertDialogProps as RekaAlertDialogProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { IconName } from '@/components/ui/Icon'

export { default as AlertDialog } from './AlertDialog.vue'

export type AlertDialogRootProps = Pick<RekaAlertDialogProps, 'unmountOnHide'>
export type AlertDialogContentProps = Pick<
  RekaAlertDialogContentProps,
  'forceMount' | 'disableOutsidePointerEvents'
>

// Fn
export type AlertDialogFn<T> = () => T

// Props
export interface AlertDialogProps extends AlertDialogRootProps, AlertDialogContentProps {
  open?: boolean
  label?: string
  description?: string
  icon?: IconName
  actionButton?: NormalizeButtonProps
  cancelButton?: NormalizeButtonProps
  ui?: AlertDialogUI
}

// Emits
export type AlertDialogEmits = RekaAlertDialogEmits & {
  action: [event: PointerEvent]
  cancel: [event: PointerEvent]
}

// Slots
export interface AlertDialogSlots {
  default?(): unknown
  content?(): unknown
  header?(): unknown
  label?(): unknown
  description?(): unknown
  footer?(props: { close: () => void }): unknown
  action?(props: { close: () => void }): unknown
  cancel?(props: { close: () => void }): unknown
}

// Expose
export interface AlertDialogExpose {
  /** Closes the alert dialog through the exposed component API. */
  close: () => void
}

// UI
export interface AlertDialogUI {
  trigger?: AlertDialogFn<HTMLAttributes>
  overlay?: AlertDialogFn<HTMLAttributes>
  content?: AlertDialogFn<HTMLAttributes>
  header?: AlertDialogFn<HTMLAttributes>
  label?: AlertDialogFn<HTMLAttributes>
  description?: AlertDialogFn<HTMLAttributes>
  body?: AlertDialogFn<HTMLAttributes>
  footer?: AlertDialogFn<HTMLAttributes>
}
