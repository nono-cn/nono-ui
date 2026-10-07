import { cva } from 'class-variance-authority'
import type { FieldRootProps } from 'reka-ui'

export { default as Field } from './Field.vue'
export { fieldDefaults } from './constants'

export const fieldRootVariants = cva('grid gap-2')

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
>

export interface FieldSlots {
  default?(props: { invalid: boolean; errors: string[] }): unknown
}
