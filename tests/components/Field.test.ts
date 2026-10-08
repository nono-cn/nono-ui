import { mount, type MountingOptions } from '@vue/test-utils'
import { FieldRoot } from 'reka-ui'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import { Field, type FieldProps } from '@/components/ui/Field'
import { useField, type FieldContext } from '@/composables/useField'
import { testAttrs } from '../utils/testAttrs'

function mountField(options: MountingOptions<FieldProps> = {}) {
  return mount(Field, options)
}

function mountFieldWithContext(description?: string) {
  let context: FieldContext | null = null

  const Consumer = defineComponent({
    setup() {
      context = useField()
      return () => h('span')
    },
  })

  const field = mountField({
    props: { label: 'Email', description },
    slots: { default: () => h(Consumer) },
  })

  return { field, getContext: () => context }
}

const casesName = [
  { input: undefined, expected: undefined },
  { input: '', expected: '' },
  { input: 'email', expected: 'email' },
] satisfies Array<{
  input: FieldProps['name']
  expected: FieldProps['name']
}>

const casesLabel = [
  { input: undefined, expected: undefined },
  { input: '', expected: undefined },
  { input: 'Email', expected: 'Email' },
] satisfies Array<{
  input: FieldProps['label']
  expected: string | undefined
}>

const casesDescription = [
  { input: undefined, expected: undefined },
  { input: '', expected: undefined },
  { input: 'Helper text', expected: 'Helper text' },
] satisfies Array<{
  input: FieldProps['description']
  expected: string | undefined
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

const casesInvalid = [
  { input: undefined, expected: undefined },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{
  input: FieldProps['invalid']
  expected: FieldProps['invalid']
}>

const casesDirty = [
  { input: undefined, expected: undefined },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{
  input: FieldProps['dirty']
  expected: FieldProps['dirty']
}>

const casesTouched = [
  { input: undefined, expected: undefined },
  { input: false, expected: false },
  { input: true, expected: true },
] satisfies Array<{
  input: FieldProps['touched']
  expected: FieldProps['touched']
}>

const syncValidate: NonNullable<FieldProps['validate']> = (value) =>
  value === 'valid' ? null : 'Invalid value'
const asyncValidate: NonNullable<FieldProps['validate']> = async (value) =>
  value === 'valid' ? null : 'Invalid value'

const casesValidate = [
  { input: undefined, expected: undefined },
  { input: syncValidate, expected: syncValidate },
  { input: asyncValidate, expected: asyncValidate },
] satisfies Array<{
  input: FieldProps['validate']
  expected: FieldProps['validate']
}>

const casesValidationDebounceTime = [
  { input: undefined, expected: undefined },
  { input: 0, expected: 0 },
  { input: 300, expected: 300 },
] satisfies Array<{
  input: FieldProps['validationDebounceTime']
  expected: FieldProps['validationDebounceTime']
}>

const casesValidationMode = [
  { input: undefined, expected: undefined },
  { input: 'onSubmit', expected: 'onSubmit' },
  { input: 'onBlur', expected: 'onBlur' },
  { input: 'onChange', expected: 'onChange' },
] satisfies Array<{
  input: FieldProps['validationMode']
  expected: FieldProps['validationMode']
}>

describe('Field', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input', ({ input, expected }) => {
        const field = mountField({ props: { label: input } })
        const label = field.find('[data-test-field-label]')

        expect(label.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(label.text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each(casesDescription)('renderiza description=$input', ({ input, expected }) => {
        const field = mountField({ props: { description: input } })
        const description = field.find('[data-test-field-description]')

        expect(description.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(description.text()).toBe(expected)
      })
    })

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

    describe('invalid', () => {
      it.each(casesInvalid)('pasa invalid=$input a FieldRoot', ({ input, expected }) => {
        const field = mountField({ props: { invalid: input } })

        expect(field.getComponent(FieldRoot).props('invalid')).toBe(expected)
      })

      it('mantiene invalid sin controlar cuando se omite', () => {
        expect(mountField().getComponent(FieldRoot).props('invalid')).toBeUndefined()
      })
    })

    describe('dirty', () => {
      it.each(casesDirty)('pasa dirty=$input a FieldRoot', ({ input, expected }) => {
        const field = mountField({ props: { dirty: input } })

        expect(field.getComponent(FieldRoot).props('dirty')).toBe(expected)
      })

      it('mantiene dirty sin controlar cuando se omite', () => {
        expect(mountField().getComponent(FieldRoot).props('dirty')).toBeUndefined()
      })
    })

    describe('touched', () => {
      it.each(casesTouched)('pasa touched=$input a FieldRoot', ({ input, expected }) => {
        const field = mountField({ props: { touched: input } })

        expect(field.getComponent(FieldRoot).props('touched')).toBe(expected)
      })

      it('mantiene touched sin controlar cuando se omite', () => {
        expect(mountField().getComponent(FieldRoot).props('touched')).toBeUndefined()
      })
    })

    describe('validate', () => {
      it.each(casesValidate)('pasa validate=$input a FieldRoot', ({ input, expected }) => {
        const field = mountField({ props: { validate: input } })

        expect(field.getComponent(FieldRoot).props('validate')).toBe(expected)
      })
    })

    describe('validationMode', () => {
      it.each(casesValidationMode)(
        'pasa validationMode=$input a FieldRoot',
        ({ input, expected }) => {
          const field = mountField({ props: { validationMode: input } })

          expect(field.getComponent(FieldRoot).props('validationMode')).toBe(expected)
        },
      )
    })

    describe('validationDebounceTime', () => {
      it.each(casesValidationDebounceTime)(
        'pasa validationDebounceTime=$input a FieldRoot',
        ({ input, expected }) => {
          const field = mountField({ props: { validationDebounceTime: input } })

          expect(field.getComponent(FieldRoot).props('validationDebounceTime')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      describe('label', () => {
        testAttrs({
          text: 'pasa los atributos de ui.label al label',
          id: '[data-test-field-label]',
          mount: (attrs) =>
            mountField({
              props: { label: 'Email', ui: { label: () => attrs } },
            }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'pasa los atributos de ui.description a la descripción',
          id: '[data-test-field-description]',
          assertId: false,
          mount: (attrs) =>
            mountField({
              props: { description: 'Helper text', ui: { description: () => attrs } },
            }),
        })
      })
    })
  })

  describe('slots', () => {
    describe('label', () => {
      it('renderiza el slot aunque no haya prop label', () => {
        const field = mountField({
          slots: { label: () => h('span', { 'data-test-label-slot': '' }, 'Nombre') },
        })

        expect(field.get('[data-test-field-label] [data-test-label-slot]').text()).toBe('Nombre')
      })

      it('sustituye el texto de label con el slot', () => {
        const field = mountField({
          props: { label: 'Texto original' },
          slots: { label: () => h('span', { 'data-test-label-slot': '' }, 'Texto nuevo') },
        })

        expect(field.get('[data-test-field-label]').text()).toBe('Texto nuevo')
        expect(field.get('[data-test-field-label]').text()).not.toContain('Texto original')
      })
    })

    describe('description', () => {
      it('renderiza el slot aunque no haya prop description', () => {
        const field = mountField({
          slots: {
            description: () => h('span', { 'data-test-description-slot': '' }, 'Ayuda'),
          },
        })

        expect(field.get('[data-test-field-description] [data-test-description-slot]').text()).toBe(
          'Ayuda',
        )
      })

      it('sustituye el texto de description con el slot', () => {
        const field = mountField({
          props: { description: 'Texto original' },
          slots: {
            description: () => h('span', { 'data-test-description-slot': '' }, 'Texto nuevo'),
          },
        })

        expect(field.get('[data-test-field-description]').text()).toBe('Texto nuevo')
        expect(field.get('[data-test-field-description]').text()).not.toContain('Texto original')
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
    describe('fieldDescriptionVariants', () => {
      it('mantiene las clases base de la descripción', () => {
        const description = mountField({ props: { description: 'Ayuda' } }).get(
          '[data-test-field-description]',
        )

        expect(description.element.tagName).toBe('P')
        expect(description.classes()).toEqual(
          expect.arrayContaining(['text-sm', 'text-muted-foreground']),
        )
      })
    })

    describe('fieldLabelVariants', () => {
      it('mantiene las clases base del label', () => {
        const label = mountField({ props: { label: 'Email' } }).get('[data-test-field-label]')

        expect(label.element.tagName).toBe('LABEL')
        expect(label.classes()).toEqual(expect.arrayContaining(['text-sm', 'font-medium']))
      })
    })

    describe('fieldRootVariants', () => {
      it('mantiene las clases base del field', () => {
        const root = mountField().get('[data-test-field-root]')

        expect(root.element.tagName).toBe('DIV')
        expect(root.classes()).toEqual(expect.arrayContaining(['grid', 'gap-2']))
      })
    })
  })

  describe('context contract', () => {
    it('proporciona los IDs generados del label y la descripción', () => {
      const { field, getContext } = mountFieldWithContext('Ayuda')
      const labelFor = field.get('[data-test-field-label]').attributes('for')
      const labelId = field.get('[data-test-field-label]').attributes('id')
      const descriptionId = field.get('[data-test-field-description]').attributes('id')

      expect(labelFor).toMatch(/^label-/)
      expect(labelId).toMatch(/^field-label-/)
      expect(descriptionId).toMatch(/^description-/)
      expect(getContext()).toEqual({
        for: labelFor,
        ariaLabelledby: labelId,
        ariaDescribedby: descriptionId,
      })
    })

    it('no proporciona ariaDescribedby cuando no hay descripción', () => {
      const { field, getContext } = mountFieldWithContext()
      const labelFor = field.get('[data-test-field-label]').attributes('for')
      const labelId = field.get('[data-test-field-label]').attributes('id')

      expect(field.find('[data-test-field-description]').exists()).toBe(false)
      expect(getContext()).toEqual({
        for: labelFor,
        ariaLabelledby: labelId,
        ariaDescribedby: undefined,
      })
    })

    it('no proporciona ariaLabelledby cuando no hay label', () => {
      let context: FieldContext | null = null
      const Consumer = defineComponent({
        setup() {
          context = useField()
          return () => h('span')
        },
      })
      const field = mountField({ slots: { default: () => h(Consumer) } })

      expect(field.find('[data-test-field-label]').exists()).toBe(false)
      expect(context?.ariaLabelledby).toBeUndefined()
    })

    it('ariaLabelledby coincide con el id personalizado del label', async () => {
      const { field, getContext } = mountFieldWithContext()
      await field.setProps({ ui: { label: () => ({ id: 'email-label' }) } })

      expect(field.get('[data-test-field-label]').attributes('id')).toBe('email-label')
      expect(getContext()?.ariaLabelledby).toBe('email-label')
    })

    it('ariaDescribedby coincide con el id personalizado de la descripción', async () => {
      const { field, getContext } = mountFieldWithContext('Ayuda')
      await field.setProps({ ui: { description: () => ({ id: 'email-help' }) } })

      expect(field.get('[data-test-field-description]').attributes('id')).toBe('email-help')
      expect(getContext()?.ariaDescribedby).toBe('email-help')
    })
  })
})
