import type { FormRootEmits, FormRootProps } from 'reka-ui'

export { default as Form } from './Form.vue'

export type FormProps = Pick<FormRootProps, 'errors' | 'validationMode'>
export type FormEmits = Pick<FormRootEmits, 'submit' | 'formSubmit'>

export interface FormSlots {
  default?(): unknown
}

export interface FormExpose {
  validate: (name?: string) => boolean
}
