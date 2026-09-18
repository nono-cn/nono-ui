import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Toggle as ToggleRoot } from 'reka-ui'
import { h, nextTick } from 'vue'

import {
  createToggleContext,
  Toggle,
  type ToggleContext,
  type ToggleProps,
} from '@/components/ui/Toggle'
import { toggleDefaults } from '@/components/ui/Toggle/defaults'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'
import { testIconConfig, testIconSize } from '../utils/testIconConfig'

function mountToggle(options: MountingOptions<ToggleProps> = {}) {
  return mount(Toggle, options)
}

const casesLabel = [
  { input: 'Notifications', expected: 'Notifications' },
  { input: undefined, expected: '' },
]

const casesValue = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: toggleDefaults.value },
]

const casesVariant = [
  { input: 'outline' as const, expected: ['border', 'bg-transparent'] },
  { input: 'plain' as const, expected: ['bg-transparent'] },
  { input: undefined, expected: ['border', 'bg-transparent'] },
]

const casesSeverity = [
  { input: 'default' as const, expected: 'hover:bg-muted' },
  { input: 'primary' as const, expected: 'text-primary' },
  { input: 'secondary' as const, expected: 'text-secondary-foreground' },
  { input: 'warning' as const, expected: 'text-warning' },
  { input: 'success' as const, expected: 'text-success' },
  { input: 'error' as const, expected: 'text-error' },
  { input: undefined, expected: 'hover:bg-muted' },
]

const casesSize = [
  { input: 'xs' as const, expected: ['h-7', 'text-xs'] },
  { input: 'sm' as const, expected: ['h-8', 'text-sm'] },
  { input: 'md' as const, expected: ['h-9', 'text-base'] },
  { input: 'lg' as const, expected: ['h-10', 'text-lg'] },
  { input: undefined, expected: ['h-9', 'text-base'] },
]

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesContext = [
  { input: false, expected: { value: false, state: 'off', pressed: false } },
  { input: true, expected: { value: true, state: 'on', pressed: true } },
]

const casesEmittedValues = [
  { input: false, initial: true },
  { input: true, initial: false },
]

