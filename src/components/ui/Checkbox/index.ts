import type { HTMLAttributes } from 'vue'
import type { CheckboxRootProps } from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Checkbox } from './Checkbox.vue'

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
