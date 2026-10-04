import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { SwitchRoot } from 'reka-ui'

import {
  Switch,
  type SwitchContext,
  type SwitchProps,
  type SwitchSize,
} from '@/components/ui/Switch'
import { themeColors } from '@/components/ui/constants'
import type { IconName } from '@/components/ui/Icon'
import { createSwitchContext } from '@/components/ui/Switch/context'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountSwitch(options: MountingOptions<SwitchProps> = {}) {
  return mount(Switch, options)
}

const casesModelValue = [
  {
    input: { modelValue: undefined, trueValue: true, falseValue: false },
    expected: false,
  },
  {
    input: { modelValue: false, trueValue: true, falseValue: false },
    expected: false,
  },
  {
    input: { modelValue: true, trueValue: true, falseValue: false },
    expected: true,
  },
  {
    input: { modelValue: 'no', trueValue: 'yes', falseValue: 'no' },
    expected: 'no',
  },
  {
    input: { modelValue: 'yes', trueValue: 'yes' },
    expected: 'yes',
  },
  {
    input: { modelValue: 0, trueValue: 1, falseValue: 0 },
    expected: 0,
  },
  {
    input: { modelValue: 1, trueValue: 1, falseValue: 0 },
    expected: 1,
  },
  {
    input: { modelValue: 'invalid', trueValue: 'yes', falseValue: 'no' },
    expected: 'no',
  },
  {
    input: { modelValue: 42, trueValue: 1, falseValue: 0 },
    expected: 0,
  },
] satisfies Array<{
  input: SwitchProps
  expected: boolean | number | string
}>

const casesTrueValue = [
  { input: undefined, expected: true },
  { input: true, expected: true },
  { input: 'yes', expected: 'yes' },
  { input: 1, expected: 1 },
] satisfies Array<{ input: SwitchProps['trueValue']; expected: boolean | number | string }>

const casesFalseValue = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: 'no', expected: 'no' },
  { input: 0, expected: 0 },
] satisfies Array<{ input: SwitchProps['falseValue']; expected: boolean | number | string }>

const casesSize = [
  { input: undefined, expected: { root: ['h-5', 'w-9'], thumb: ['size-4'] } },
  { input: 'xs', expected: { root: ['h-3.5', 'w-6'], thumb: ['size-3'] } },
  { input: 'sm', expected: { root: ['h-4', 'w-7'], thumb: ['size-3.5'] } },
  { input: 'md', expected: { root: ['h-5', 'w-9'], thumb: ['size-4'] } },
  { input: 'lg', expected: { root: ['h-6', 'w-11'], thumb: ['size-5'] } },
  { input: 'xl', expected: { root: ['h-7', 'w-13'], thumb: ['size-6'] } },
  { input: 'invalid' as SwitchSize, expected: { root: ['h-5', 'w-9'], thumb: ['size-4'] } },
] satisfies Array<{
  input: SwitchSize | undefined
  expected: { root: string[]; thumb: string[] }
}>

const casesCheckedIcon = [
  { input: undefined, expected: undefined },
  { input: 'check', expected: 'check' },
  { input: 'star', expected: 'star' },
] satisfies Array<{ input: IconName | undefined; expected: IconName | undefined }>

const casesUncheckedIcon = [
  { input: undefined, expected: undefined },
  { input: 'minus', expected: 'minus' },
  { input: 'plus', expected: 'plus' },
] satisfies Array<{ input: IconName | undefined; expected: IconName | undefined }>

const casesSwitchContext = [
  { input: { modelValue: undefined }, expected: { state: false } },
  { input: { modelValue: false }, expected: { state: false } },
  { input: { modelValue: true }, expected: { state: true } },
  {
    input: { modelValue: 'yes', trueValue: 'yes', falseValue: 'no' },
    expected: { state: true },
  },
  {
    input: { modelValue: 'no', trueValue: 'yes' },
    expected: { state: false },
  },
  { input: { modelValue: 1, trueValue: 1 }, expected: { state: true } },
  { input: { modelValue: 0, trueValue: 1 }, expected: { state: false } },
  {
    input: { modelValue: 'invalid', trueValue: 'yes' },
    expected: { state: false },
  },
] satisfies Array<{ input: SwitchProps; expected: SwitchContext }>

