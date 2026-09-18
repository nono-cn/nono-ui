import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'

import {
  NumberField,
  numberFieldDefaults,
  type NumberFieldSeverity,
  type NumberFieldSize,
  type NumberFieldVariant,
  type NumberFieldProps,
  type NumberFieldValue,
} from '@/components/ui/NumberField'
import { Icon, type IconSize } from '@/components/ui/Icon'
import { i18n } from '@/i18n'
import { testIconConfig } from '../utils/testIconConfig'
import { testAttrs } from '../utils/testAttrs'

function mountNumberField(options: MountingOptions<NumberFieldProps> = {}) {
  return mount(NumberField, {
    ...options,
    global: {
      plugins: [i18n],
      ...options.global,
    },
  })
}

const casesMin = [
  { input: undefined, expected: 0 },
  { input: 0, expected: 0 },
  { input: 10, expected: 10 },
  { input: -5, expected: -5 },
]

const casesMax = [
  { input: undefined, expected: 100 },
  { input: 100, expected: 100 },
  { input: 200, expected: 200 },
  { input: -5, expected: -5 },
]

const casesDisabled = [
  { input: undefined, expected: false },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesDisableWheelChange = [
  { input: undefined, expected: false },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesFocusOnChange = [
  { input: undefined, expected: true },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesFormatOptions = [
  { input: undefined, expected: undefined },
  { input: {}, expected: {} },
  {
    input: { style: 'currency', currency: 'EUR' },
    expected: { style: 'currency', currency: 'EUR' },
  },
  {
    input: { style: 'percent', maximumFractionDigits: 2 },
    expected: { style: 'percent', maximumFractionDigits: 2 },
  },
]

const casesId = [
  { input: undefined, expected: undefined },
  { input: 'quantity', expected: 'quantity' },
  { input: 'custom-number-field', expected: 'custom-number-field' },
  { input: '', expected: '' },
]

const casesLocale = [
  { input: undefined, expected: undefined },
  { input: 'en-US', expected: 'en-US' },
  { input: 'es-ES', expected: 'es-ES' },
]

const casesName = [
  { input: undefined, expected: undefined },
  { input: 'quantity', expected: 'quantity' },
  { input: 'amount', expected: 'amount' },
]

const casesReadonly = [
  { input: undefined, expected: undefined },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesRequired = [
  { input: undefined, expected: undefined },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesStep = [
  { input: undefined, expected: 1 },
  { input: 1, expected: 1 },
  { input: 0.5, expected: 0.5 },
  { input: 10, expected: 10 },
]

const casesStepSnapping = [
  { input: undefined, expected: true },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesValue = [
  { input: undefined, expected: undefined },
  { input: null, expected: null },
  { input: 25, expected: 25 },
]

const casesSize = [
  { input: undefined, expected: { root: 'h-9', control: 'p-2', input: 'p-1' } },
  { input: 'xs' as const, expected: { root: 'h-7', control: 'p-1', input: 'p-0.5' } },
  { input: 'sm' as const, expected: { root: 'h-8', control: 'p-1.5', input: 'p-0.5' } },
  { input: 'md' as const, expected: { root: 'h-9', control: 'p-2', input: 'p-1' } },
  { input: 'lg' as const, expected: { root: 'h-10', control: 'p-2', input: 'p-1.5' } },
  { input: 'xl' as const, expected: { root: 'h-11', control: 'p-2.5', input: 'p-1.5' } },
]

const casesIconSize = [
  { input: undefined, expected: 'md' as const },
  { input: 'xs' as const, expected: 'xs' as const },
  { input: 'sm' as const, expected: 'sm' as const },
  { input: 'md' as const, expected: 'md' as const },
  { input: 'lg' as const, expected: 'lg' as const },
  { input: 'xl' as const, expected: 'lg' as const },
]

const casesVariant = [
  { input: undefined, expected: ['border', 'bg-white', 'shadow-sm'] },
  { input: 'outline' as const, expected: ['border', 'bg-white', 'shadow-sm'] },
  { input: 'plain' as const, expected: ['border-transparent', 'bg-transparent', 'shadow-none'] },
  { input: 'subtle' as const, expected: ['border-primary/20', 'bg-primary/10', 'shadow-sm'] },
  { input: 'soft' as const, expected: ['bg-primary/10', 'shadow-none'] },
]

const casesSeverity = [
  { input: 'primary' as const, expected: 'focus-within:border-primary' },
  {
    input: 'secondary' as const,
    expected: 'focus-within:border-secondary-foreground',
  },
  { input: 'warning' as const, expected: 'focus-within:border-warning' },
  { input: 'success' as const, expected: 'focus-within:border-success' },
  { input: 'error' as const, expected: 'focus-within:border-error' },
]

const casesIncrement = [
  { input: undefined, expected: true },
  { input: true, expected: true },
  { input: false, expected: false },
]

const casesDecrement = [
  { input: undefined, expected: true },
  { input: true, expected: true },
  { input: false, expected: false },
]

describe('NumberField', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('pasa value=$input como modelValue=$expected', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { value: input as NumberFieldValue } })

        expect(wrapper.getComponent(NumberFieldRoot).props('modelValue')).toBe(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { size: input as NumberFieldSize } })

        expect(wrapper.get('[data-test-number-field-root]').classes()).toContain(expected.root)
        expect(wrapper.getComponent(NumberFieldDecrement).classes()).toContain(expected.control)
        expect(wrapper.getComponent(NumberFieldIncrement).classes()).toContain(expected.control)
        expect(wrapper.getComponent(NumberFieldInput).classes()).toContain(expected.input)
      })

      it('usa md por defecto', () => {
        const wrapper = mountNumberField()

        expect(wrapper.vm.$props.size).toBe(numberFieldDefaults.size)
      })

      it.each(casesIconSize)(
        'hereda size=$input a los iconos como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { size: input as NumberFieldSize } })

          expect(wrapper.findAllComponents(Icon).map((icon) => icon.props('size'))).toEqual([
            expected,
            expected,
          ] as IconSize[])
        },
      )
    })

    describe('min', () => {
      it.each(casesMin)(
        'pasa min=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { min: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('min')).toBe(expected)
        },
      )
    })

    describe('max', () => {
      it.each(casesMax)(
        'pasa max=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { max: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('max')).toBe(expected)
        },
      )
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { disabled: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('disabled')).toBe(expected)
        },
      )

      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
      ])('pasa disabled=$input a increment y decrement', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { disabled: input } })

        expect(wrapper.getComponent(NumberFieldIncrement).props('disabled')).toBe(expected)
        expect(wrapper.getComponent(NumberFieldDecrement).props('disabled')).toBe(expected)
      })

      it('aplica el estilo disabled al input', () => {
        const input = mountNumberField({ props: { disabled: true } }).getComponent(NumberFieldInput)

        expect(input.classes()).toEqual(
          expect.arrayContaining([
            'disabled:pointer-events-none',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50',
          ]),
        )
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { variant: input as NumberFieldVariant } })

        expect(wrapper.get('[data-test-number-field-root]').classes()).toEqual(
          expect.arrayContaining(expected),
        )
      })

      it('usa outline por defecto', () => {
        const wrapper = mountNumberField()

        expect(wrapper.vm.$props.variant).toBe(numberFieldDefaults.variant)
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=$input', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { severity: input as NumberFieldSeverity } })

        expect(wrapper.get('[data-test-number-field-root]').classes()).toContain(expected)
      })

      it('usa primary por defecto', () => {
        const wrapper = mountNumberField()

        expect(wrapper.vm.$props.severity).toBe(numberFieldDefaults.severity)
      })
    })

    describe('color', () => {
      it('aplica el color personalizado al root', () => {
        const root = mountNumberField({ props: { color: '#ff0000' } }).get(
          '[data-test-number-field-root]',
        )

        expect(root.attributes('style')).toContain('--number-field-color: #ff0000')
        expect(root.attributes('style')).toContain('--number-field-color-foreground: #09090b')
        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'focus-within:border-(--number-field-color)',
            'text-(--number-field-color)',
          ]),
        )
      })

      it('no aplica estilo personalizado si color no está definido', () => {
        const root = mountNumberField().get('[data-test-number-field-root]')

        expect(root.attributes('style') ?? '').not.toContain('--number-field-color')
      })

      it('mantiene el número con el color de texto normal', () => {
        const input = mountNumberField({
          props: { severity: 'error', color: '#ff0000' },
        }).getComponent(NumberFieldInput)

        expect(input.classes()).toContain('text-foreground')
      })
    })

    describe('increment', () => {
      it.each(casesIncrement)('muestra increment=$input como $expected', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { increment: input } })

        expect(wrapper.findComponent(NumberFieldIncrement).exists()).toBe(expected)
      })
    })

    describe('decrement', () => {
      it.each(casesDecrement)('muestra decrement=$input como $expected', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { decrement: input } })

        expect(wrapper.findComponent(NumberFieldDecrement).exists()).toBe(expected)
      })
    })

    describe('disableWheelChange', () => {
      it.each(casesDisableWheelChange)(
        'pasa disableWheelChange=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { disableWheelChange: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('disableWheelChange')).toBe(expected)
        },
      )
    })

    describe('focusOnChange', () => {
      it.each(casesFocusOnChange)(
        'pasa focusOnChange=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { focusOnChange: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('focusOnChange')).toBe(expected)
        },
      )
    })

    describe('formatOptions', () => {
      it.each(casesFormatOptions)(
        'pasa formatOptions=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { formatOptions: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('formatOptions')).toEqual(expected)
        },
      )
    })

    describe('id', () => {
      it.each(casesId)('pasa id=$input a NumberFieldRoot como $expected', ({ input, expected }) => {
        const wrapper = mountNumberField({ props: { id: input } })

        expect(wrapper.getComponent(NumberFieldRoot).props('id')).toBe(expected)
      })
    })

    describe('locale', () => {
      it.each(casesLocale)(
        'pasa locale=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { locale: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('locale')).toBe(expected)
        },
      )
    })

    describe('name', () => {
      it.each(casesName)(
        'pasa name=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { name: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('name')).toBe(expected)
        },
      )
    })
    describe('readonly', () => {
      it.each(casesReadonly)(
        'pasa readonly=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { readonly: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('readonly')).toBe(expected)
        },
      )
    })

    describe('required', () => {
      it.each(casesRequired)(
        'pasa required=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { required: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('required')).toBe(expected)
        },
      )
    })

    describe('step', () => {
      it.each(casesStep)(
        'pasa step=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { step: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('step')).toBe(expected)
        },
      )
    })

    describe('stepSnapping', () => {
      it.each(casesStepSnapping)(
        'pasa stepSnapping=$input a NumberFieldRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountNumberField({ props: { stepSnapping: input } })

          expect(wrapper.getComponent(NumberFieldRoot).props('stepSnapping')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      testAttrs({
        text: 'aplica ui.input al input',
        id: '[data-test-ui-input]',
        mount: (attrs) =>
          mountNumberField({
            props: { ui: { input: () => ({ ...attrs, 'data-test-ui-input': '' }) } },
          }),
      })

      testAttrs({
        text: 'aplica ui.increment al increment',
        id: '[data-test-ui-increment]',
        mount: (attrs) =>
          mountNumberField({
            props: {
              disabled: true,
              ui: {
                increment: () => ({ ...attrs, 'data-test-ui-increment': '', disabled: false }),
              },
            },
          }),
      })

      testAttrs({
        text: 'aplica ui.decrement al decrement',
        id: '[data-test-ui-decrement]',
        mount: (attrs) =>
          mountNumberField({
            props: {
              disabled: true,
              ui: {
                decrement: () => ({ ...attrs, 'data-test-ui-decrement': '', disabled: false }),
              },
            },
          }),
      })

      it('mantiene props.disabled en increment y decrement', () => {
        const wrapper = mountNumberField({ props: { disabled: true } })

        expect(wrapper.getComponent(NumberFieldIncrement).props('disabled')).toBe(true)
        expect(wrapper.getComponent(NumberFieldDecrement).props('disabled')).toBe(true)
      })
    })
  })

  describe('emits', () => {
    it('reenvía update:modelValue de NumberFieldRoot como update:value', async () => {
      const wrapper = mountNumberField({ props: { value: 10 } })
      const root = wrapper.getComponent(NumberFieldRoot)

      await root.vm.$emit('update:modelValue', 25)

      expect(wrapper.emitted('update:value')).toEqual([[25]])
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvía attrs arbitrarios al root',
      id: '[data-test-number-field-attrs]',
      assertId: false,
      mount: (attrs) =>
        mountNumberField({
          attrs: { ...attrs, 'data-test-number-field-attrs': '' },
        }),
    })
  })

  describe('iconDecrement', () => {
    testIconConfig({
      text: 'pasa las props de iconDecrement',
      id: '[data-test-icon-root]',
      mount: (input) =>
        mountNumberField({
          props: { iconDecrement: input },
          slots: { increment: () => h('span') },
        }),
    })
  })

  describe('iconIncrement', () => {
    testIconConfig({
      text: 'pasa las props de iconIncrement',
      id: '[data-test-icon-root]',
      mount: (input) =>
        mountNumberField({
          props: { iconIncrement: input },
          slots: { decrement: () => h('span') },
        }),
    })
  })

  describe('slots', () => {
    it('renders the decrement slot', () => {
      const wrapper = mountNumberField({
        slots: { decrement: () => h('span', { 'data-test-decrement-slot': true }) },
      })

      expect(wrapper.find('[data-test-decrement-slot]').exists()).toBe(true)
    })

    it('renders the increment slot', () => {
      const wrapper = mountNumberField({
        slots: { increment: () => h('span', { 'data-test-increment-slot': true }) },
      })

      expect(wrapper.find('[data-test-increment-slot]').exists()).toBe(true)
    })
  })
})
