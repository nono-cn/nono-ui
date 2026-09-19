import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { CheckboxRoot } from 'reka-ui'

import {
  Checkbox,
  type CheckboxProps,
  type CheckboxSeverity,
  type CheckboxSize,
} from '@/components/ui/Checkbox'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
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

const sizeCases = [
  { size: 'xs', rootClass: 'size-3', iconClass: 'size-2.5' },
  { size: 'sm', rootClass: 'size-3.5', iconClass: 'size-3' },
  { size: 'md', rootClass: 'size-4', iconClass: 'size-3.5' },
  { size: 'lg', rootClass: 'size-5', iconClass: 'size-4' },
  { size: 'xl', rootClass: 'size-6', iconClass: 'size-5' },
  { size: undefined, rootClass: 'size-4', iconClass: 'size-3.5' },
] satisfies Array<{ size: CheckboxSize | undefined; rootClass: string; iconClass: string }>

const severityCases = [
  { severity: 'primary', class: 'data-[state=checked]:bg-primary' },
  { severity: 'secondary', class: 'data-[state=checked]:bg-secondary' },
  { severity: 'warning', class: 'data-[state=checked]:bg-warning' },
  { severity: 'success', class: 'data-[state=checked]:bg-success' },
  { severity: 'error', class: 'data-[state=checked]:bg-error' },
  { severity: undefined, class: 'data-[state=checked]:bg-primary' },
] satisfies Array<{ severity: CheckboxSeverity | undefined; class: string }>

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

      it('normaliza un value inválido a falseValue', () => {
        const root = mountCheckbox({
          props: { value: 'invalid', trueValue: 'on', falseValue: 'off' },
        }).getComponent(CheckboxRoot)

        expect(root.props('modelValue')).toBe('off')
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

    describe('size', () => {
      it.each(sizeCases)('renderiza size=$size', ({ size, rootClass, iconClass }) => {
        const checkbox = mountCheckbox({ props: { value: true, size } })

        expect(checkbox.get('[data-test-checkbox-root]').classes()).toContain(rootClass)
        expect(checkbox.get('[data-test-checkbox-icon]').classes()).toContain(iconClass)
      })
    })

    describe('severity', () => {
      it.each(severityCases)('renderiza severity=$severity', ({ severity, class: className }) => {
        const checkbox = mountCheckbox({ props: { severity } })

        expect(checkbox.get('[data-test-checkbox-root]').classes()).toContain(className)
      })
    })

    describe('color', () => {
      testColor({
        text: 'aplica un color personalizado',
        id: '[data-test-checkbox-root]',
        varColor: '--checkbox-color',
        mount: (color) => mountCheckbox({ props: { color } }),
      })

      it('tiene prioridad sobre severity', () => {
        const root = mountCheckbox({
          props: { color: '#8b5cf6', severity: 'error' },
        }).get('[data-test-checkbox-root]')

        expect(root.classes()).toContain('data-[state=checked]:bg-(--checkbox-color)')
        expect(root.classes()).toContain('focus-visible:ring-(--checkbox-color)/50')
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa la configuración del icono',
        id: '[data-test-checkbox-icon]',
        default: 'check',
        omit: ['size', 'color'],
        mount: (icon) => mountCheckbox({ props: { value: true, icon } }),
      })

      it('siempre pasa size undefined al icono', () => {
        const checkbox = mountCheckbox({
          props: { value: true, icon: { name: 'check', size: 'xl' } },
        })
        const icon = checkbox.getComponent('[data-test-checkbox-icon]')

        expect(icon.vm.$.vnode.props?.size).toBeUndefined()
      })

      it('siempre pasa color undefined al icono', () => {
        const checkbox = mountCheckbox({
          props: { value: true, icon: { name: 'check', color: '#ff0000' } },
        })
        const icon = checkbox.getComponent('[data-test-checkbox-icon]')

        expect(icon.vm.$.vnode.props?.color).toBeUndefined()
      })

      it('no renderiza el icono cuando no está checkeado', () => {
        const checkbox = mountCheckbox({ props: { value: false } })

        expect(checkbox.find('[data-test-checkbox-icon]').exists()).toBe(false)
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
