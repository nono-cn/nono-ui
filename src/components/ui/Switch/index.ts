import type { HTMLAttributes } from 'vue'
import type { SwitchRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { IconConfig } from '@/components/ui/Icon'

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
    severity: {
      primary:
        'focus-visible:border-primary focus-visible:ring-primary/50 data-[state=checked]:bg-primary',
      secondary:
        'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/50 data-[state=checked]:bg-secondary',
      warning:
        'focus-visible:border-warning focus-visible:ring-warning/50 data-[state=checked]:bg-warning',
      success:
        'focus-visible:border-success focus-visible:ring-success/50 data-[state=checked]:bg-success',
      error: 'focus-visible:border-error focus-visible:ring-error/50 data-[state=checked]:bg-error',
    },
    color: {
      true: 'focus-visible:border-(--switch-color) focus-visible:ring-(--switch-color)/50 data-[state=checked]:bg-(--switch-color)',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    severity: 'primary',
    color: false,
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
export type SwitchSeverity = NonNullable<SwitchVariants['severity']>

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
  severity?: SwitchSeverity
  color?: string
  uncheckedIcon?: IconConfig
  checkedIcon?: IconConfig
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
