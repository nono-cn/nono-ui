import { cva } from 'class-variance-authority'
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
export { tooltipDefaults } from './constants'

export const tooltipContentVariants = cva(
  'data-[state=closed]:animate-out data-[state=delayed-open]:animate-in data-[state=instant-open]:animate-in data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=instant-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit max-w-(--reka-tooltip-content-available-width) origin-(--reka-tooltip-content-transform-origin) rounded-md border bg-popover px-3 py-1.5 text-xs text-balance text-popover-foreground shadow-md',
)
export const tooltipArrowVariants = cva('fill-popover stroke-border -translate-y-px')

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
  | 'as'
  | 'asChild'
  | 'side'
  | 'sideOffset'
  | 'align'
  | 'alignOffset'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'arrowPadding'
  | 'sticky'
  | 'hideWhenDetached'
  | 'positionStrategy'
  | 'updatePositionStrategy'
  | 'ariaLabel'
  | 'forceMount'
>
export type TooltipArrowProps = Pick<RekaTooltipArrowProps, 'as' | 'asChild' | 'width' | 'height'>
export type TooltipContentConfig = TooltipContentProps &
  EmitsAsProps<RekaTooltipContentEmits> &
  Omit<HTMLAttributes, 'dir'>
export type TooltipArrowConfig = TooltipArrowProps & HTMLAttributes

// Props
export interface TooltipProps extends TooltipRootProps {
  open?: boolean
  text?: string
  content?: TooltipContentConfig
  arrow?: TooltipArrowConfig
  showArrow?: boolean
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
