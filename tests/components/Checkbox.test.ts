import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { CheckboxRoot } from 'reka-ui'

import { Checkbox, type CheckboxProps } from '@/components/ui/Checkbox'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'
import { testIconConfig } from '../utils/testIconConfig'

function mountCheckbox(options: MountingOptions<CheckboxProps> = {}) {
  return mount(Checkbox, options)
}

const casesValue = [
  { input: true, trueValue: true, falseValue: false, expected: true },
  { input: false, trueValue: true, falseValue: false, expected: false },
  {
    input: 'indeterminate' as const,
    trueValue: true,
    falseValue: false,
    expected: 'indeterminate' as const,
  },
  { input: undefined, trueValue: true, falseValue: false, expected: false },
  { input: 'yes', trueValue: 'yes', falseValue: 'no', expected: 'yes' },
  { input: 'no', trueValue: 'yes', falseValue: 'no', expected: 'no' },
  {
    input: 'indeterminate' as const,
    trueValue: 'yes',
    falseValue: 'no',
    expected: 'indeterminate' as const,
  },
  { input: 'invalid', trueValue: 'yes', falseValue: 'no', expected: 'no' },
] as const

const casesUpdateValue = [
  { value: false, trueValue: true, falseValue: false, expected: true },
  { value: true, trueValue: true, falseValue: false, expected: false },
  { value: 'off', trueValue: 'on', falseValue: 'off', expected: 'on' },
]

describe('Checkbox', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('pasa value=$input como modelValue=$expected', (inputCase) => {
        const { input, trueValue, falseValue, expected } = inputCase
        const root = mountCheckbox({ props: { value: input, trueValue, falseValue } }).getComponent(
          CheckboxRoot,
        )

        expect(root.props('modelValue')).toBe(expected)
        expect(root.props('trueValue')).toBe(trueValue)
        expect(root.props('falseValue')).toBe(falseValue)
      })
    })

    describe('trueValue', () => {
      it('usa true por defecto', () => {
        const root = mountCheckbox().getComponent(CheckboxRoot)

        expect(root.props('trueValue')).toBe(true)
      })
    })

    describe('falseValue', () => {
      it('usa false por defecto', () => {
        const root = mountCheckbox().getComponent(CheckboxRoot)

        expect(root.props('falseValue')).toBe(false)
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa la configuración del icono',
        id: Icon,
        default: 'check',
        mount: (icon) => mountCheckbox({ props: { value: true, icon } }),
      })
    })

    describe('ui.indicator', () => {
      testAttrs({
        text: 'pasa los atributos de ui.indicator',
        id: '[data-test-checkbox-indicator]',
        mount: (attrs) =>
          mountCheckbox({
            props: {
              value: true,
              ui: { indicator: () => attrs },
            },
          }),
      })
    })
  })

  describe('root configuration', () => {
    it('siempre pasa as=button', () => {
      const root = mountCheckbox().getComponent(CheckboxRoot)

      expect(root.props('as')).toBe('button')
    })

    it('siempre pasa asChild=false', () => {
      const root = mountCheckbox().getComponent(CheckboxRoot)

      expect(root.props('asChild')).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-checkbox-root]',
      mount: (attrs) => mountCheckbox({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each(casesUpdateValue)(
        'emite el siguiente valor tras interactuar con la raíz',
        async ({ value, trueValue, falseValue, expected }) => {
          const checkbox = mountCheckbox({ props: { value, trueValue, falseValue } })

          await checkbox.get('[data-test-checkbox-root]').trigger('click')

          expect(checkbox.emitted('update:value')).toEqual([[expected]])
        },
      )
    })
  })
})
