import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { SliderRoot } from 'reka-ui'

import {
  Slider,
  type SliderContext,
  type SliderProps,
  type SliderThumbContext,
} from '@/components/ui/Slider'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesThumbCursor = [
  { input: false, expected: 'cursor-grab', activeExpected: 'active:cursor-grabbing' },
  { input: true, expected: '!cursor-default', activeExpected: 'disabled:active:!cursor-default' },
]

const casesInverted = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesMin = [
  { input: 0, expected: 0 },
  { input: 10, expected: 10 },
  { input: undefined, expected: 0 },
]

const casesMax = [
  { input: 100, expected: 100 },
  { input: 200, expected: 200 },
  { input: undefined, expected: 100 },
]

const casesStep = [
  { input: 1, expected: 1 },
  { input: 5, expected: 5 },
  { input: undefined, expected: 1 },
]

const casesMinStepsBetweenThumbs = [
  { input: 0, expected: 0 },
  { input: 2, expected: 2 },
  { input: undefined, expected: 0 },
]

const casesThumbAlignment = [
  { input: 'contain' as const, expected: 'contain' as const },
  { input: 'overflow' as const, expected: 'overflow' as const },
  { input: undefined, expected: 'contain' as const },
]

const casesName = [
  { input: 'price', expected: 'price' },
  { input: '', expected: '' },
  { input: undefined, expected: undefined },
]

const casesRequired = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: undefined },
]

const casesOrientation = [
  { input: 'horizontal' as const, expected: 'horizontal' as const, class: 'items-center' },
  { input: 'vertical' as const, expected: 'vertical' as const, class: 'flex-col' },
  { input: undefined, expected: 'horizontal' as const, class: 'items-center' },
]

const casesSize = [
  { input: 'xs' as const, thumb: 'size-3.5', horizontalTrack: 'h-[7px]', verticalTrack: 'w-[7px]' },
  { input: 'sm' as const, thumb: 'size-4', horizontalTrack: 'h-2', verticalTrack: 'w-2' },
  { input: 'md' as const, thumb: 'size-4.5', horizontalTrack: 'h-[9px]', verticalTrack: 'w-[9px]' },
  { input: 'lg' as const, thumb: 'size-5', horizontalTrack: 'h-[10px]', verticalTrack: 'w-[10px]' },
  { input: 'xl' as const, thumb: 'size-5.5', horizontalTrack: 'h-[11px]', verticalTrack: 'w-[11px]' },
  { input: undefined, thumb: 'size-4.5', horizontalTrack: 'h-[9px]', verticalTrack: 'w-[9px]' },
]

const casesSeverity = [
  { input: 'primary' as const, track: 'bg-primary/20', range: 'bg-primary', thumb: 'border-primary', focus: 'focus-visible:ring-primary/50' },
  { input: 'secondary' as const, track: 'bg-secondary/20', range: 'bg-secondary', thumb: 'border-secondary', focus: 'focus-visible:ring-secondary/50' },
  { input: 'success' as const, track: 'bg-success/20', range: 'bg-success', thumb: 'border-success', focus: 'focus-visible:ring-success/50' },
  { input: 'warning' as const, track: 'bg-warning/20', range: 'bg-warning', thumb: 'border-warning', focus: 'focus-visible:ring-warning/50' },
  { input: 'error' as const, track: 'bg-error/20', range: 'bg-error', thumb: 'border-error', focus: 'focus-visible:ring-error/50' },
  { input: undefined, track: 'bg-primary/20', range: 'bg-primary', thumb: 'border-primary', focus: 'focus-visible:ring-primary/50' },
]

const casesValues = [
  { input: undefined, expected: [0], thumbs: 1 },
  { input: null, expected: [0], thumbs: 1 },
  { input: [], expected: [0], thumbs: 1 },
  { input: [35], expected: [35], thumbs: 1 },
  { input: [25, 75], expected: [25, 75], thumbs: 2 },
  { input: [10, 50, 90], expected: [10, 50], thumbs: 2 },
  { input: [-10, 50, 110], expected: [50], thumbs: 1 },
  { input: [-10, 110], expected: [0], thumbs: 1 },
]

