import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { CheckboxRoot } from 'reka-ui'

import { Checkbox, type CheckboxProps, type CheckboxSize } from '@/components/ui/Checkbox'
import { themeColors } from '@/components/ui/constants'
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
  { input: 1, trueValue: 1, falseValue: 0, expected: 1 },
  { input: 0, trueValue: 1, falseValue: 0, expected: 0 },
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
  { value: 0, trueValue: 1, falseValue: 0, expected: 1 },
  { value: 'indeterminate' as const, trueValue: true, falseValue: false, expected: true },
]

const sizeCases = [
  { size: 'xs', rootClass: 'size-3', iconClass: 'size-2.5' },
  { size: 'sm', rootClass: 'size-3.5', iconClass: 'size-3' },
  { size: 'md', rootClass: 'size-4', iconClass: 'size-3.5' },
  { size: 'lg', rootClass: 'size-5', iconClass: 'size-4' },
  { size: 'xl', rootClass: 'size-6', iconClass: 'size-5' },
  { size: undefined, rootClass: 'size-4', iconClass: 'size-3.5' },
] satisfies Array<{ size: CheckboxSize | undefined; rootClass: string; iconClass: string }>

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

      it('normaliza value si cambia el par trueValue/falseValue', async () => {
        const checkbox = mountCheckbox({
          props: { value: 'yes', trueValue: 'yes', falseValue: 'no' },
        })

        await checkbox.setProps({ trueValue: 'on', falseValue: 'off' })

        expect(checkbox.getComponent(CheckboxRoot).props('modelValue')).toBe('off')
      })
    })

    describe('trueValue', () => {
      it('usa true por defecto', () => {
        const root = mountCheckbox().getComponent(CheckboxRoot)

        expect(root.props('trueValue')).toBe(true)
      })

      it('pasa el valor personalizado a Reka UI', () => {
        expect(
          mountCheckbox({ props: { trueValue: 'yes', falseValue: 'no' } })
            .getComponent(CheckboxRoot)
            .props('trueValue'),
        ).toBe('yes')
      })
    })

    describe('falseValue', () => {
      it('usa false por defecto', () => {
        const root = mountCheckbox().getComponent(CheckboxRoot)

        expect(root.props('falseValue')).toBe(false)
      })

      it('pasa el valor personalizado a Reka UI', () => {
        expect(
          mountCheckbox({ props: { falseValue: 0, trueValue: 1 } })
            .getComponent(CheckboxRoot)
            .props('falseValue'),
        ).toBe(0)
      })
    })

    describe('size', () => {
      it.each(sizeCases)('renderiza size=$size', ({ size, rootClass, iconClass }) => {
        const checkbox = mountCheckbox({ props: { value: true, size } })

        expect(checkbox.get('[data-test-checkbox-root]').classes()).toContain(rootClass)
        expect(checkbox.get('[data-test-checkbox-icon]').classes()).toContain(iconClass)
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve un color de tema o CSS',
        id: '[data-test-checkbox-root]',
        varColor: '--checkbox-color',
        defaultColor: 'var(--primary, var(--primary))',
        fallbackColor: 'primary',
        theme: {
          colors: themeColors,
          foregroundVar: '--checkbox-color-foreground',
          solidVar: '--checkbox-solid',
          solidForegroundVar: '--checkbox-solid-foreground',
        },
        mount: (color) => mountCheckbox({ props: { color } }),
      })

      it('aplica el mismo color en checked, indeterminate y foco', () => {
        const root = mountCheckbox({ props: { color: '#8b5cf6' } }).get('[data-test-checkbox-root]')

        expect(root.classes()).toContain('data-[state=checked]:bg-(--checkbox-color)')
        expect(root.classes()).toContain('focus-visible:ring-(--checkbox-color)/30')
        expect(root.classes()).toContain('data-[state=indeterminate]:bg-(--checkbox-color)')
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa la configuración del icono',
        id: '[data-test-checkbox-icon]',
        default: 'check',
        mount: (icon) => mountCheckbox({ props: { value: true, icon } }),
      })

      it('acepta un nombre de icono', () => {
        const icon = mountCheckbox({ props: { value: true, icon: 'plus' } }).getComponent(
          '[data-test-checkbox-icon]',
        )

        expect(icon.props('name')).toBe('plus')
        expect(icon.props('color')).toBe('currentColor')
      })

      it('respeta el tamaño explícito del icono', () => {
        const checkbox = mountCheckbox({
          props: { value: true, icon: { name: 'check', size: 'xl' } },
        })
        const icon = checkbox.getComponent('[data-test-checkbox-icon]')

        expect(icon.props('size')).toBe('xl')
      })

      it('respeta el color explícito del icono', () => {
        const checkbox = mountCheckbox({
          props: { value: true, icon: { name: 'check', color: '#ff0000' } },
        })
        const icon = checkbox.getComponent('[data-test-checkbox-icon]')

        expect(icon.props('color')).toBe('#ff0000')
      })

      it('no renderiza el icono cuando no está checkeado', () => {
        const checkbox = mountCheckbox({ props: { value: false } })

        expect(checkbox.find('[data-test-checkbox-icon]').exists()).toBe(false)
      })
    })

    describe('indeterminateIcon', () => {
      testIconConfig({
        text: 'pasa la configuración del icono indeterminado',
        id: '[data-test-checkbox-icon]',
        default: 'minus',
        mount: (icon) =>
          mountCheckbox({ props: { value: 'indeterminate', indeterminateIcon: icon } }),
      })

      it('usa el icono indeterminado por defecto', () => {
        const checkbox = mountCheckbox({ props: { value: 'indeterminate' } })
        const icon = checkbox.getComponent('[data-test-checkbox-icon]')

        expect(icon.props('name')).toBe('minus')
        expect(icon.props('color')).toBe('currentColor')
      })

      it('respeta el tamaño explícito del icono indeterminado', () => {
        const checkbox = mountCheckbox({
          props: { value: 'indeterminate', indeterminateIcon: { name: 'minus', size: 'xl' } },
        })
        const icon = checkbox.getComponent('[data-test-checkbox-icon]')

        expect(icon.props('size')).toBe('xl')
      })

      it('respeta el color explícito del icono indeterminado', () => {
        const checkbox = mountCheckbox({
          props: {
            value: 'indeterminate',
            indeterminateIcon: { name: 'minus', color: '#ff0000' },
          },
        })
        const icon = checkbox.getComponent('[data-test-checkbox-icon]')

        expect(icon.props('color')).toBe('#ff0000')
      })

      it('acepta un nombre de icono indeterminado', () => {
        const icon = mountCheckbox({
          props: { value: 'indeterminate', indeterminateIcon: 'plus' },
        }).getComponent('[data-test-checkbox-icon]')

        expect(icon.props('name')).toBe('plus')
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

      it.each([
        { value: false, expected: false },
        { value: true, expected: true },
        { value: 'indeterminate' as const, expected: 'indeterminate' as const },
      ])('recibe el contexto completo con value=$value', ({ value, expected }) => {
        let received: unknown
        mountCheckbox({
          props: {
            value,
            ui: {
              indicator: (context) => {
                received = context
                return {}
              },
            },
          },
        })

        expect(received).toEqual({ state: expected })
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

      it('no emite cambios al hacer clic cuando está disabled', async () => {
        const checkbox = mountCheckbox({ props: { value: false }, attrs: { disabled: true } })

        await checkbox.get('[data-test-checkbox-root]').trigger('click')

        expect(checkbox.emitted('update:value')).toBeUndefined()
      })
    })
  })
})
