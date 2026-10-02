import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type {
  DialogContentEmits as RekaDialogContentEmits,
  DialogContentProps as RekaDialogContentProps,
  DialogRootEmits as RekaDialogRootEmits,
  DialogRootProps as RekaDialogRootProps,
} from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'
import type { EmitsAsProps } from '@/types/emits'

export { default as Dialog } from './Dialog.vue'
export { dialogDefaults } from './constants'

export const dialogRootVariants = cva('contents')
export const dialogOverlayVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
)

export const dialogContentVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
)

export const dialogHeaderVariants = cva('flex flex-col gap-2 text-center sm:text-left')
export const dialogLabelVariants = cva('flex items-center gap-2 text-lg leading-none font-semibold')
export const dialogDescriptionVariants = cva('text-sm text-muted-foreground')
export const dialogBodyVariants = cva('min-h-0 overflow-y-auto')
export const dialogFooterVariants = cva('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end')

export const dialogCloseVariants = cva(
  'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
)

// Props Reka
export type DialogRootProps = Pick<RekaDialogRootProps, 'modal' | 'unmountOnHide'>
export type DialogContentProps = Pick<
  RekaDialogContentProps,
  'forceMount' | 'disableOutsidePointerEvents'
>
export type DialogContentConfig = DialogContentProps &
  EmitsAsProps<RekaDialogContentEmits> &
  HTMLAttributes

// Fn
export type DialogFn<T> = (context: DialogContext) => T

// UI
export interface DialogUI {
  overlay?: DialogFn<HTMLAttributes>
  content?: DialogFn<HTMLAttributes>
  header?: DialogFn<HTMLAttributes>
  label?: DialogFn<HTMLAttributes>
  description?: DialogFn<HTMLAttributes>
  body?: DialogFn<HTMLAttributes>
  footer?: DialogFn<HTMLAttributes>
  close?: DialogFn<HTMLAttributes>
}

// Props
export interface DialogProps extends DialogRootProps {
  open?: boolean
  content?: DialogContentConfig
  block?: boolean
  label?: string
  description?: string
  icon?: IconConfig
  closeIcon?: IconConfig
  showCloseButton?: boolean
  ui?: DialogUI
}

// Context
export interface DialogContext {
  open: boolean
  close: () => void
}

// Emits
export type DialogEmits = RekaDialogRootEmits & {
  show: []
  close: []
}

// Slots
export interface DialogSlots {
  default?(props: DialogContext): unknown
  content?(props: DialogContext): unknown
  header?(props: DialogContext): unknown
  label?(props: DialogContext): unknown
  description?(props: DialogContext): unknown
  footer?(props: DialogContext): unknown
  close?(props: DialogContext): unknown
  closeIcon?(props: DialogContext): unknown
}
