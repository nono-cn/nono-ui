import { mount, type MountingOptions } from '@vue/test-utils'
import { SwitchRoot } from 'reka-ui'
import { describe, expect, it } from 'vitest'

import {
  Switch,
  createSwitchContext,
  switchThumbVariants,
  switchVariants,
  type SwitchContext,
  type SwitchProps,
  type SwitchSize,
  type SwitchValue,
} from '@/components/ui/Switch'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountSwitch(options: MountingOptions<SwitchProps> = {}) {
  return mount(Switch, options)
}

const casesSize = [
  { input: undefined, root: ['h-5', 'w-9'], thumb: 'size-4' },
  { input: 'xs', root: ['h-3.5', 'w-6'], thumb: 'size-3' },
  { input: 'sm', root: ['h-4', 'w-7'], thumb: 'size-3.5' },
  { input: 'md', root: ['h-5', 'w-9'], thumb: 'size-4' },
  { input: 'lg', root: ['h-6', 'w-11'], thumb: 'size-5' },
  { input: 'xl', root: ['h-7', 'w-13'], thumb: 'size-6' },
] satisfies Array<{ input: SwitchSize | undefined; root: string[]; thumb: string }>

const casesCheckedIcon = [
  { input: undefined },
  { input: 'check' },
  { input: 'star' },
] satisfies Array<{ input: SwitchProps['checkedIcon'] }>

const casesUncheckedIcon = [
  { input: undefined },
  { input: 'minus' },
  { input: 'star' },
] satisfies Array<{ input: SwitchProps['uncheckedIcon'] }>

const casesIconColor = [
  { modelValue: true, expectedIcon: 'check', expectedColor: 'var(--switch-color)' },
  { modelValue: false, expectedIcon: 'minus', expectedColor: 'var(--muted-foreground)' },
] as const

const casesTrueValue = [
  { input: false, falseValue: true },
  { input: 'on', falseValue: 'off' },
  { input: 1, falseValue: 0 },
] satisfies Array<{ input: SwitchValue; falseValue: SwitchValue }>

const casesFalseValue = [
  { input: true, trueValue: false },
  { input: 'off', trueValue: 'on' },
  { input: 0, trueValue: 1 },
] satisfies Array<{ input: SwitchValue; trueValue: SwitchValue }>

const casesUpdateModelValue = [
  { trueValue: true, falseValue: false, modelValue: false, input: true },
  { trueValue: true, falseValue: false, modelValue: true, input: false },
  { trueValue: 'yes', falseValue: 'no', modelValue: 'no', input: 'yes' },
  { trueValue: 1, falseValue: 0, modelValue: 1, input: 0 },
] satisfies Array<{
  trueValue: SwitchValue
  falseValue: SwitchValue
  modelValue: SwitchValue
  input: SwitchValue
}>

const casesSwitchContext = [
  { input: undefined, trueValue: true, expected: { state: false } },
  { input: false, trueValue: true, expected: { state: false } },
  { input: true, trueValue: true, expected: { state: true } },
  { input: 'on', trueValue: 'on', expected: { state: true } },
  { input: 'off', trueValue: 'on', expected: { state: false } },
  { input: 1, trueValue: 1, expected: { state: true } },
  { input: 0, trueValue: 1, expected: { state: false } },
  { input: 'invalid', trueValue: 'on', expected: { state: false } },
] satisfies Array<{
  input: SwitchValue | undefined
  trueValue: SwitchValue
  expected: SwitchContext
}>

const casesModelValue = [
  { input: undefined, trueValue: true, falseValue: false, expected: false },
  { input: false, trueValue: true, falseValue: false, expected: false },
  { input: true, trueValue: true, falseValue: false, expected: true },
  { input: 'yes', trueValue: 'yes', falseValue: 'no', expected: 'yes' },
  { input: 'no', trueValue: 'yes', falseValue: 'no', expected: 'no' },
  { input: 'invalid', trueValue: 'yes', falseValue: 'no', expected: 'no' },
  { input: 1, trueValue: 1, falseValue: 0, expected: 1 },
  { input: 0, trueValue: 1, falseValue: 0, expected: 0 },
  { input: 2, trueValue: 1, falseValue: 0, expected: 0 },
] satisfies Array<{
  input: SwitchValue | undefined
  trueValue: SwitchValue
  falseValue: SwitchValue
  expected: SwitchValue
}>

