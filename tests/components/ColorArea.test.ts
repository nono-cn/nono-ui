import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ColorAreaRoot, type Color } from 'reka-ui'
import { nextTick } from 'vue'

import { i18n } from '@/i18n'
import {
  ColorArea,
  colorAreaDefaults,
  type ColorAreaChannel,
  type ColorAreaColorSpace,
  type ColorAreaProps,
  type ColorAreaSize,
  type ColorAreaValue,
} from '@/components/ui/ColorArea'
import { testAttrs } from '../utils/testAttrs'

const casesValue: Array<{ input: ColorAreaValue | undefined; expected: ColorAreaValue }> = [
  { input: '#56d799', expected: '#56d799' },
  {
    input: { space: 'rgb', r: 86, g: 215, b: 153, alpha: 1 } satisfies Color,
    expected: { space: 'rgb', r: 86, g: 215, b: 153, alpha: 1 },
  },
  {
    input: { space: 'hsl', h: 150, s: 60, l: 59, alpha: 1 } satisfies Color,
    expected: { space: 'hsl', h: 150, s: 60, l: 59, alpha: 1 },
  },
  {
    input: { space: 'hsb', h: 150, s: 60, b: 84, alpha: 1 } satisfies Color,
    expected: { space: 'hsb', h: 150, s: 60, b: 84, alpha: 1 },
  },
  { input: undefined, expected: colorAreaDefaults.modelValue },
]

const casesColorSpace = [
  { input: 'hsl' as const, expected: 'hsl' },
  { input: 'hsb' as const, expected: 'hsb' },
  { input: 'rgb' as const, expected: 'rgb' },
  { input: undefined, expected: colorAreaDefaults.colorSpace },
] satisfies { input: ColorAreaColorSpace | undefined; expected: ColorAreaColorSpace }[]

const casesXChannel = [
  { input: 'red' as const, expected: 'red' },
  { input: 'green' as const, expected: 'green' },
  { input: 'blue' as const, expected: 'blue' },
  { input: 'hue' as const, expected: 'hue' },
  { input: 'saturation' as const, expected: 'saturation' },
  { input: 'lightness' as const, expected: 'lightness' },
  { input: 'brightness' as const, expected: 'brightness' },
  { input: 'alpha' as const, expected: 'alpha' },
  { input: undefined, expected: colorAreaDefaults.xChannel },
] satisfies { input: ColorAreaChannel | undefined; expected: ColorAreaChannel }[]

const casesYChannel = [
  { input: 'red' as const, expected: 'red' },
  { input: 'green' as const, expected: 'green' },
  { input: 'blue' as const, expected: 'blue' },
  { input: 'hue' as const, expected: 'hue' },
  { input: 'saturation' as const, expected: 'saturation' },
  { input: 'lightness' as const, expected: 'lightness' },
  { input: 'brightness' as const, expected: 'brightness' },
  { input: 'alpha' as const, expected: 'alpha' },
  { input: undefined, expected: colorAreaDefaults.yChannel },
] satisfies { input: ColorAreaChannel | undefined; expected: ColorAreaChannel }[]

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: colorAreaDefaults.disabled },
]

const casesRequired = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
]

const casesSize = [
  { input: 'xs' as const, expected: 'size-32' },
  { input: 'sm' as const, expected: 'size-40' },
  { input: 'md' as const, expected: 'size-48' },
  { input: 'lg' as const, expected: 'size-56' },
  { input: 'xl' as const, expected: 'size-64' },
  { input: undefined, expected: 'size-48' },
] satisfies { input: ColorAreaSize | undefined; expected: string }[]

const casesAxisName = [
  { input: 'hue', expected: 'hue' },
  { input: '', expected: '' },
  { input: undefined, expected: undefined },
]

const emittedValue = '#56d799'
const emittedColor = { space: 'rgb', r: 86, g: 215, b: 153, alpha: 1 } satisfies Color
const casesUpdateValue = [{ input: emittedValue }, { input: emittedColor }] satisfies {
  input: ColorAreaValue
}[]

function mountColorArea(options: MountingOptions<ColorAreaProps> = {}) {
  return mount(ColorArea, {
    global: { plugins: [i18n], ...options.global },
    ...options,
  })
}

