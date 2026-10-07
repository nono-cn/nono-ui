import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'

import { provideField, useField, type FieldContext } from '@/composables/useField'

const fieldCases = [
  { input: { for: 'label-1' }, expected: { for: 'label-1' } },
  {
    input: { for: 'label-2', ariaDescribedby: undefined },
    expected: { for: 'label-2', ariaDescribedby: undefined },
  },
  {
    input: { for: 'label-3', ariaDescribedby: 'description-3' },
    expected: { for: 'label-3', ariaDescribedby: 'description-3' },
  },
  {
    input: { for: 'label-4', ariaDescribedby: '' },
    expected: { for: 'label-4', ariaDescribedby: '' },
  },
] satisfies Array<{ input: FieldContext; expected: FieldContext }>

function consumeField(context?: FieldContext) {
  let injected: FieldContext | null = null

  const Consumer = defineComponent({
    setup() {
      injected = useField()
      return () => h('span')
    },
  })

  if (context) {
    const Provider = defineComponent({
      setup() {
        provideField(context)
        return () => h(Consumer)
      },
    })

    mount(Provider)
  } else {
    mount(Consumer)
  }

  return injected
}

describe('useField', () => {
  it('devuelve null si no hay un Field proveedor', () => {
    expect(consumeField()).toBeNull()
  })

  it.each(fieldCases)('inyecta el contexto completo: $input', ({ input, expected }) => {
    const injected = consumeField(input)

    expect(injected).toBe(input)
    expect(injected).toEqual(expected)
  })
})
