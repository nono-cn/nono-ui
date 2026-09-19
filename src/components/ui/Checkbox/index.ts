import type { HTMLAttributes } from 'vue'
import type { CheckboxRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Checkbox } from './Checkbox.vue'

export const checkboxVariants = cva('', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
      xl: 'size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const checkboxIconVariants = cva('', {
  variants: {
    size: {
      xs: 'size-2.5',
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-4',
      xl: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type CheckboxVariants = VariantProps<typeof checkboxVariants>
export type CheckboxSize = NonNullable<CheckboxVariants['size']>

export type CheckboxValue = boolean | string | number
export type CheckboxModelValue = CheckboxValue | 'indeterminate'
export type CheckboxState = boolean | 'indeterminate'

// Fn
export type CheckboxFn<T> = (context: CheckboxContext) => T

// UI
export interface CheckboxUI {
  indicator?: CheckboxFn<HTMLAttributes>
}

// Props
export interface CheckboxProps extends Pick<
  CheckboxRootProps<CheckboxValue>,
  'trueValue' | 'falseValue'
> {
  value?: CheckboxModelValue
  size?: CheckboxSize
  icon?: IconConfig
  ui?: CheckboxUI
}

// Context
export interface CheckboxContext {
  state: CheckboxState
}

// Emits
export interface CheckboxEmits {
  'update:value': [value: CheckboxModelValue]
}
