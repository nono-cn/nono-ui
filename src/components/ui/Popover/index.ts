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

export const popoverRootVariants = cva('contents')
export const popoverContentVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
)
export const popoverArrowVariants = cva(
  'fill-popover -translate-y-px drop-shadow-[0_1px_0_var(--color-border)]',
)

// Props Reka
export type PopoverRootProps = Pick<RekaPopoverRootProps, 'modal'>
export type PopoverContentProps = Pick<
  RekaPopoverContentProps,
  | 'as'
  | 'asChild'
  | 'align'
  | 'alignFlip'
  | 'alignOffset'
  | 'arrowPadding'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'disableOutsidePointerEvents'
  | 'disableUpdateOnLayoutShift'
  | 'forceMount'
  | 'hideShiftedArrow'
  | 'hideWhenDetached'
  | 'positionStrategy'
  | 'prioritizePosition'
  | 'side'
  | 'sideFlip'
  | 'sideOffset'
  | 'sticky'
  | 'updatePositionStrategy'
>
export type PopoverArrowProps = Pick<
  RekaPopoverArrowProps,
  'as' | 'asChild' | 'width' | 'height' | 'rounded'
>
export type PopoverContentConfig = PopoverContentProps &
  EmitsAsProps<RekaPopoverContentEmits> &
  Omit<HTMLAttributes, 'dir'>
export type PopoverArrowConfig = PopoverArrowProps & HTMLAttributes

// Props
export interface PopoverProps extends PopoverRootProps {
  open?: boolean
  content?: PopoverContentConfig
  arrow?: PopoverArrowConfig
  showArrow?: boolean
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
