import type { HTMLAttributes } from 'vue'
import type { CheckboxRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { IconName } from '@/components/ui/Icon'
import { checkboxDefaults, checkboxSizes } from './constants'

export { default as Checkbox } from './Checkbox.vue'
export { checkboxDefaults, checkboxSizes } from './constants'

export const checkboxVariants = cva(
  'peer shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-(--checkbox-color) focus-visible:ring-3 focus-visible:ring-(--checkbox-color)/30 data-[state=checked]:border-(--checkbox-color) data-[state=checked]:bg-(--checkbox-color) data-[state=checked]:text-(--checkbox-color-foreground) data-[state=indeterminate]:border-(--checkbox-color) data-[state=indeterminate]:bg-(--checkbox-color) data-[state=indeterminate]:text-(--checkbox-color-foreground) disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-5',
        xl: 'size-6',
      } satisfies Record<(typeof checkboxSizes)[number], string>,
    },
    defaultVariants: {
      size: checkboxDefaults.size,
    },
  },
)

export const checkboxIndicatorVariants = cva('grid place-content-center')

export const checkboxIconVariants = cva('', {
  variants: {
    size: {
      xs: 'size-2.5',
      sm: 'size-3',
      md: 'size-3.5',
      lg: 'size-4',
      xl: 'size-5',
    } satisfies Record<(typeof checkboxSizes)[number], string>,
  },
  defaultVariants: {
    size: checkboxDefaults.size,
  },
})

export type CheckboxVariants = VariantProps<typeof checkboxVariants>
export type CheckboxSize = NonNullable<CheckboxVariants['size']>
export type CheckboxIcon = IconName

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
  color?: string
  icon?: CheckboxIcon
  indeterminateIcon?: CheckboxIcon
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
