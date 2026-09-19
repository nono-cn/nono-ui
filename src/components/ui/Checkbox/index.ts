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
    severity: {
      primary:
        'focus-visible:border-primary focus-visible:ring-primary/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
      secondary:
        'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/50 data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=indeterminate]:border-secondary data-[state=indeterminate]:bg-secondary data-[state=indeterminate]:text-secondary-foreground',
      warning:
        'focus-visible:border-warning focus-visible:ring-warning/50 data-[state=checked]:border-warning data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground data-[state=indeterminate]:border-warning data-[state=indeterminate]:bg-warning data-[state=indeterminate]:text-warning-foreground',
      success:
        'focus-visible:border-success focus-visible:ring-success/50 data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=checked]:text-success-foreground data-[state=indeterminate]:border-success data-[state=indeterminate]:bg-success data-[state=indeterminate]:text-success-foreground',
      error:
        'focus-visible:border-error focus-visible:ring-error/50 data-[state=checked]:border-error data-[state=checked]:bg-error data-[state=checked]:text-error-foreground data-[state=indeterminate]:border-error data-[state=indeterminate]:bg-error data-[state=indeterminate]:text-error-foreground',
    },
    color: {
      true: 'focus-visible:border-(--checkbox-color) focus-visible:ring-(--checkbox-color)/50 data-[state=checked]:border-(--checkbox-color) data-[state=checked]:bg-(--checkbox-color) data-[state=checked]:text-(--checkbox-color-foreground) data-[state=indeterminate]:border-(--checkbox-color) data-[state=indeterminate]:bg-(--checkbox-color) data-[state=indeterminate]:text-(--checkbox-color-foreground)',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    severity: 'primary',
    color: false,
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
export type CheckboxSeverity = NonNullable<CheckboxVariants['severity']>

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
  severity?: CheckboxSeverity
  color?: string
  icon?: IconConfig
  indeterminateIcon?: IconConfig
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
