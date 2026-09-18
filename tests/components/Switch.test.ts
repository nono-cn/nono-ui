import { describe, expect, it } from 'vitest'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { h } from 'vue'
import {
  Switch,
  type SwitchContext,
  type SwitchSeverity,
  type SwitchSize,
} from '@/components/ui/Switch'
import { SwitchRoot } from 'reka-ui'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountSwitch(options: ComponentMountingOptions<typeof Switch> = {}) {
  return mount(Switch, options)
}

const sizeCases = [
  { size: 'xs', rootClass: 'h-3.5 w-6', thumbClass: 'size-3' },
  { size: 'sm', rootClass: 'h-4 w-7', thumbClass: 'size-3.5' },
  { size: 'md', rootClass: 'h-5 w-9', thumbClass: 'size-4' },
  { size: 'lg', rootClass: 'h-6 w-11', thumbClass: 'size-5' },
  { size: 'xl', rootClass: 'h-7 w-13', thumbClass: 'size-6' },
  { size: undefined, rootClass: 'h-5 w-9', thumbClass: 'size-4' },
] satisfies Array<{ size: SwitchSize | undefined; rootClass: string; thumbClass: string }>

const severityCases = [
  { severity: 'primary', class: 'focus-visible:ring-primary/50' },
  { severity: 'secondary', class: 'focus-visible:ring-secondary-foreground/50' },
  { severity: 'warning', class: 'focus-visible:ring-warning/50' },
  { severity: 'success', class: 'focus-visible:ring-success/50' },
  { severity: 'error', class: 'focus-visible:ring-error/50' },
  { severity: undefined, class: 'focus-visible:ring-primary/50' },
] satisfies Array<{ severity: SwitchSeverity | undefined; class: string }>

const valueCases = [
  { input: true, expected: true, trueValue: true, falseValue: false },
  { input: false, expected: false, trueValue: true, falseValue: false },
  { input: undefined, expected: false, trueValue: true, falseValue: false },
  { input: 1, expected: 1, trueValue: 1, falseValue: 0 },
  { input: 0, expected: 0, trueValue: 1, falseValue: 0 },
  { input: undefined, expected: 0, trueValue: 1, falseValue: 0 },
  { input: 'on', expected: 'on', trueValue: 'on', falseValue: 'off' },
  { input: 'off', expected: 'off', trueValue: 'on', falseValue: 'off' },
  { input: undefined, expected: 'off', trueValue: 'on', falseValue: 'off' },
]

describe('Switch', () => {
  describe('props', () => {
    // Reka
    describe('value', () => {
      it.each(valueCases)(
        'renderiza value=$input con modelValue=$input / trueValue=$trueValue / falseValue=$falseValue',
        ({ input, expected, trueValue, falseValue }) => {
          const root = mountSwitch({
            props: { value: input, trueValue, falseValue },
          }).getComponent(SwitchRoot)

          expect(root.props('modelValue')).toBe(expected)
          expect(root.props('trueValue')).toBe(trueValue)
          expect(root.props('falseValue')).toBe(falseValue)
        },
      )
    })

    describe('trueValue', () => {
      it('defaults to true', () => {
        const root = mountSwitch().getComponent(SwitchRoot)

        expect(root.props('trueValue')).toBe(true)
      })
    })

    describe('falseValue', () => {
      it('defaults to false', () => {
        const root = mountSwitch().getComponent(SwitchRoot)

        expect(root.props('falseValue')).toBe(false)
      })
    })

    describe('size', () => {
      it.each(sizeCases)('renderiza size=$size', ({ size, rootClass, thumbClass }) => {
        const wrapper = mountSwitch({ props: { size } })

        expect(wrapper.get('[data-test-switch-root]').attributes('class')).toContain(rootClass)
        expect(wrapper.get('[data-test-switch-thumb]').attributes('class')).toContain(thumbClass)
      })
    })

    describe('severity', () => {
      it.each(severityCases)('renderiza severity=$severity', ({ severity, class: className }) => {
        const wrapper = mountSwitch({ props: { severity } })

        expect(wrapper.get('[data-test-switch-root]').attributes('class')).toContain(className)
      })
    })

    describe('color', () => {
      testColor({
        text: 'aplica un color personalizado',
        id: '[data-test-switch-root]',
        varColor: '--switch-color',
        mount: (color) => mountSwitch({ props: { color } }),
      })

      it('da prioridad sobre severity', () => {
        const wrapper = mountSwitch({ props: { color: '#8b5cf6', severity: 'error' } })

        expect(wrapper.get('[data-test-switch-root]').attributes('class')).toContain(
          'data-[state=checked]:bg-(--switch-color)',
        )
        expect(wrapper.get('[data-test-switch-root]').attributes('class')).toContain(
          'focus-visible:ring-(--switch-color)/50',
        )
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'renderiza los atributos de ui.thumb',
        id: '[data-test-switch-thumb]',
        mount: (attrs) =>
          mountSwitch({
            props: {
              value: true,
              ui: { thumb: () => attrs },
            },
          }),
      })
    })
  })

  describe('root configuration', () => {
    it('siempre pasa as=button', () => {
      const root = mountSwitch().getComponent(SwitchRoot)

      expect(root.props('as')).toBe('button')
    })

    it('siempre pasa asChild=false', () => {
      const root = mountSwitch().getComponent(SwitchRoot)

      expect(root.props('asChild')).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvia atributos arbitrarios, class y style a la raiz',
      id: '[data-test-switch-root]',
      mount: (attrs) => mountSwitch({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each([
        { value: false, trueValue: true, falseValue: false, expected: true },
        { value: true, trueValue: true, falseValue: false, expected: false },
        { value: 'off', trueValue: 'on', falseValue: 'off', expected: 'on' },
      ])(
        'emite el siguiente valor desde la interaccion de la raiz',
        async ({ value, trueValue, falseValue, expected }) => {
          const switchWrapper = mountSwitch({ props: { value, trueValue, falseValue } })

          await switchWrapper.get('[data-test-switch-root]').trigger('click')

          expect(switchWrapper.emitted('update:value')).toEqual([[expected]])
        },
      )
    })
  })

  describe('slots', () => {
    describe('thumb', () => {
      it('renderiza contenido dentro del thumb', () => {
        const switchWrapper = mountSwitch({
          slots: {
            thumb: () => h('span', { 'data-test-switch-thumb-content': '' }, 'Contenido'),
          },
        })

        expect(switchWrapper.get('[data-test-switch-thumb]').text()).toContain('Contenido')
      })

      it.each([
        { value: true, expected: 'true' },
        { value: false, expected: 'false' },
      ])('renderiza el contexto de estado para value=$value', ({ value, expected }) => {
        const switchWrapper = mountSwitch({
          props: { value },
          slots: {
            thumb: (context: SwitchContext) =>
              h('span', { 'data-test-switch-slot': '' }, String(context.state)),
          },
        })

        expect(switchWrapper.get('[data-test-switch-slot]').text()).toBe(expected)
      })
    })
  })
})