describe('Toggle', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input como "$expected"', ({ input, expected }) => {
        const root = mountToggle({ props: { label: input } }).get('[data-test-toggle-root]')
        expect(root.text()).toBe(expected)
      })
    })

    //** Reka Props */
    describe('value', () => {
      it.each(casesValue)('pasa value=$input como modelValue=$expected', ({ input, expected }) => {
        const root = mountToggle({ props: { value: input } }).getComponent(
          '[data-test-toggle-root]',
        )

        expect(root.vm.$parent?.$props.modelValue).toBe(expected)
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input', ({ input, expected }) => {
        const root = mountToggle({ props: { variant: input } }).get('[data-test-toggle-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=$input', ({ input, expected }) => {
        const root = mountToggle({ props: { severity: input } }).get('[data-test-toggle-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const root = mountToggle({ props: { size: input } }).get('[data-test-toggle-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    /** Reka prop */
    describe('disabled', () => {
      it.each(casesDisabled)('renderiza disabled=$input como $expected', ({ input, expected }) => {
        const root = mountToggle({ props: { disabled: input } }).getComponent(
          '[data-test-toggle-root]',
        )

        expect(root.vm.$parent?.$props.disabled).toBe(expected)
      })
    })

    describe('icon', () => {
      testIconConfig({
        text: 'pasa las props del icono',
        id: '[data-test-toggle-icon]',
        mount: (input) => mountToggle({ props: { icon: input } }),
      })

      testIconSize({
        text: 'pasa el tamaño de Toggle al icono',
        id: '[data-test-toggle-icon]',
        mount: (size) => mountToggle({ props: { size, icon: { name: 'check' } } }),
      })
    })

    describe('trailingIcon', () => {
      testIconConfig({
        text: 'pasa las props de trailingIcon',
        id: '[data-test-toggle-trailing-icon]',
        mount: (input) => mountToggle({ props: { trailingIcon: input } }),
      })

      testIconSize({
        text: 'pasa el tamaño de Toggle al icono trailing',
        id: '[data-test-toggle-trailing-icon]',
        mount: (size) => mountToggle({ props: { size, trailingIcon: { name: 'check' } } }),
      })
    })

    describe('color', () => {
      testColor({
        text: 'renderiza color',
        id: '[data-test-toggle-root]',
        varColor: '--toggle-color',
        mount: (color) => mountToggle({ props: { color } }),
      })
    })
  })

  describe('root configuration', () => {
    it('siempre pasa as=button', () => {
      const root = mountToggle().getComponent('[data-test-toggle-root]')

      expect(root.vm.$parent?.$props.as).toBe('button')
    })

    it('siempre pasa asChild=false', () => {
      const root = mountToggle().getComponent('[data-test-toggle-root]')

      expect(root.vm.$parent?.$props.asChild).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvia atributos arbitrarios, class y style a la raiz',
      id: '[data-test-toggle-root]',
      mount: (attrs) => mountToggle({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each(casesEmittedValues)(
        'reenvia value=$input de ToggleRoot',
        async ({ input, initial }) => {
          const wrapper = mountToggle({ props: { value: initial } })

          await wrapper.getComponent(ToggleRoot).vm.$emit('update:modelValue', input)
          await nextTick()

          expect(wrapper.emitted('update:value')).toEqual([[input]])
        },
      )
    })
  })

  describe('context contract', () => {
    it.each(casesContext)('crea el contexto para value=$input', ({ input, expected }) => {
      expect(createToggleContext(input)).toEqual(expected)
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot por defecto y sustituye el label alternativo', () => {
        const toggle = mountToggle({
          props: { label: 'Fallback', value: true },
          slots: {
            default: () => h('span', { 'data-test-toggle-slot-default': '' }, 'default'),
          },
        })

        expect(toggle.get('[data-test-toggle-slot-default]').text()).toBe('default')
        expect(toggle.get('[data-test-toggle-root]').text()).not.toContain('Fallback')
      })

      it('pasa el contexto al slot por defecto', () => {
        let context: ToggleContext | undefined

        mountToggle({
          props: { value: true },
          slots: {
            default: (slotContext: ToggleContext) => {
              context = slotContext
              return h('span')
            },
          },
        })

        expect(context).toEqual({ value: true, state: 'on', pressed: true })
      })
    })

    describe('leading', () => {
      it('renderiza el slot leading y sustituye el icono alternativo', () => {
        const toggle = mountToggle({
          props: { icon: { name: 'check' } },
          slots: {
            leading: () => h('span', { 'data-test-toggle-slot-leading': '' }, 'leading'),
          },
        })

        expect(toggle.get('[data-test-toggle-slot-leading]').text()).toBe('leading')
        expect(toggle.find('[data-test-toggle-icon]').exists()).toBe(false)
      })

      it('pasa el contexto al slot leading', () => {
        let context: ToggleContext | undefined

        mountToggle({
          props: { value: true },
          slots: {
            leading: (slotContext: ToggleContext) => {
              context = slotContext
              return h('span')
            },
          },
        })

        expect(context).toEqual({ value: true, state: 'on', pressed: true })
      })
    })

    describe('trailing', () => {
      it('renderiza el slot trailing y sustituye el icono trailing alternativo', () => {
        const toggle = mountToggle({
          props: { trailingIcon: { name: 'chevronRight' } },
          slots: {
            trailing: () => h('span', { 'data-test-toggle-slot-trailing': '' }, 'trailing'),
          },
        })

        expect(toggle.get('[data-test-toggle-slot-trailing]').text()).toBe('trailing')
        expect(toggle.find('[data-test-toggle-trailing-icon]').exists()).toBe(false)
      })

      it('pasa el contexto al slot trailing', () => {
        let context: ToggleContext | undefined

        mountToggle({
          props: { value: true },
          slots: {
            trailing: (slotContext: ToggleContext) => {
              context = slotContext
              return h('span')
            },
          },
        })

        expect(context).toEqual({ value: true, state: 'on', pressed: true })
      })
    })
  })
})