describe('ColorArea', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesValue)(
        'pasa modelValue=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { modelValue: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('modelValue')).toEqual(expected)
        },
      )

      it('actualiza ColorAreaRoot cuando cambia modelValue externamente', async () => {
        const wrapper = mountColorArea({ props: { modelValue: '#ff0000' } })

        await wrapper.setProps({ modelValue: '#56d799' })

        expect(wrapper.getComponent(ColorAreaRoot).props('modelValue')).toBe('#56d799')
      })
    })

    describe('colorSpace', () => {
      it.each(casesColorSpace)(
        'pasa colorSpace=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { colorSpace: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('colorSpace')).toBe(expected)
        },
      )
    })

    describe('xChannel', () => {
      it.each(casesXChannel)(
        'pasa xChannel=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { xChannel: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('xChannel')).toBe(expected)
        },
      )
    })

    describe('yChannel', () => {
      it.each(casesYChannel)(
        'pasa yChannel=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { yChannel: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('yChannel')).toBe(expected)
        },
      )
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { disabled: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('disabled')).toBe(expected)
        },
      )
    })

    describe('required', () => {
      it.each(casesRequired)(
        'pasa required=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { required: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('required')).toBe(expected)
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)('aplica $expected con size=$input', ({ input, expected }) => {
        const root = mountColorArea({ props: { size: input } }).get('[data-test-color-area-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('xName', () => {
      it.each(casesAxisName)(
        'pasa xName=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { xName: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('xName')).toBe(expected)
        },
      )
    })

    describe('yName', () => {
      it.each(casesAxisName)(
        'pasa yName=$input a ColorAreaRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountColorArea({ props: { yName: input } })

          expect(wrapper.getComponent(ColorAreaRoot).props('yName')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      describe('area', () => {
        testAttrs({
          text: 'pasa atributos, clase y estilo mediante ui.area',
          id: '[data-test-color-area-area]',
          mount: (attrs) => mountColorArea({ props: { ui: { area: () => attrs } } }),
        })
      })

      describe('thumb', () => {
        testAttrs({
          text: 'pasa atributos, clase y estilo mediante ui.thumb',
          id: '[data-test-color-area-thumb]',
          mount: (attrs) => mountColorArea({ props: { ui: { thumb: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa atributos arbitrarios, clase y estilo a ColorAreaRoot',
      id: '[data-test-color-area-root]',
      mount: (attrs) => mountColorArea({ attrs }),
    })
  })

  describe('emits', () => {
    describe('change', () => {
      it('reenvía change de ColorAreaRoot', async () => {
        const wrapper = mountColorArea()

        await wrapper.getComponent(ColorAreaRoot).vm.$emit('change', emittedValue)

        expect(wrapper.emitted('change')).toEqual([[emittedValue]])
      })
    })

    describe('changeEnd', () => {
      it('reenvía changeEnd de ColorAreaRoot', async () => {
        const wrapper = mountColorArea()

        await wrapper.getComponent(ColorAreaRoot).vm.$emit('changeEnd', emittedValue)

        expect(wrapper.emitted('changeEnd')).toEqual([[emittedValue]])
      })
    })

    describe('update:color', () => {
      it('reenvía update:color de ColorAreaRoot', async () => {
        const wrapper = mountColorArea()

        await wrapper.getComponent(ColorAreaRoot).vm.$emit('update:color', emittedColor)

        expect(wrapper.emitted('update:color')).toEqual([[emittedColor]])
      })
    })

    describe('update:modelValue', () => {
      it.each(casesUpdateValue)(
        'sincroniza v-model cuando ColorAreaRoot emite update:modelValue=$input',
        async ({ input }) => {
          const wrapper = mountColorArea()
          const root = wrapper.getComponent(ColorAreaRoot)

          await root.vm.$emit('update:modelValue', input)
          await nextTick()

          expect(wrapper.emitted('update:modelValue')).toEqual([[input]])
          expect(root.props('modelValue')).toEqual(input)
        },
      )
    })
  })

  describe('aria-roledescription', () => {
    it('usa la clave i18n de ColorAreaArea', () => {
      const wrapper = mountColorArea()

      expect(wrapper.get('[data-test-color-area-area]').attributes('aria-roledescription')).toBe(
        i18n.global.t('colorAreaRoleDescription'),
      )
    })

    it('usa la clave i18n de ColorAreaThumb', () => {
      const wrapper = mountColorArea()

      expect(wrapper.get('[data-test-color-area-thumb]').attributes('aria-roledescription')).toBe(
        i18n.global.t('colorAreaThumbRoleDescription'),
      )
    })
  })

  describe('configuración de la raíz', () => {
    it('mantiene las esquinas redondeadas con rounded-md', () => {
      const wrapper = mountColorArea()

      expect(wrapper.get('[data-test-color-area-root]').classes()).toContain('rounded-md')
    })

    it('usa una raíz div sin asChild', () => {
      const wrapper = mountColorArea()
      const root = wrapper.getComponent(ColorAreaRoot)

      expect(root.props('as')).toBe('div')
      expect(root.props('asChild')).toBe(false)
      expect(wrapper.get('[data-test-color-area-root]').element.tagName).toBe('DIV')
    })

    it('mantiene fija la raíz aunque se pasen los atributos as y asChild', () => {
      const wrapper = mountColorArea({ attrs: { as: 'section', asChild: true } })
      const root = wrapper.getComponent(ColorAreaRoot)

      expect(root.props('as')).toBe('div')
      expect(root.props('asChild')).toBe(false)
      expect(wrapper.get('[data-test-color-area-root]').element.tagName).toBe('DIV')
    })
  })
})
