import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ProgressRoot } from 'reka-ui'

import {
  Progress,
  type ProgressContext,
  type ProgressProps,
  type ProgressValue,
} from '@/components/ui/Progress'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountProgress(options: MountingOptions<ProgressProps> = {}) {
  return mount(Progress, options)
}

function mountWithProp(prop: keyof ProgressProps, value: unknown) {
  return mountProgress({ props: { [prop]: value } as ProgressProps })
}

const casesValue = [
  { input: 0, expected: 0, percentage: 0 },
  { input: 25, expected: 25, percentage: 25 },
  { input: 100, expected: 100, percentage: 100 },
  { input: null, expected: null, percentage: 0 },
  { input: undefined, expected: 0, percentage: 0 },
]

const casesMaxValues = [
  { input: 1, expected: 1 },
  { input: 50, expected: 50 },
  { input: 200, expected: 200 },
  { input: undefined, expected: 100 },
]

const casesContext = [
  { value: 0 as ProgressValue, max: 100, percentage: 0 },
  { value: 25 as ProgressValue, max: 100, percentage: 25 },
  { value: 50 as ProgressValue, max: 200, percentage: 25 },
  { value: -25 as ProgressValue, max: 100, percentage: 0 },
  { value: 150 as ProgressValue, max: 100, percentage: 100 },
  { value: null as ProgressValue, max: 100, percentage: 0 },
]

const casesEmittedValues = [
  { input: 0 as ProgressValue },
  { input: 25 as ProgressValue },
  { input: null as ProgressValue },
]

const casesSizes = [
  { input: '2xs', expected: 'h-px' },
  { input: 'xs', expected: 'h-0.5' },
  { input: 'sm', expected: 'h-1' },
  { input: 'md', expected: 'h-2' },
  { input: 'lg', expected: 'h-3' },
  { input: 'xl', expected: 'h-4' },
  { input: '2xl', expected: 'h-5' },
  { input: undefined, expected: 'h-2' },
]

const casesSeverities = [
  { input: 'primary', track: 'bg-primary/20', indicator: 'bg-primary' },
  { input: 'secondary', track: 'bg-secondary/20', indicator: 'bg-secondary' },
  { input: 'success', track: 'bg-success/20', indicator: 'bg-success' },
  { input: 'warning', track: 'bg-warning/20', indicator: 'bg-warning' },
  { input: 'error', track: 'bg-error/20', indicator: 'bg-error' },
  { input: undefined, track: 'bg-primary/20', indicator: 'bg-primary' },
]

const casesOrientations = [
  { input: 'horizontal', expected: ['w-full', 'h-2'] },
  { input: 'vertical', expected: ['w-2', '!h-full'] },
]

const casesAnimations = [
  {
    input: 'carousel',
    expected: 'data-[state=indeterminate]:animate-[progress-carousel_2s_ease-in-out_infinite]',
  },
  {
    input: 'carousel-inverse',
    expected:
      'data-[state=indeterminate]:animate-[progress-carousel-inverse_2s_ease-in-out_infinite]',
  },
  {
    input: 'swing',
    expected: 'data-[state=indeterminate]:animate-[progress-swing_2s_ease-in-out_infinite]',
  },
  {
    input: 'elastic',
    expected: 'data-[state=indeterminate]:animate-[progress-elastic_2s_ease-in-out_infinite]',
  },
]

const casesVerticalAnimations = casesAnimations.map(({ input }) => ({
  input,
  expected: `data-[state=indeterminate]:animate-[progress-${input}-vertical_2s_ease-in-out_infinite]`,
}))

