import { cva } from 'class-variance-authority'
import type {
  DropdownMenuRootEmits as RekaDropdownMenuRootEmits,
  DropdownMenuRootProps as RekaDropdownMenuRootProps,
  DropdownMenuTriggerProps as RekaDropdownMenuTriggerProps,
} from 'reka-ui'

export { default as DropdownMenu } from './DropdownMenu.vue'
export { dropdownMenuDefaults } from './constants'

export const dropdownMenuContentVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--reka-dropdown-menu-content-available-height) min-w-32 origin-(--reka-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-hidden',
)
export const dropdownMenuItemVariants = cva(
  'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground',
)

// Props Reka
export type DropdownMenuRootProps = Pick<RekaDropdownMenuRootProps, 'modal'>
export type DropdownMenuTriggerProps = Pick<RekaDropdownMenuTriggerProps, 'disabled'>

// Item
export interface DropdownMenuItem {
  label?: string
}

// Props
export interface DropdownMenuProps extends DropdownMenuRootProps, DropdownMenuTriggerProps {
  open?: boolean
  items?: DropdownMenuItem[]
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
