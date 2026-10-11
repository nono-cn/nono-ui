import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ProgressRoot } from 'reka-ui'
import { h, nextTick } from 'vue'

import { Progress, type ProgressContext, type ProgressProps } from '@/components/ui/Progress'
import { themeColors } from '@/components/ui/constants'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const casesModelValue = [
  { input: undefined, expected: 0 },
  { input: null, expected: null },
  { input: 0, expected: 0 },
  { input: 35, expected: 35 },
  { input: 100, expected: 100 },
] satisfies Array<{ input: ProgressProps['modelValue']; expected: number | null }>

const casesMax = [
  { input: undefined, expected: 100 },
  { input: 1, expected: 1 },
  { input: 50, expected: 50 },
  { input: 200, expected: 200 },
] satisfies Array<{ input: ProgressProps['max']; expected: number }>

const casesGetValueLabel = [
  { input: undefined, expected: '35%' },
  {
    input: (value: number | null | undefined, max: number) => `${value} of ${max}`,
    expected: '35 of 100',
  },
] satisfies Array<{ input: ProgressProps['getValueLabel']; expected: string }>

const casesGetValueText = [
  { input: undefined, expected: undefined },
  {
    input: (value: number | null | undefined, max: number) => `${value} of ${max} files`,
    expected: '35 of 100 files',
  },
] satisfies Array<{ input: ProgressProps['getValueText']; expected: string | undefined }>

const casesLabel = [
  { input: undefined, size: 'xl', visible: false },
  { input: '', size: 'xl', visible: false },
  { input: 'Uploading', size: 'lg', visible: false },
  { input: 'Uploading', size: 'xl', visible: true },
  { input: 'Uploading', size: '2xl', visible: true },
] satisfies Array<{
  input: ProgressProps['label']
  size: ProgressProps['size']
  visible: boolean
}>

const casesSize = [
  { input: undefined, height: 'h-2', width: 'w-2', labelClass: undefined },
  { input: '2xs', height: 'h-px', width: 'w-px', labelClass: undefined },
  { input: 'xs', height: 'h-0.5', width: 'w-0.5', labelClass: undefined },
  { input: 'sm', height: 'h-1', width: 'w-1', labelClass: undefined },
  { input: 'md', height: 'h-2', width: 'w-2', labelClass: undefined },
  { input: 'lg', height: 'h-3', width: 'w-3', labelClass: undefined },
  { input: 'xl', height: 'h-4', width: 'w-4', labelClass: 'text-sm' },
  { input: '2xl', height: 'h-5', width: 'w-5', labelClass: 'text-base' },
] satisfies Array<{
  input: ProgressProps['size']
  height: string
  width: string
  labelClass: string | undefined
}>

const casesTrackColorClass = [
  { input: undefined, expected: 'bg-(--progress-color)/20' },
  { input: '#ff0000', expected: 'bg-(--progress-track-color)' },
] satisfies Array<{ input: ProgressProps['trackColor']; expected: string }>

const casesOrientation = [
  {
    input: undefined,
    vertical: false,
    transform: 'translateX(-60%)',
  },
  {
    input: 'horizontal',
    vertical: false,
    transform: 'translateX(-60%)',
  },
  {
    input: 'vertical',
    vertical: true,
    transform: 'translateY(-60%)',
  },
] satisfies Array<{
  input: ProgressProps['orientation']
  vertical: boolean
  transform: string
}>

const casesAnimation = [
  {
    input: undefined,
    horizontal: 'data-[state=indeterminate]:animate-[progress-carousel_2s_ease-in-out_infinite]',
    vertical:
      'data-[state=indeterminate]:animate-[progress-carousel-vertical_2s_ease-in-out_infinite]',
  },
  {
    input: 'carousel',
    horizontal: 'data-[state=indeterminate]:animate-[progress-carousel_2s_ease-in-out_infinite]',
    vertical:
      'data-[state=indeterminate]:animate-[progress-carousel-vertical_2s_ease-in-out_infinite]',
  },
  {
    input: 'carousel-inverse',
    horizontal:
      'data-[state=indeterminate]:animate-[progress-carousel-inverse_2s_ease-in-out_infinite]',
    vertical:
      'data-[state=indeterminate]:animate-[progress-carousel-inverse-vertical_2s_ease-in-out_infinite]',
  },
  {
    input: 'swing',
    horizontal: 'data-[state=indeterminate]:animate-[progress-swing_2s_ease-in-out_infinite]',
    vertical:
      'data-[state=indeterminate]:animate-[progress-swing-vertical_2s_ease-in-out_infinite]',
  },
  {
    input: 'elastic',
    horizontal: 'data-[state=indeterminate]:animate-[progress-elastic_2s_ease-in-out_infinite]',
    vertical:
      'data-[state=indeterminate]:animate-[progress-elastic-vertical_2s_ease-in-out_infinite]',
  },
] satisfies Array<{
  input: ProgressProps['animation']
  horizontal: string
  vertical: string
}>