describe('Switch', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input normalizado a SwitchRoot',
        ({ input, trueValue, falseValue, expected }) => {
          const wrapper = mountSwitch({
            props: { modelValue: input, trueValue, falseValue },
          })

          expect(wrapper.getComponent(SwitchRoot).props('modelValue')).toBe(expected)
        },
      )
    })

    describe('trueValue', () => {
      it('usa true por defecto', () => {
        const root = mountSwitch().getComponent(SwitchRoot)

        expect(root.props('trueValue')).toBe(true)
      })

      it.each(casesTrueValue)(
        'pasa trueValue=$input y falseValue=$falseValue a SwitchRoot',
        ({ input, falseValue }) => {
          const root = mountSwitch({ props: { trueValue: input, falseValue } }).getComponent(
            SwitchRoot,
          )

          expect(root.props('trueValue')).toBe(input)
        },
      )
    })

    describe('falseValue', () => {
      it('usa false por defecto', () => {
        const root = mountSwitch().getComponent(SwitchRoot)

        expect(root.props('falseValue')).toBe(false)
      })

      it.each(casesFalseValue)(
        'pasa falseValue=$input y trueValue=$trueValue a SwitchRoot',
        ({ input, trueValue }) => {
          const root = mountSwitch({ props: { falseValue: input, trueValue } }).getComponent(
            SwitchRoot,
          )

          expect(root.props('falseValue')).toBe(input)
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica size=$input al track, al thumb y a su icono',
        ({ input, root: rootClasses, thumb: thumbClass }) => {
          const wrapper = mountSwitch({
            props: { size: input, modelValue: true, checkedIcon: 'check' },
          })
          const root = wrapper.get('[data-test-switch-root]')
          const thumb = wrapper.get('[data-test-switch-thumb]')

          expect(root.classes()).toEqual(expect.arrayContaining(rootClasses))
          expect(thumb.classes()).toContain(thumbClass)
          expect(thumb.classes()).toContain('[&>*]:!size-full')
          expect(wrapper.find('[data-test-switch-icon]').exists()).toBe(true)
        },
      )
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color',
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

      describe('icon', () => {
        it.each(casesIconColor)(
          'usa $expectedColor con modelValue=$modelValue',
          ({ modelValue, expectedIcon, expectedColor }) => {
            const icon = mountSwitch({
              props: {
                modelValue,
                color: '#8b5cf6',
                checkedIcon: 'check',
                uncheckedIcon: 'minus',
              },
            }).getComponent('[data-test-switch-icon]')

            expect(icon.props('name')).toBe(expectedIcon)
            expect(icon.props('color')).toBe(expectedColor)
          },
        )
      })
    })

    describe('checkedIcon', () => {
      it.each(casesCheckedIcon)('renderiza checkedIcon=$input cuando está activo', ({ input }) => {
        const icon = mountSwitch({
          props: { modelValue: true, checkedIcon: input },
        }).findComponent('[data-test-switch-icon]')

        expect(icon.exists()).toBe(input !== undefined)
        if (input !== undefined) expect(icon.props('name')).toBe(input)
      })

      it('no lo renderiza cuando el Switch está inactivo', () => {
        const wrapper = mountSwitch({
          props: { modelValue: false, checkedIcon: 'check' },
        })

        expect(wrapper.find('[data-test-switch-icon]').exists()).toBe(false)
      })
    })

    describe('uncheckedIcon', () => {
      it.each(casesUncheckedIcon)(
        'renderiza uncheckedIcon=$input cuando está inactivo',
        ({ input }) => {
          const icon = mountSwitch({
            props: { modelValue: false, uncheckedIcon: input },
          }).findComponent('[data-test-switch-icon]')

          expect(icon.exists()).toBe(input !== undefined)
          if (input !== undefined) expect(icon.props('name')).toBe(input)
        },
      )

      it('no lo renderiza cuando el Switch está activo', () => {
        const wrapper = mountSwitch({
          props: { modelValue: true, uncheckedIcon: 'minus' },
        })

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

  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesUpdateModelValue)(
        'reemite $input cuando SwitchRoot actualiza modelValue',
        ({ trueValue, falseValue, modelValue, input }) => {
          const wrapper = mountSwitch({
            props: { trueValue, falseValue, modelValue },
          })

          wrapper.getComponent(SwitchRoot).vm.$emit('update:modelValue', input)

          expect(wrapper.emitted('update:modelValue')).toEqual([[input]])
        },
      )
    })
  })

  describe('context', () => {
    describe('switchContext', () => {
      it.each(casesSwitchContext)(
        'crea el contrato con modelValue=$input y trueValue=$trueValue',
        ({ input, trueValue, expected }) => {
          expect(createSwitchContext(input, trueValue)).toEqual(expected)
        },
      )
    })
  })

  describe('variantsCss', () => {
    describe('switchVariants', () => {
      it('incluye las clases base', () => {
        const classes = switchVariants().split(' ')

        expect(classes).toEqual(
          expect.arrayContaining([
            'peer',
            'inline-flex',
            'shrink-0',
            'items-center',
            'rounded-full',
            'border-transparent',
            'shadow-xs',
            'transition-all',
            'outline-none',
            'focus-visible:border-(--switch-color)',
          ]),
        )
      })
    })

    describe('switchThumbVariants', () => {
      it('incluye las clases base', () => {
        const classes = switchThumbVariants().split(' ')

        expect(classes).toEqual(
          expect.arrayContaining([
            'pointer-events-none',
            'block',
            'rounded-full',
            'bg-background',
            'ring-0',
            'transition-transform',
            'data-[state=unchecked]:translate-x-0',
          ]),
        )
      })
    })
  })
})
