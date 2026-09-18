import type { HTMLAttributes } from 'vue'
import type { SwitchRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'

export { default as Switch } from './Switch.vue'

export const switchVariants = cva('', {
  variants: {
    size: {
      xs: 'h-3.5 w-6',
      sm: 'h-4 w-7',
      md: 'h-5 w-9',
      lg: 'h-6 w-11',
      xl: 'h-7 w-13',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const switchThumbVariants = cva('', {
  variants: {
    size: {
      xs: 'size-3 data-[state=checked]:translate-x-[calc(100%-2px)]',
      sm: 'size-3.5 data-[state=checked]:translate-x-[calc(100%-2px)]',
      md: 'size-4 data-[state=checked]:translate-x-[calc(100%-2px)]',
      lg: 'size-5 data-[state=checked]:translate-x-[calc(100%-2px)]',
      xl: 'size-6 data-[state=checked]:translate-x-[calc(100%-2px)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type SwitchVariants = VariantProps<typeof switchVariants>
export type SwitchSize = NonNullable<SwitchVariants['size']>

export type SwitchValue = boolean | number | string
export type SwitchState = boolean
// Fn
export type SwitchFn<T> = (context: SwitchContext) => T

// UI
export interface SwitchUI {
  thumb?: SwitchFn<HTMLAttributes>
}

// Props
export interface SwitchProps extends Pick<
  SwitchRootProps<SwitchValue>,
  'trueValue' | 'falseValue'
> {
  value?: SwitchValue
  size?: SwitchSize
  ui?: SwitchUI
}

// Context
export interface SwitchContext {
  state: SwitchState
}

// Emits
export interface SwitchEmits {
  'update:value': [value: SwitchValue]
}

// Slots
export interface SwitchSlots {
  thumb?(props: SwitchContext): unknown
}
