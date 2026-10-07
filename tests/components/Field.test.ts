import { mount, type MountingOptions } from '@vue/test-utils'
import { FieldRoot } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import { Field, type FieldProps } from '@/components/ui/Field'
import { testAttrs } from '../utils/testAttrs'

function mountField(options: MountingOptions<FieldProps> = {}) {
  return mount(Field, options)
}

const casesName = [
  { input: undefined, expected: undefined },
  { input: '', expected: '' },
  { input: 'email', expected: 'email' },
] satisfies Array<{
  input: FieldProps['name']
  expected: FieldProps['name']
}>

const casesDisabled = [
  { input: undefined, expected: undefined },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{
  input: FieldProps['disabled']
  expected: FieldProps['disabled']
}>

const casesRequired = [
  { input: undefined, expected: undefined },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{
  input: FieldProps['required']
  expected: FieldProps['required']
}>

describe('Field', () => {
  describe('props', () => {
    describe('name', () => {
      it.each(casesName)('pasa name=$input a FieldRoot', ({ input, expected }) => {
        const field = mountField({ props: { name: input } })

        expect(field.getComponent(FieldRoot).props('name')).toBe(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)('pasa disabled=$input a FieldRoot', ({ input, expected }) => {
        const field = mountField({ props: { disabled: input } })

        expect(field.getComponent(FieldRoot).props('disabled')).toBe(expected)
      })
    })

    describe('required', () => {
      it.each(casesRequired)('pasa required=$input a FieldRoot', ({ input, expected }) => {
        const field = mountField({ props: { required: input } })

        expect(field.getComponent(FieldRoot).props('required')).toBe(expected)
      })
    })
  })

  describe('Attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-field-root]',
      mount: (attrs) => mountField({ attrs }),
    })
  })

  describe('variantsCss', () => {
    describe('fieldRootVariants', () => {
      it('mantiene las clases base del field', () => {
        const root = mountField().get('[data-test-field-root]')

        expect(root.element.tagName).toBe('DIV')
        expect(root.classes()).toEqual(expect.arrayContaining(['grid', 'gap-2']))
      })
    })
  })
})
