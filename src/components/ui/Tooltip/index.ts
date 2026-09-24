import type { HTMLAttributes } from 'vue'
import type {
  TooltipArrowProps as RekaTooltipArrowProps,
  TooltipContentEmits as RekaTooltipContentEmits,
  TooltipContentProps as RekaTooltipContentProps,
  TooltipRootEmits as RekaTooltipRootEmits,
  TooltipRootProps as RekaTooltipRootProps,
} from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'

export { default as Tooltip } from './Tooltip.vue'

// Props Reka
export type TooltipRootProps = Pick<
  RekaTooltipRootProps,
  | 'delayDuration'
  | 'disableHoverableContent'
  | 'disableClosingTrigger'
  | 'disabled'
  | 'ignoreNonKeyboardFocus'
>
export type TooltipContentProps = Pick<
  RekaTooltipContentProps,
  | 'align'
  | 'alignOffset'
  | 'ariaLabel'
  | 'arrowPadding'
  | 'avoidCollisions'
  | 'collisionPadding'
  | 'forceMount'
  | 'hideWhenDetached'
  | 'positionStrategy'
  | 'side'
  | 'sideOffset'
  | 'sticky'
  | 'updatePositionStrategy'
>
export type TooltipArrowProps = Pick<RekaTooltipArrowProps, 'width' | 'height'>
export type TooltipContentConfig = TooltipContentProps &
  EmitsAsProps<RekaTooltipContentEmits> &
  HTMLAttributes
export type TooltipArrowConfig = TooltipArrowProps & HTMLAttributes

// Props
export interface TooltipProps extends TooltipRootProps {
  open?: boolean
  showArrow?: boolean
  content?: TooltipContentConfig
  arrow?: TooltipArrowConfig
}

// Context
export interface TooltipContext {
  open: boolean
  close: () => void
}

// Emits
export type TooltipEmits = RekaTooltipRootEmits

// Slots
export interface TooltipSlots {
  default?(props: TooltipContext): unknown
  content?(props: TooltipContext): unknown
}
