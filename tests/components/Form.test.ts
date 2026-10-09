import { mount, type MountingOptions } from '@vue/test-utils'
import { FieldControl, FieldLabel, FieldRoot, FormRoot } from 'reka-ui'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Form, type FormProps } from '@/components/ui/Form'
import { testAttrs } from '../utils/testAttrs'

function mountForm(options: MountingOptions<FormProps> = {}) {
  return mount(Form, options)
}

function registeredField() {
  return h(FieldRoot, { name: 'email', required: true }, () => [
    h(FieldLabel, null, () => 'Email'),
    h(FieldControl, { as: 'input', type: 'email' }),
  ])
}

const casesErrors = [
  { input: undefined, expected: undefined },
  { input: {}, expected: {} },
  { input: { email: 'Correo no válido' }, expected: { email: 'Correo no válido' } },
  {
    input: { email: ['Correo no válido', 'Prueba con otro'] },
    expected: { email: ['Correo no válido', 'Prueba con otro'] },
  },
]

const casesValidationMode = [
  { input: undefined, expected: 'onSubmit' },
  { input: 'onSubmit' as const, expected: 'onSubmit' },
  { input: 'onBlur' as const, expected: 'onBlur' },
  { input: 'onChange' as const, expected: 'onChange' },
]

describe('Form', () => {
  describe('props', () => {
    describe('errors', () => {
      it.each(casesErrors)('pasa errors=$input a FormRoot', ({ input, expected }) => {
        const form = mountForm({ props: { errors: input } })
        expect(form.getComponent(FormRoot).props('errors')).toEqual(expected)
      })
    })

    describe('validationMode', () => {
      it.each(casesValidationMode)('pasa validationMode=$input a FormRoot', ({ input, expected }) => {
        const form = mountForm({ props: { validationMode: input } })
        expect(form.getComponent(FormRoot).props('validationMode')).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa atributos arbitrarios, class y style al formulario',
      id: '[data-test-form-root]',
      mount: (attrs) => mountForm({ attrs }),
    })

    it('renderiza un formulario nativo con novalidate', () => {
      const root = mountForm().get('[data-test-form-root]')
      expect(root.element.tagName).toBe('FORM')
      expect(root.attributes('novalidate')).toBeDefined()
    })
  })

  describe('emits', () => {
    describe('submit', () => {
      it('reenvía el evento emitido por FormRoot', () => {
        const form = mountForm()
        const event = new Event('submit') as SubmitEvent

        form.getComponent(FormRoot).vm.$emit('submit', event)

        expect(form.emitted('submit')).toEqual([[event]])
      })
    })

    describe('formSubmit', () => {
      it('reenvía los valores y el evento emitidos por FormRoot', () => {
        const onFormSubmit = vi.fn()
        const form = mountForm({ attrs: { onFormSubmit } })
        const values = { email: 'hello@example.com' }
        const event = new Event('submit') as SubmitEvent

        form.getComponent(FormRoot).vm.$emit('formSubmit', values, event)

        expect(form.emitted('formSubmit')).toEqual([[values, event]])
        expect(onFormSubmit).toHaveBeenCalledWith(values, event)
      })
    })
  })

  describe('slots', () => {
    it('renderiza el contenido predeterminado dentro del formulario', () => {
      const form = mountForm({
        slots: { default: () => h('button', { type: 'submit' }, 'Enviar') },
      })
      expect(form.get('[data-test-form-root] button').text()).toBe('Enviar')
    })
  })

  describe('expose', () => {
    it('valida todos los campos registrados o un campo concreto', async () => {
      const form = mountForm({ slots: { default: registeredField } })
      const exposed = form.vm as unknown as { validate: (name?: string) => boolean }

      expect(exposed.validate()).toBe(false)
      expect(exposed.validate('email')).toBe(false)
      expect(exposed.validate('missing')).toBe(true)

      await form.get('input').setValue('hello@example.com')
      expect(exposed.validate('email')).toBe(true)
    })
  })
})