const casesInverted = [
  { input: undefined, horizontal: 'translateX(-60%)', vertical: 'translateY(-60%)' },
  { input: false, horizontal: 'translateX(-60%)', vertical: 'translateY(-60%)' },
  { input: true, horizontal: 'translateX(60%)', vertical: 'translateY(60%)' },
] satisfies Array<{
  input: ProgressProps['inverted']
  horizontal: string
  vertical: string
}>

const casesUpdateModelValue = [
  { input: 0, expected: [[0]] },
  { input: 20, expected: undefined },
  { input: 35, expected: [[35]] },
  { input: 100, expected: [[100]] },
  { input: null, expected: [[null]] },
] satisfies Array<{
  input: ProgressProps['modelValue']
  expected: Array<[number | null]> | undefined
}>

const casesProgressContext = [
  {
    name: 'valores por defecto',
    input: { modelValue: undefined, max: undefined },
    expected: { value: 0, max: 100, percentage: 0 },
  },
  {
    name: 'valor cero',
    input: { modelValue: 0, max: 100 },
    expected: { value: 0, max: 100, percentage: 0 },
  },
  {
    name: 'valor parcial',
    input: { modelValue: 50, max: 200 },
    expected: { value: 50, max: 200, percentage: 25 },
  },
  {
    name: 'valor completo',
    input: { modelValue: 100, max: 100 },
    expected: { value: 100, max: 100, percentage: 100 },
  },
  {
    name: 'valor indeterminado',
    input: { modelValue: null, max: 100 },
    expected: { value: null, max: 100, percentage: 0 },
  },
] satisfies Array<{
  name: string
  input: Pick<ProgressProps, 'modelValue' | 'max'>
  expected: ProgressContext
}>

function mountProgress(options: MountingOptions<ProgressProps> = {}) {
  return mount(Progress, options)
}

