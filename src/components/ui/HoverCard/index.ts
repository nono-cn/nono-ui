import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type {
  FocusOutsideEvent,
  HoverCardArrowProps as RekaHoverCardArrowProps,
  HoverCardContentProps as RekaHoverCardContentProps,
  HoverCardRootEmits as RekaHoverCardRootEmits,
  HoverCardRootProps as RekaHoverCardRootProps,
  PointerDownOutsideEvent,
} from 'reka-ui'

export { default as HoverCard } from './HoverCard.vue'
export { hoverCardDefaults } from './constants'

export const hoverCardRootVariants = cva('contents')
export const hoverCardContentVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 max-w-(--reka-hover-card-content-available-width) origin-(--reka-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
)
export const hoverCardArrowVariants = cva('fill-popover')

export type HoverCardRootProps = Pick<
  RekaHoverCardRootProps,
  'openDelay' | 'closeDelay' | 'enableTouch'
>
export type HoverCardContentProps = Pick<
  RekaHoverCardContentProps,
  | 'as'
  | 'asChild'
  | 'align'
  | 'alignFlip'
  | 'alignOffset'
  | 'arrowPadding'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
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
export type HoverCardArrowProps = Pick<
  RekaHoverCardArrowProps,
  'as' | 'asChild' | 'width' | 'height' | 'rounded'
>
export type HoverCardContentConfig = HoverCardContentProps &
  HTMLAttributes & {
    onEscapeKeyDown?: (event: KeyboardEvent) => void
    onPointerDownOutside?: (event: PointerDownOutsideEvent) => void
    onFocusOutside?: (event: FocusOutsideEvent) => void
    onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void
  }
export type HoverCardArrowConfig = HoverCardArrowProps & HTMLAttributes

export interface HoverCardProps extends HoverCardRootProps {
  open?: boolean
  content?: HoverCardContentConfig
  arrow?: HoverCardArrowConfig
  showArrow?: boolean
}

export interface HoverCardContext {
  open: boolean
  close: () => void
}

export type HoverCardEmits = RekaHoverCardRootEmits

export interface HoverCardSlots {
  default?(props: HoverCardContext): unknown
  content?(props: HoverCardContext): unknown
}
