import type { HTMLAttributes } from 'vue'
import type { SwitchRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'
import { switchDefaults, switchSizes } from './constants'

export { default as Switch } from './Switch.vue'
export { switchDefaults, switchSizes } from './constants'

export const switchVariants = cva(
  'peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-(--switch-color) focus-visible:ring-3 focus-visible:ring-(--switch-color)/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input data-[state=checked]:bg-(--switch-color) dark:data-[state=unchecked]:bg-input/80',
  {
    variants: {
      size: {
        xs: 'h-3.5 w-6',
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11',
        xl: 'h-7 w-13',
      } satisfies Record<(typeof switchSizes)[number], string>,
    },
    defaultVariants: {
      size: switchDefaults.size,
    },
  },
)

export const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background ring-0 transition-transform [&>*]:!size-full data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-(--switch-color-foreground) dark:data-[state=unchecked]:bg-foreground [&>svg]:text-foreground',
  {
    variants: {
      size: {
        xs: 'size-3 data-[state=checked]:translate-x-[calc(100%-2px)]',
        sm: 'size-3.5 data-[state=checked]:translate-x-[calc(100%-2px)]',
        md: 'size-4 data-[state=checked]:translate-x-[calc(100%-2px)]',
        lg: 'size-5 data-[state=checked]:translate-x-[calc(100%-2px)]',
        xl: 'size-6 data-[state=checked]:translate-x-[calc(100%-2px)]',
      } satisfies Record<(typeof switchSizes)[number], string>,
    },
    defaultVariants: {
      size: switchDefaults.size,
    },
  },
)

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
  modelValue?: SwitchValue
  size?: SwitchSize
  color?: string
  uncheckedIcon?: IconName
  checkedIcon?: IconName
  ui?: SwitchUI
}

// Context
export interface SwitchContext {
  state: SwitchState
}

// Emits
export interface SwitchEmits {
  'update:modelValue': [value: SwitchValue]
}