vi.stubGlobal(
  'ResizeObserver',
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

function mountSlider(options: MountingOptions<SliderProps> = {}) {
  return mount(Slider, {
    global: { plugins: [i18n], ...options.global },
    ...options,
  })
}

describe('Slider', () => {
  describe('attrs', () => {
    testAttrs({
      text: 'pasa atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-slider-root]',
      mount: (attrs) => mountSlider({ attrs }),
    })
  })

  describe('props', () => {
    describe('values', () => {
      it.each(casesValues)(
        'normaliza value=$input como $expected',
        ({ input, expected, thumbs }) => {
          const wrapper = mountSlider({ props: { value: input as SliderProps['value'] } })

          expect(wrapper.findAll('[data-test-slider-thumb]')).toHaveLength(thumbs)
          expect(wrapper.getComponent(SliderRoot).props('modelValue')).toEqual(expected)
        },
      )
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input a SliderRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountSlider({ props: { disabled: input } })

          expect(wrapper.getComponent(SliderRoot).props('disabled')).toBe(expected)
        },
      )

      it.each(casesThumbCursor)(
        'aplica $expected al indicador cuando disabled=$input',
        ({ input, expected, activeExpected }) => {
          const thumb = mountSlider({ props: { disabled: input } }).get(
            '[data-test-slider-thumb="0"]',
          )

          expect(thumb.classes()).toContain(expected)
          expect(thumb.classes()).toContain(activeExpected)
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'pasa orientation=$input a SliderRoot como $expected',
        ({ input, expected, class: expectedClass }) => {
          const wrapper = mountSlider({ props: { orientation: input } })

          expect(wrapper.getComponent(SliderRoot).props('orientation')).toBe(expected)
          expect(wrapper.get('[data-test-slider-root]').classes()).toContain(expectedClass)
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)('aplica size=$input al thumb y al track', ({ input, thumb, horizontalTrack, verticalTrack }) => {
        const horizontal = mountSlider({ props: { size: input } })
        const vertical = mountSlider({ props: { size: input, orientation: 'vertical' } })

        expect(horizontal.get('[data-test-slider-thumb="0"]').classes()).toContain(thumb)
        expect(horizontal.get('[data-test-slider-track]').classes()).toContain(horizontalTrack)
        expect(vertical.get('[data-test-slider-thumb="0"]').classes()).toContain(thumb)
        expect(vertical.get('[data-test-slider-track]').classes()).toContain(verticalTrack)
      })
    })

    describe('color', () => {
      testColor({
        text: 'aplica color personalizado al slider',
        id: '[data-test-slider-track]',
        varColor: '--slider-color',
        mount: (color) => mountSlider({ props: { color } }),
      })

      it('sobrescribe severity con color personalizado', () => {
        const wrapper = mountSlider({ props: { color: '#ff0000', severity: 'success' } })

        expect(wrapper.get('[data-test-slider-track]').classes()).toContain(
          'bg-(--slider-color)/20',
        )
        expect(wrapper.get('[data-test-slider-range]').classes()).toContain('bg-(--slider-color)')
        expect(wrapper.get('[data-test-slider-thumb="0"]').classes()).toContain(
          'border-(--slider-color)',
        )
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('aplica severity=$input al track, range y thumb', ({ input, track, range, thumb, focus }) => {
        const wrapper = mountSlider({ props: { severity: input } })

        expect(wrapper.get('[data-test-slider-track]').classes()).toContain(track)
        expect(wrapper.get('[data-test-slider-range]').classes()).toContain(range)
        expect(wrapper.get('[data-test-slider-thumb="0"]').classes()).toContain(thumb)
        expect(wrapper.get('[data-test-slider-thumb="0"]').classes()).toContain(focus)
      })
    })

    describe('inverted', () => {
      it.each(casesInverted)(
        'pasa inverted=$input a SliderRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountSlider({ props: { inverted: input } })

          expect(wrapper.getComponent(SliderRoot).props('inverted')).toBe(expected)
        },
      )
    })

    describe('min', () => {
      it.each(casesMin)('pasa min=$input a SliderRoot como $expected', ({ input, expected }) => {
        const wrapper = mountSlider({ props: { min: input } })

        expect(wrapper.getComponent(SliderRoot).props('min')).toBe(expected)
      })
    })

    describe('max', () => {
      it.each(casesMax)('pasa max=$input a SliderRoot como $expected', ({ input, expected }) => {
        const wrapper = mountSlider({ props: { max: input } })

        expect(wrapper.getComponent(SliderRoot).props('max')).toBe(expected)
      })
    })

    describe('step', () => {
      it.each(casesStep)('pasa step=$input a SliderRoot como $expected', ({ input, expected }) => {
        const wrapper = mountSlider({ props: { step: input } })

        expect(wrapper.getComponent(SliderRoot).props('step')).toBe(expected)
      })
    })

    describe('minStepsBetweenThumbs', () => {
      it.each(casesMinStepsBetweenThumbs)(
        'pasa minStepsBetweenThumbs=$input a SliderRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountSlider({ props: { minStepsBetweenThumbs: input } })

          expect(wrapper.getComponent(SliderRoot).props('minStepsBetweenThumbs')).toBe(expected)
        },
      )
    })

    describe('thumbAlignment', () => {
      it.each(casesThumbAlignment)(
        'pasa thumbAlignment=$input a SliderRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountSlider({ props: { thumbAlignment: input } })

          expect(wrapper.getComponent(SliderRoot).props('thumbAlignment')).toBe(expected)
        },
      )
    })

    describe('name', () => {
      it.each(casesName)('pasa name=$input a SliderRoot como $expected', ({ input, expected }) => {
        const wrapper = mountSlider({ props: { name: input } })

        expect(wrapper.getComponent(SliderRoot).props('name')).toBe(expected)
      })
    })

    describe('required', () => {
      it.each(casesRequired)(
        'pasa required=$input a SliderRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountSlider({ props: { required: input } })

          expect(wrapper.getComponent(SliderRoot).props('required')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      testAttrs({
        text: 'reenvia attrs, class y style mediante ui.track',
        id: '[data-test-slider-track]',
        mount: (attrs) => mountSlider({ props: { ui: { track: () => attrs } } }),
      })

      testAttrs({
        text: 'reenvia attrs, class y style mediante ui.range',
        id: '[data-test-slider-range]',
        mount: (attrs) => mountSlider({ props: { ui: { range: () => attrs } } }),
      })

      testAttrs({
        text: 'reenvia attrs, class y style mediante ui.thumb',
        id: '[data-test-slider-thumb="0"]',
        mount: (attrs) => mountSlider({ props: { ui: { thumb: () => attrs } } }),
      })
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each([[[10]], [[25, 75]]])(
        'reenvia update:modelValue de SliderRoot como update:value con %j',
        async (value) => {
          const wrapper = mountSlider()
          const root = wrapper.getComponent(SliderRoot)

          await root.vm.$emit('update:modelValue', value)

          expect(wrapper.emitted('update:value')).toEqual([[value]])
        },
      )
    })

    describe('valueCommit', () => {
      it.each([[[10]], [[25, 75]]])(
        'reenvia value-commit de SliderRoot como valueCommit con %j',
        async (value) => {
          const wrapper = mountSlider()
          const root = wrapper.getComponent(SliderRoot)

          await root.vm.$emit('value-commit', value)

          expect(wrapper.emitted('valueCommit')).toEqual([[value]])
        },
      )
    })
  })

  describe('context contract', () => {
    describe('SliderContext', () => {
      it.each(casesValues)('expone values=$expected', ({ input, expected }) => {
        let context: SliderContext | undefined

        mountSlider({
          props: {
            value: input,
            ui: {
              track: (uiContext) => {
                context = uiContext
                return {}
              },
            },
          },
        })

        expect(context).toEqual({ values: expected ?? [] })
      })
    })

    describe('SliderThumbContext', () => {
      it.each([
        { input: [35], expected: [{ values: [35], index: 0, value: 35, first: true, last: true }] },
        {
          input: [25, 75],
          expected: [
            { values: [25, 75], index: 0, value: 25, first: true, last: false },
            { values: [25, 75], index: 1, value: 75, first: false, last: true },
          ],
        },
      ])('expone el contexto de cada thumb para values=$input', ({ input, expected }) => {
        const contexts: SliderThumbContext[] = []

        mountSlider({
          props: {
            value: input,
            ui: {
              thumb: (uiContext) => {
                contexts.push(uiContext)
                return {}
              },
            },
          },
        })

        expect(contexts).toEqual(expected)
      })
    })
  })
})
