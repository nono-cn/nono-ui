import type {
  DropdownMenuContentEmits as RekaDropdownMenuContentEmits,
  DropdownMenuContentProps as RekaDropdownMenuContentProps,
  DropdownMenuArrowProps as RekaDropdownMenuArrowProps,
  DropdownMenuRootEmits,
  DropdownMenuRootProps,
  DropdownMenuTriggerProps,
} from 'reka-ui'

export { default as DropdownMenu } from './DropdownMenu.vue'

export type DropdownMenuArrowProps = Pick<
  RekaDropdownMenuArrowProps,
  'height' | 'rounded' | 'width'
>

export type DropdownMenuContentProps = Pick<
  RekaDropdownMenuContentProps,
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
  | 'loop'
  | 'positionStrategy'
  | 'prioritizePosition'
  | 'side'
  | 'sideFlip'
  | 'sideOffset'
  | 'sticky'
  | 'updatePositionStrategy'
>

export type DropdownMenuProps = Pick<DropdownMenuRootProps, 'modal'> &
  DropdownMenuContentProps & {
    open?: boolean
    heightArrow?: DropdownMenuArrowProps['height']
    roundedArrow?: DropdownMenuArrowProps['rounded']
    widthArrow?: DropdownMenuArrowProps['width']
    disabled?: DropdownMenuRootProps['disabled'] & DropdownMenuTriggerProps['disabled']
  }

export type DropdownMenuContentEmits = Pick<
  RekaDropdownMenuContentEmits,
  'closeAutoFocus' | 'escapeKeyDown' | 'focusOutside' | 'interactOutside' | 'pointerDownOutside'
>

export type DropdownMenuEmits = DropdownMenuRootEmits & DropdownMenuContentEmits

export interface DropdownMenuSlots {
  default?(): unknown
  content?(): unknown
}
