import { inject, provide, type InjectionKey } from 'vue'

export interface FieldContext {
  for: string
  ariaLabelledby?: string
  ariaDescribedby?: string
}

const fieldKey: InjectionKey<FieldContext> = Symbol('Field')

export function provideField(context: FieldContext) {
  provide(fieldKey, context)
}

export function useField() {
  return inject(fieldKey, null)
}
