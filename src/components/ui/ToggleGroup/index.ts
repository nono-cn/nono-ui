import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'
import type {
  ToggleGroupItemProps as RekaToggleGroupItemProps,
  ToggleGroupRootProps as RekaToggleGroupRootProps,
} from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'
import type { ToggleVariants } from '@/components/ui/Toggle'
import type { EmitsAsProps } from '@/types/emits'

export { default as ToggleGroup } from './ToggleGroup.vue'

export const toggleGroupVariants = cva('group/toggle-group flex w-fit gap-(--toggle-group-gap)', {
  variants: {
    orientation: {
      horizontal: 'items-center',
      vertical: 'flex-col items-stretch',
    },
    spaced: {
      true: '',
      false: '[&>*]:rounded-none',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      spaced: false,
      class: '[&>*+*]:border-l-0 [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md',
    },
    {
      orientation: 'vertical',
      spaced: false,
      class: '[&>*+*]:border-t-0 [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    spaced: false,
  },
})

export type ToggleGroupValue = string | number
export type ToggleGroupModelValue = ToggleGroupValue | ToggleGroupValue[] | undefined

// Props Reka
export type ToggleGroupRootProps = Pick<
  RekaToggleGroupRootProps<ToggleGroupModelValue>,
  'type' | 'dir' | 'loop' | 'rovingFocus' | 'disabled' | 'orientation'
>

export type ToggleGroupItemProps = Pick<RekaToggleGroupItemProps, 'value' | 'disabled'>

export type ToggleGroupType = NonNullable<ToggleGroupRootProps['type']>
export type ToggleGroupOrientation = NonNullable<ToggleGroupRootProps['orientation']>
export type ToggleGroupVariant = NonNullable<ToggleVariants['variant']>
export type ToggleGroupSeverity =
  'default' | 'primary' | 'secondary' | 'warning' | 'success' | 'error'
export type ToggleGroupSize = NonNullable<ToggleVariants['size']>

// Item
export interface ToggleGroupItem extends ToggleGroupItemProps {
  label?: string
  icon?: IconConfig
  trailingIcon?: IconConfig
}

// Props
export interface ToggleGroupProps extends ToggleGroupRootProps {
  value?: ToggleGroupModelValue
  variant?: ToggleGroupVariant
  severity?: ToggleGroupSeverity
  size?: ToggleGroupSize
  color?: string
  spacing?: number
  mandatory?: boolean
  items?: ToggleGroupItem[]
  ui?: ToggleGroupUI
}

// Fn
export type ToggleGroupFn<T> = (context: ToggleGroupContext) => T
export type ToggleGroupItemFn<T> = (context: ToggleGroupItemContext) => T

// UI
export interface ToggleGroupUI {
  root?: ToggleGroupFn<HTMLAttributes>
  item?: ToggleGroupItemFn<HTMLAttributes>
  label?: ToggleGroupItemFn<HTMLAttributes>
}

// Context
export interface ToggleGroupContext {
  value: ToggleGroupModelValue
  orientation: NonNullable<ToggleGroupProps['orientation']>
  disabled: boolean
}

export interface ToggleGroupItemContext {
  item: ToggleGroupItem
  index: number
  selected: boolean
  disabled: boolean
}

// Emits
export interface ToggleGroupEmits {
  'update:value': [value: ToggleGroupModelValue]
  valueChange: [value: ToggleGroupModelValue]
}

// Slots
export type ToggleGroupSlots = {
  item?(props: ToggleGroupItemContext): unknown
  leading?(props: ToggleGroupItemContext): unknown
  label?(props: ToggleGroupItemContext): unknown
  trailing?(props: ToggleGroupItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: ToggleGroupItemContext) => unknown) | undefined
  [name: `leading-${string}`]: ((props: ToggleGroupItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: ToggleGroupItemContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: ToggleGroupItemContext) => unknown) | undefined
}

// Normalize
export type NormalizeToggleGroupProps = ToggleGroupProps & EmitsAsProps<ToggleGroupEmits>
