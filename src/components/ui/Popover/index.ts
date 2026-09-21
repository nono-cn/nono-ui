import type { HTMLAttributes } from 'vue'
import type {
  PopoverArrowProps as RekaPopoverArrowProps,
  PopoverContentEmits as RekaPopoverContentEmits,
  PopoverContentProps as RekaPopoverContentProps,
  PopoverRootProps as RekaPopoverRootProps,
} from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'

export { default as Popover } from './Popover.vue'

// Props Reka
export type PopoverRootProps = Pick<RekaPopoverRootProps, 'modal'>
export type PopoverContentProps = Pick<
  RekaPopoverContentProps,
  | 'align'
  | 'alignFlip'
  | 'alignOffset'
  | 'arrowPadding'
  | 'avoidCollisions'
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
export type PopoverArrowProps = Pick<RekaPopoverArrowProps, 'width' | 'height' | 'rounded'>
export type PopoverContentConfig = PopoverContentProps &
  EmitsAsProps<RekaPopoverContentEmits> &
  HTMLAttributes
export type PopoverArrowConfig = PopoverArrowProps & HTMLAttributes

// Props
export interface PopoverProps extends PopoverRootProps {
  open?: boolean
  showArrow?: boolean
  content?: PopoverContentConfig
  arrow?: PopoverArrowConfig
}

// Context
export interface PopoverContext {
  open: boolean
  close: () => void
}

// Emits
export interface PopoverEmits {
  'update:open': [value: boolean]
  show: []
  close: []
}

// Slots
export interface PopoverSlots {
  default?(props: PopoverContext): unknown
  content?(props: PopoverContext): unknown
}
