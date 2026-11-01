import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type {
  PopoverArrowProps as RekaPopoverArrowProps,
  PopoverContentEmits as RekaPopoverContentEmits,
  PopoverContentProps as RekaPopoverContentProps,
  PopoverRootEmits as RekaPopoverRootEmits,
  PopoverRootProps as RekaPopoverRootProps,
} from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'

export { default as Popover } from './Popover.vue'
export { popoverDefaults } from './constants'

export const popoverContentVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
)
export const popoverArrowVariants = cva('fill-popover stroke-border -translate-y-px')

// Props Reka
export type PopoverRootProps = Pick<RekaPopoverRootProps, 'modal'>
export type PopoverContentProps = Pick<
  RekaPopoverContentProps,
  | 'as'
  | 'asChild'
  | 'side'
  | 'sideOffset'
  | 'sideFlip'
  | 'align'
  | 'alignOffset'
  | 'alignFlip'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'arrowPadding'
  | 'hideShiftedArrow'
  | 'sticky'
  | 'hideWhenDetached'
  | 'positionStrategy'
  | 'updatePositionStrategy'
  | 'disableUpdateOnLayoutShift'
  | 'prioritizePosition'
  | 'disableOutsidePointerEvents'
  | 'forceMount'
>
export type PopoverArrowProps = Pick<
  RekaPopoverArrowProps,
  'as' | 'asChild' | 'width' | 'height' | 'rounded'
>
export type PopoverContentConfig = PopoverContentProps & EmitsAsProps<RekaPopoverContentEmits>
export type PopoverArrowConfig = PopoverArrowProps

// Fn
export type PopoverFn<T> = (context: PopoverContext) => T

// UI
export interface PopoverUI {
  content?: PopoverFn<HTMLAttributes>
  arrow?: PopoverFn<HTMLAttributes>
}

// Props
export interface PopoverProps extends PopoverRootProps {
  open?: boolean
  content?: PopoverContentConfig
  arrow?: PopoverArrowConfig
  showArrow?: boolean
  ui?: PopoverUI
}

// Context
export interface PopoverContext {
  open: boolean
  close: () => void
}

// Emits
export type PopoverEmits = RekaPopoverRootEmits

// Slots
export interface PopoverSlots {
  default?(props: PopoverContext): unknown
  content?(props: PopoverContext): unknown
}