describe('Progress', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)(
        'pasa value=$input a ProgressRoot como $expected',
        ({ input, expected, percentage }) => {
          const wrapper = mountWithProp('value', input)
          const root = wrapper.getComponent(ProgressRoot)

          expect(root.props('modelValue')).toBe(expected)
          if (percentage === 0 && input === null) {
            expect(
              wrapper.get('[data-test-progress-indicator]').attributes('style'),
            ).toBeUndefined()
          } else {
            expect(wrapper.get('[data-test-progress-indicator]').attributes('style')).toContain(
              `translateX(${percentage === 100 ? 0 : -(100 - percentage)}%)`,
            )
          }
        },
      )
    })

    describe('max', () => {
      it.each(casesMaxValues)(
        'pasa max=$input a ProgressRoot como $expected',
        ({ input, expected }) => {
          const root = mountWithProp('max', input).getComponent(ProgressRoot)

          expect(root.props('max')).toBe(expected)
        },
      )
    })

    describe('getValueLabel', () => {
      it('pasa el resolver a ProgressRoot', () => {
        const getValueLabel = vi.fn(() => '50%')
        const root = mountProgress({ props: { getValueLabel } }).getComponent(ProgressRoot)

        expect(root.props('getValueLabel')).toBe(getValueLabel)
      })
    })

    describe('getValueText', () => {
      it.each([vi.fn(() => '50 of 100')])('pasa el resolver a ProgressRoot', (input) => {
        const root = mountWithProp('getValueText', input).getComponent(ProgressRoot)

        expect(root.props('getValueText')).toBe(input)
      })
    })

    describe('label', () => {
      it.each([
        { input: 'Uploading', expected: 'Uploading', visible: true },
        { input: '', expected: '', visible: false },
        { input: undefined, expected: undefined, visible: false },
      ])('renderiza label=$input como $expected', ({ input, expected, visible }) => {
        const wrapper = mountProgress({ props: { label: input } })
        const label = wrapper.find('[data-test-progress-label]')

        expect(label.exists()).toBe(visible)
        if (visible) expect(label.text()).toBe(expected)
      })

      it.each(casesSizes)('mantiene size=$input aunque tenga label', ({ input, expected }) => {
        const root = mountProgress({ props: { label: 'Uploading', size: input } }).get(
          '[data-test-progress-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('color', () => {
      testColor({
        text: 'pasa color a Progress',
        id: '[data-test-progress-root]',
        varColor: '--progress-color',
        mount: (color) => mountProgress({ props: { color } }),
      })
    })

    describe('trackColor', () => {
      testColor({
        text: 'pasa trackColor a Progress',
        id: '[data-test-progress-root]',
        varColor: '--progress-track-color',
        mount: (trackColor) => mountProgress({ props: { trackColor } }),
      })
    })

    describe('size', () => {
      it.each(casesSizes)('aplica size=$input como $expected', ({ input, expected }) => {
        const root = mountWithProp('size', input).get('[data-test-progress-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('severity', () => {
      it.each(casesSeverities)(
        'aplica severity=$input al track y al indicador',
        ({ input, track, indicator }) => {
          const wrapper = mountWithProp('severity', input)

          expect(wrapper.get('[data-test-progress-root]').classes()).toContain(track)
          expect(wrapper.get('[data-test-progress-indicator]').classes()).toContain(indicator)
        },
      )
    })

    describe('animation', () => {
      it.each(casesAnimations)(
        'aplica animation=$input al indicador indeterminado',
        ({ input, expected }) => {
          const wrapper = mountProgress({ props: { value: null, animation: input } })

          expect(wrapper.get('[data-test-progress-indicator]').classes()).toContain(expected)
        },
      )

      it('no aplica transform cuando value es null', () => {
        expect(
          mountProgress({ props: { value: null } })
            .get('[data-test-progress-indicator]')
            .attributes('style'),
        ).toBeUndefined()
      })

      it.each(casesVerticalAnimations)(
        'usa animation=$input en el eje vertical cuando value es null',
        ({ input, expected }) => {
          const wrapper = mountProgress({
            props: { value: null, orientation: 'vertical', animation: input },
          })
          const indicator = wrapper.get('[data-test-progress-indicator]')

          expect(indicator.classes()).toContain(expected)
          expect(indicator.classes()).not.toContain(
            casesAnimations.find((animation) => animation.input === input)?.expected,
          )
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientations)('aplica orientation=$input', ({ input, expected }) => {
        const root = mountWithProp('orientation', input).get('[data-test-progress-root]')
        expected.forEach((className) => expect(root.classes()).toContain(className))
      })
    })

    describe('inverted', () => {
      it.each([
        { input: false, expected: 'translateX(-35%)' },
        { input: true, expected: 'translateX(35%)' },
      ])('invierte el indicador con inverted=$input', ({ input, expected }) => {
        const indicator = mountProgress({ props: { value: 65, inverted: input } }).get(
          '[data-test-progress-indicator]',
        )
        expect(indicator.attributes('style')).toContain(expected)
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'reenvia attrs, class y style mediante ui.indicator',
        id: '[data-test-progress-indicator]',
        mount: (attrs) =>
          mountProgress({
            props: { ui: { indicator: () => attrs } },
          }),
      })

      testAttrs({
        text: 'reenvia attrs, class y style mediante ui.label',
        id: '[data-test-progress-label]',
        mount: (attrs) =>
          mountProgress({
            props: { label: 'Progress', ui: { label: () => attrs } },
          }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-progress-root]',
      mount: (attrs) => mountProgress({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each(casesEmittedValues)('reenvia value=$input de ProgressRoot', async ({ input }) => {
        const wrapper = mountProgress({ props: { value: 10 } })

        await wrapper.getComponent(ProgressRoot).vm.$emit('update:modelValue', input)
        await nextTick()

        expect(wrapper.emitted('update:value')).toEqual([[input]])
      })
    })
  })

  describe('context contract', () => {
    it.each(casesContext)(
      'pasa value=$value, max=$max y percentage=$percentage',
      ({ value, max, percentage }) => {
        let context: ProgressContext | undefined

        mountProgress({
          props: {
            value,
            max,
            ui: {
              indicator: (uiContext: ProgressContext) => {
                context = uiContext
                return {}
              },
            },
          },
        })

        expect(context).toEqual({ value, max, percentage })
      },
    )
  })

  describe('slots', () => {
    describe('label', () => {
      it('renderiza el slot label y sustituye el label alternativo', () => {
        const wrapper = mountProgress({
          props: { label: 'Fallback', value: 40 },
          slots: {
            label: (context: ProgressContext) =>
              h('span', { 'data-test-progress-slot': 'label' }, `${context.percentage}%`),
          },
        })

        expect(wrapper.get('[data-test-progress-slot="label"]').text()).toBe('40%')
        expect(wrapper.get('[data-test-progress-label]').text()).not.toContain('Fallback')
      })

      it('renderiza el slot label sin la prop label', () => {
        const wrapper = mountProgress({
          slots: {
            label: () => h('span', { 'data-test-progress-slot': 'label' }, 'Label personalizado'),
          },
        })

        expect(wrapper.get('[data-test-progress-slot="label"]').text()).toBe('Label personalizado')
        expect(wrapper.get('[data-test-progress-label]').exists()).toBe(true)
      })
    })
  })
})
