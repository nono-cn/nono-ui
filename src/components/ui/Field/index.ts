import { cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { FieldRootProps } from 'reka-ui'

export { default as Field } from './Field.vue'
export { fieldDefaults } from './constants'

export const fieldRootVariants = cva('grid gap-2')
export const fieldLabelVariants = cva('text-sm font-medium')

export type FieldFn<T> = () => T

export interface FieldUI {
  label?: FieldFn<HTMLAttributes>
}

export type FieldProps = Pick<
  FieldRootProps,
  | 'name'
  | 'disabled'
  | 'required'
  | 'invalid'
  | 'dirty'
  | 'touched'
  | 'validate'
  | 'validationMode'
  | 'validationDebounceTime'
> & { label?: string; ui?: FieldUI }

export interface FieldSlots {
  default?(props: { invalid: boolean; errors: string[] }): unknown
  label?(): unknown
}
