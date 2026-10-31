import { cva } from 'class-variance-authority'
import type {
  DropdownMenuArrowProps as RekaDropdownMenuArrowProps,
  DropdownMenuContentProps as RekaDropdownMenuContentProps,
  DropdownMenuRootEmits as RekaDropdownMenuRootEmits,
  DropdownMenuRootProps as RekaDropdownMenuRootProps,
  DropdownMenuTriggerProps as RekaDropdownMenuTriggerProps,
  FocusOutsideEvent,
  PointerDownOutsideEvent,
} from 'reka-ui'

import { dropdownMenuDefaults, type dropdownMenuSizes } from './constants'

export { default as DropdownMenu } from './DropdownMenu.vue'
export { dropdownMenuDefaults, dropdownMenuSizes } from './constants'

export type DropdownMenuSize = (typeof dropdownMenuSizes)[number]

export const dropdownMenuContentVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--reka-dropdown-menu-content-available-height) min-w-32 origin-(--reka-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-hidden',
)

export const dropdownMenuArrowVariants = cva('fill-popover stroke-border -translate-y-px')

export const dropdownMenuItemVariants = cva(
  'relative flex cursor-default items-center rounded-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground',
  {
    variants: {
      size: {
        xs: 'gap-1 px-1.5 py-1 text-xs',
        sm: 'gap-1.5 px-2 py-1 text-xs',
        md: 'gap-2 px-2 py-1.5 text-sm',
        lg: 'gap-2 px-2.5 py-1.5 text-base',
        xl: 'gap-2.5 px-3 py-2 text-base',
      } satisfies Record<DropdownMenuSize, string>,
    },
    defaultVariants: { size: dropdownMenuDefaults.size },
  },
)

// Props Reka
export type DropdownMenuRootProps = Pick<RekaDropdownMenuRootProps, 'modal'>
export type DropdownMenuTriggerProps = Pick<RekaDropdownMenuTriggerProps, 'disabled'>
export type DropdownMenuContentProps = Pick<
  RekaDropdownMenuContentProps,
  | 'as'
  | 'asChild'
  | 'loop'
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
  | 'forceMount'
>
export interface DropdownMenuContentCallbacks {
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void
  onFocusOutside?: (event: FocusOutsideEvent) => void
  onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void
  onOpenAutoFocus?: (event: Event) => void
  onCloseAutoFocus?: (event: Event) => void
}
export type DropdownMenuContentConfig = DropdownMenuContentProps & DropdownMenuContentCallbacks
export type DropdownMenuArrowProps = Pick<
  RekaDropdownMenuArrowProps,
  'as' | 'asChild' | 'width' | 'height' | 'rounded'
>
export type DropdownMenuArrowConfig = DropdownMenuArrowProps

// Item
export interface DropdownMenuItem {
  label?: string
}

// Props
export interface DropdownMenuProps extends DropdownMenuRootProps, DropdownMenuTriggerProps {
  open?: boolean
  size?: DropdownMenuSize
  items?: DropdownMenuItem[]
  content?: DropdownMenuContentConfig
  arrow?: DropdownMenuArrowConfig
  showArrow?: boolean
}

// Context
export interface DropdownMenuContext {
  open: boolean
  close: () => void
}

// Emits
export type DropdownMenuEmits = RekaDropdownMenuRootEmits

// Slots
export interface DropdownMenuSlots {
  default?(props: DropdownMenuContext): unknown
}
