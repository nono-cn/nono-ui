import { cva } from 'class-variance-authority'
import type { FieldRootProps } from 'reka-ui'

export { default as Field } from './Field.vue'

export const fieldRootVariants = cva('grid gap-2')

export type FieldProps = Pick<FieldRootProps, 'name' | 'disabled' | 'required'>

export interface FieldSlots {
  default?(props: { invalid: boolean; errors: string[] }): unknown
}