describe('Progress', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input a Reka ProgressRoot',
        ({ input, expected }) => {
          expect(
            mountProgress({ props: { modelValue: input } })
              .getComponent(ProgressRoot)
              .props('modelValue'),
          ).toBe(expected)
        },
      )
    })

    describe('max', () => {
      it.each(casesMax)('pasa max=$input a Reka ProgressRoot', ({ input, expected }) => {
        expect(
          mountProgress({ props: { max: input } })
            .getComponent(ProgressRoot)
            .props('max'),
        ).toBe(expected)
      })
    })

    describe('getValueLabel', () => {
      it.each(casesGetValueLabel)(
        'pasa getValueLabel=$input a Reka ProgressRoot',
        ({ input, expected }) => {
          const getValueLabel = mountProgress({ props: { modelValue: 35, getValueLabel: input } })
            .getComponent(ProgressRoot)
            .props('getValueLabel') as NonNullable<ProgressProps['getValueLabel']>

          if (input) expect(getValueLabel).toBe(input)
          expect(getValueLabel(35, 100)).toBe(expected)
        },
      )
    })

    describe('getValueText', () => {
      it.each(casesGetValueText)(
        'pasa getValueText=$input a Reka ProgressRoot',
        ({ input, expected }) => {
          const getValueText = mountProgress({ props: { modelValue: 35, getValueText: input } })
            .getComponent(ProgressRoot)
            .props('getValueText') as ProgressProps['getValueText']

          expect(getValueText).toBe(input)
          expect(getValueText?.(35, 100)).toBe(expected)
        },
      )
    })

    describe('label', () => {
      it.each(casesLabel)(
        'muestra label=$input con size=$size: $visible',
        ({ input, size, visible }) => {
          const label = mountProgress({ props: { label: input, size } }).find(
            '[data-test-progress-label]',
          )

          expect(label.exists()).toBe(visible)
          if (visible) {
            expect(label.text()).toBe(input)
            expect(label.attributes('aria-hidden')).toBe('true')
          }
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica size=$input a la barra horizontal y vertical',
        ({ input, height, width, labelClass }) => {
          const horizontal = mountProgress({ props: { size: input, label: 'Uploading' } })
          const vertical = mountProgress({
            props: { size: input, orientation: 'vertical', label: 'Uploading' },
          })

          expect(horizontal.get('[data-test-progress-root]').classes()).toContain(height)
          expect(vertical.get('[data-test-progress-root]').classes()).toEqual(
            expect.arrayContaining([width, '!h-full']),
          )

          const label = horizontal.find('[data-test-progress-label]')
          expect(label.exists()).toBe(!!labelClass)
          if (labelClass) expect(label.classes()).toContain(labelClass)
        },
      )
    })

    describe('color', () => {
      testColor({
        text: 'resuelve el color del indicador y de la barra',
        id: '[data-test-progress-root]',
        varColor: '--progress-color',
        defaultColor: 'var(--primary, var(--primary))',
        theme: {
          colors: themeColors,
          foregroundVar: '--progress-color-foreground',
          solidVar: '--progress-solid',
          solidForegroundVar: '--progress-solid-foreground',
        },
        mount: (color) => mountProgress({ props: { color } }),
      })
    })

    describe('trackColor', () => {
      testColor({
        text: 'resuelve el color de la barra',
        id: '[data-test-progress-root]',
        varColor: '--progress-track-color',
        defaultColor: 'var(--primary, var(--primary))',
        theme: {
          colors: themeColors,
          foregroundVar: '--progress-track-color-foreground',
          solidVar: '--progress-track-solid',
          solidForegroundVar: '--progress-track-solid-foreground',
        },
        mount: (trackColor) => mountProgress({ props: { trackColor } }),
      })

      it.each(casesTrackColorClass)(
        'usa la clase de fondo correspondiente con trackColor=$input',
        ({ input, expected }) => {
          expect(
            mountProgress({ props: { trackColor: input } })
              .get('[data-test-progress-root]')
              .classes(),
          ).toContain(expected)
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'aplica orientation=$input a la barra y al indicador',
        ({ input, vertical, transform }) => {
          const wrapper = mountProgress({ props: { modelValue: 40, orientation: input } })
          const root = wrapper.get('[data-test-progress-root]')
          const indicator = wrapper.get('[data-test-progress-indicator]')

          expect(root.classes().includes('!h-full')).toBe(vertical)
          expect(indicator.attributes('style')).toContain(`transform: ${transform}`)
        },
      )
    })

    describe('animation', () => {
      it.each(casesAnimation)(
        'aplica animation=$input en horizontal y vertical',
        ({ input, horizontal, vertical }) => {
          const horizontalIndicator = mountProgress({
            props: { modelValue: null, animation: input, orientation: 'horizontal' },
          }).get('[data-test-progress-indicator]')
          const verticalIndicator = mountProgress({
            props: { modelValue: null, animation: input, orientation: 'vertical' },
          }).get('[data-test-progress-indicator]')

          expect(horizontalIndicator.classes()).toContain(horizontal)
          expect(horizontalIndicator.classes()).not.toContain(vertical)
          expect(verticalIndicator.classes()).toContain(vertical)
          expect(verticalIndicator.classes()).not.toContain(horizontal)
        },
      )
    })

    describe('inverted', () => {
      it.each(casesInverted)(
        'aplica inverted=$input al indicador horizontal y vertical',
        ({ input, horizontal, vertical }) => {
          const horizontalIndicator = mountProgress({
            props: { modelValue: 40, inverted: input, orientation: 'horizontal' },
          }).get('[data-test-progress-indicator]')
          const verticalIndicator = mountProgress({
            props: { modelValue: 40, inverted: input, orientation: 'vertical' },
          }).get('[data-test-progress-indicator]')

          expect(horizontalIndicator.attributes('style')).toContain(`transform: ${horizontal}`)
          expect(verticalIndicator.attributes('style')).toContain(`transform: ${vertical}`)
        },
      )
    })

    describe('ui', () => {
      describe('indicator', () => {
        testAttrs({
          text: 'pasa attrs, class y style a ProgressIndicator',
          id: '[data-test-progress-indicator]',
          mount: (attrs) => mountProgress({ props: { ui: { indicator: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'pasa attrs, class y style a la etiqueta',
          id: '[data-test-progress-label]',
          mount: (attrs) =>
            mountProgress({
              props: { size: 'xl', label: 'Uploading', ui: { label: () => attrs } },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-progress-root]',
      mount: (attrs) => mountProgress({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it.each(casesUpdateModelValue)(
        'reemite update:modelValue=$input desde Reka ProgressRoot',
        async ({ input, expected }) => {
          const wrapper = mountProgress({ props: { modelValue: 20 } })

          wrapper.getComponent(ProgressRoot).vm.$emit('update:modelValue', input)
          await nextTick()

          expect(wrapper.emitted('update:modelValue')).toEqual(expected)
          expect(wrapper.getComponent(ProgressRoot).props('modelValue')).toBe(input)
        },
      )
    })
  })

  describe('slots', () => {
    describe('indicator', () => {
      it('renderiza el contenido sin sustituir el indicador de Reka', () => {
        const wrapper = mountProgress({
          slots: {
            indicator: () =>
              h('span', { 'data-test-custom-progress-indicator': '' }, 'Progress details'),
          },
        })
        const content = wrapper.get('[data-test-custom-progress-indicator]')

        expect(content.text()).toBe('Progress details')
        expect(wrapper.find('[data-test-progress-indicator]').exists()).toBe(true)
      })
    })

    describe('label', () => {
      it('sustituye la prop label por el contenido del slot', () => {
        const wrapper = mountProgress({
          props: { size: 'xl', label: 'Fallback' },
          slots: {
            label: () => h('span', { 'data-test-custom-progress-label': '' }, 'Custom label'),
          },
        })

        expect(wrapper.get('[data-test-progress-label]').text()).toBe('Custom label')
        expect(wrapper.text()).not.toContain('Fallback')
      })
    })
  })

  describe('context', () => {
    describe('progressContext', () => {
      it.each(casesProgressContext)('expone el contrato para $name', ({ input, expected }) => {
        let indicatorContext: ProgressContext | undefined
        let labelContext: ProgressContext | undefined
        let indicatorSlotContext: ProgressContext | undefined
        let labelSlotContext: ProgressContext | undefined

        mountProgress({
          props: {
            ...input,
            size: 'xl',
            label: 'Uploading',
            ui: {
              indicator: (context) => {
                indicatorContext = context
                return {}
              },
              label: (context) => {
                labelContext = context
                return {}
              },
            },
          },
          slots: {
            indicator: (context: ProgressContext) => {
              indicatorSlotContext = context
              return h('span', 'Indicator')
            },
            label: (context: ProgressContext) => {
              labelSlotContext = context
              return h('span', 'Label')
            },
          },
        })

        expect(indicatorContext).toEqual(expected)
        expect(labelContext).toEqual(expected)
        expect(indicatorSlotContext).toEqual(expected)
        expect(labelSlotContext).toEqual(expected)
      })
    })
  })

  describe('variantsCss', () => {
    describe('progressVariants', () => {
      it('aplica las clases base a la raíz', () => {
        expect(mountProgress().get('[data-test-progress-root]').classes()).toEqual(
          expect.arrayContaining(['relative', 'w-full', 'overflow-hidden', 'rounded-full']),
        )
      })
    })

    describe('progressIndicatorVariants', () => {
      it('aplica las clases base al indicador', () => {
        expect(mountProgress().get('[data-test-progress-indicator]').classes()).toEqual(
          expect.arrayContaining([
            'h-full',
            'w-full',
            'flex-1',
            'bg-(--progress-color)',
            'transition-all',
          ]),
        )
      })
    })

    describe('progressLabelVariants', () => {
      it('aplica las clases base a la etiqueta', () => {
        const label = mountProgress({ props: { size: 'xl', label: 'Uploading' } }).get(
          '[data-test-progress-label]',
        )

        expect(label.classes()).toEqual(
          expect.arrayContaining(
            'pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-2 text-center font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0),0_0_7px_rgb(0_0_0/0.9),0_0_12px_rgb(0_0_0/0.7)]'.split(
              ' ',
            ),
          ),
        )
      })
    })
  })
})