describe('Switch', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)('normaliza modelValue=$input.modelValue', ({ input, expected }) => {
        const wrapper = mountSwitch({ props: input })

        expect(wrapper.getComponent(SwitchRoot).props('modelValue')).toBe(expected)
      })
    })

    describe('trueValue', () => {
      it.each(casesTrueValue)('pasa trueValue=$input a SwitchRoot', ({ input, expected }) => {
        const wrapper = mountSwitch({ props: { trueValue: input } })

        expect(wrapper.getComponent(SwitchRoot).props('trueValue')).toBe(expected)
      })
    })

    describe('falseValue', () => {
      it.each(casesFalseValue)('pasa falseValue=$input a SwitchRoot', ({ input, expected }) => {
        const wrapper = mountSwitch({ props: { falseValue: input, modelValue: expected } })

        expect(wrapper.getComponent(SwitchRoot).props('falseValue')).toBe(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('aplica size=$input a la raíz y al thumb', ({ input, expected }) => {
        const wrapper = mountSwitch({ props: { size: input } })

        expect(wrapper.get('[data-test-switch-root]').classes()).toEqual(
          expect.arrayContaining(expected.root),
        )
        expect(wrapper.get('[data-test-switch-thumb]').classes()).toEqual(
          expect.arrayContaining(expected.thumb),
        )
      })
    })

    describe('color', () => {
      testColor({
        text: 'resuelve un color de tema o CSS',
        id: '[data-test-switch-root]',
        varColor: '--switch-color',
        defaultColor: 'var(--primary, var(--primary))',
        fallbackColor: 'primary',
        theme: {
          colors: themeColors,
          foregroundVar: '--switch-color-foreground',
          solidVar: '--switch-solid',
          solidForegroundVar: '--switch-solid-foreground',
        },
        mount: (color) => mountSwitch({ props: { color } }),
      })
    })

    describe('checkedIcon', () => {
      it.each(casesCheckedIcon)(
        'renderiza checkedIcon=$input solo si está activado',
        ({ input, expected }) => {
          const wrapper = mountSwitch({ props: { modelValue: true, checkedIcon: input } })
          const icon = wrapper.findComponent('[data-test-switch-icon]')

          expect(icon.exists()).toBe(expected !== undefined)
          if (expected !== undefined) expect(icon.props('name')).toBe(expected)
        },
      )

      it('no renderiza checkedIcon cuando está desactivado', () => {
        const wrapper = mountSwitch({ props: { modelValue: false, checkedIcon: 'check' } })

        expect(wrapper.find('[data-test-switch-icon]').exists()).toBe(false)
      })
    })

    describe('uncheckedIcon', () => {
      it.each(casesUncheckedIcon)(
        'renderiza uncheckedIcon=$input solo si está desactivado',
        ({ input, expected }) => {
          const wrapper = mountSwitch({ props: { modelValue: false, uncheckedIcon: input } })
          const icon = wrapper.findComponent('[data-test-switch-icon]')

          expect(icon.exists()).toBe(expected !== undefined)
          if (expected !== undefined) expect(icon.props('name')).toBe(expected)
        },
      )

      it('no renderiza uncheckedIcon cuando está activado', () => {
        const wrapper = mountSwitch({ props: { modelValue: true, uncheckedIcon: 'minus' } })

        expect(wrapper.find('[data-test-switch-icon]').exists()).toBe(false)
      })
    })

    describe('ui', () => {
      describe('thumb', () => {
        testAttrs({
          text: 'pasa los atributos de ui.thumb al thumb',
          id: '[data-test-switch-thumb]',
          mount: (attrs) => mountSwitch({ props: { ui: { thumb: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-switch-root]',
      mount: (attrs) => mountSwitch({ attrs }),
    })
  })

  describe('context', () => {
    describe('switchContext', () => {
      it.each(casesSwitchContext)(
        'crea el contrato con modelValue=$input.modelValue',
        ({ input, expected }) => {
          expect(createSwitchContext(input.modelValue, input.trueValue)).toEqual(expected)
        },
      )
    })
  })

  describe('variantsCss', () => {
    describe('switchVariants', () => {
      it('aplica las clases base a la raíz', () => {
        const root = mountSwitch().get('[data-test-switch-root]')

        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'peer',
            'inline-flex',
            'rounded-full',
            'data-[state=checked]:bg-(--switch-color)',
          ]),
        )
      })
    })

    describe('switchThumbVariants', () => {
      it('aplica las clases base al thumb', () => {
        const thumb = mountSwitch().get('[data-test-switch-thumb]')

        expect(thumb.classes()).toEqual(
          expect.arrayContaining([
            'pointer-events-none',
            'block',
            'rounded-full',
            'transition-transform',
          ]),
        )
      })
    })
  })
})
