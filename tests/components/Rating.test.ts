import { mount, type MountingOptions } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { RatingRoot as RekaRatingRoot } from 'reka-ui'

import {
  Rating,
  type RatingProps,
  type RatingSeverity,
  type RatingSize,
} from '@/components/ui/Rating'
import { Icon } from '@/components/ui/Icon'
import { testColor } from '../utils/testColor'
import { testAttrs } from '../utils/testAttrs'

const casesLength = [
  { input: undefined, expected: 5 },
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: 3, expected: 3 },
  { input: 10, expected: 10 },
]

const casesClearable = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]

const casesHoverable = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]

const casesLoop = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]

const casesDisabled = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]

const casesRequired = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]

const casesName = [
  { input: undefined, expected: undefined },
  { input: '', expected: '' },
  { input: 'review-rating', expected: 'review-rating' },
]

const casesModelValue = [
  { input: undefined, expected: undefined },
  { input: 0, expected: 0 },
  { input: 3, expected: 3 },
  { input: 5, expected: 5 },
]

const casesStep = [
  { input: undefined, expected: 1, indicators: 5, width: '100%' },
  { input: 1 as const, expected: 1, indicators: 5, width: '100%' },
  { input: 0.5 as const, expected: 0.5, indicators: 10, width: '50%' },
  { input: 0.25 as const, expected: 0.25, indicators: 20, width: '25%' },
  { input: 0.1 as const, expected: 0.1, indicators: 50, width: '10%' },
]

const casesOrientation = [
  { input: undefined, expected: 'horizontal', rootClass: 'flex-row' },
  { input: 'horizontal' as const, expected: 'horizontal', rootClass: 'flex-row' },
  { input: 'vertical' as const, expected: 'vertical', rootClass: 'flex-col' },
]

const casesSize: {
  input: RatingSize | undefined
  itemClass: string
  iconClass: string
  gapClass: string
}[] = [
  { input: undefined, itemClass: 'size-8', iconClass: 'size-6', gapClass: 'gap-1' },
  { input: 'xs', itemClass: 'size-5', iconClass: 'size-4', gapClass: 'gap-0.5' },
  { input: 'sm', itemClass: 'size-6', iconClass: 'size-5', gapClass: 'gap-0.5' },
  { input: 'md', itemClass: 'size-8', iconClass: 'size-6', gapClass: 'gap-1' },
  { input: 'lg', itemClass: 'size-10', iconClass: 'size-8', gapClass: 'gap-1.5' },
  { input: 'xl', itemClass: 'size-12', iconClass: 'size-10', gapClass: 'gap-2' },
]

const casesSeverity: {
  input: RatingSeverity | undefined
  textClass: string
  focusClass: string
}[] = [
  { input: undefined, textClass: 'text-primary', focusClass: 'focus-visible:ring-primary/60' },
  { input: 'primary', textClass: 'text-primary', focusClass: 'focus-visible:ring-primary/60' },
  {
    input: 'secondary',
    textClass: 'text-secondary-foreground',
    focusClass: 'focus-visible:ring-secondary-foreground/60',
  },
  {
    input: 'neutral',
    textClass: 'text-foreground',
    focusClass: 'focus-visible:ring-foreground/60',
  },
  { input: 'warning', textClass: 'text-warning', focusClass: 'focus-visible:ring-warning/60' },
  { input: 'success', textClass: 'text-success', focusClass: 'focus-visible:ring-success/60' },
  { input: 'error', textClass: 'text-error', focusClass: 'focus-visible:ring-error/60' },
]

function mountRating(options: MountingOptions<RatingProps> = {}) {
  return mount(Rating, options)
}

describe('Rating', () => {
  describe('props', () => {
    describe('modelValue', () => {
      it.each(casesModelValue)(
        'pasa modelValue=$input como $expected a RatingRoot',
        ({ input, expected }) => {
          const root = mountRating({ props: { modelValue: input } }).getComponent(RekaRatingRoot)

          expect(root.props('modelValue')).toBe(expected)
        },
      )
    })

    describe('length', () => {
      it.each(casesLength)(
        'pasa length=$input a RatingRoot y renderiza $expected items',
        ({ input, expected }) => {
          const wrapper = mountRating({ props: { length: input } })

          expect(wrapper.getComponent(RekaRatingRoot).props('length')).toBe(expected)
          expect(wrapper.find('[data-test-rating-root]').exists()).toBe(true)
          expect(wrapper.findAll('[data-test-rating-item]')).toHaveLength(expected)
          expect(wrapper.findAll('[data-test-rating-item-indicator]')).toHaveLength(expected)
        },
      )
    })

    describe('clearable', () => {
      it.each(casesClearable)(
        'pasa clearable=$input como $expected a RatingRoot',
        ({ input, expected }) => {
          const root = mountRating({ props: { clearable: input } }).getComponent(RekaRatingRoot)

          expect(root.props('clearable')).toBe(expected)
        },
      )
    })

    describe('hoverable', () => {
      it.each(casesHoverable)(
        'pasa hoverable=$input como $expected a RatingRoot',
        ({ input, expected }) => {
          const root = mountRating({ props: { hoverable: input } }).getComponent(RekaRatingRoot)

          expect(root.props('hoverable')).toBe(expected)
        },
      )
    })

    describe('loop', () => {
      it.each(casesLoop)('pasa loop=$input como $expected a RatingRoot', ({ input, expected }) => {
        const root = mountRating({ props: { loop: input } }).getComponent(RekaRatingRoot)

        expect(root.props('loop')).toBe(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)(
        'pasa disabled=$input como $expected a RatingRoot',
        ({ input, expected }) => {
          const root = mountRating({ props: { disabled: input } }).getComponent(RekaRatingRoot)

          expect(root.props('disabled')).toBe(expected)
        },
      )
    })

    describe('required', () => {
      it.each(casesRequired)(
        'pasa required=$input como $expected a RatingRoot',
        ({ input, expected }) => {
          const root = mountRating({ props: { required: input } }).getComponent(RekaRatingRoot)

          expect(root.props('required')).toBe(expected)
        },
      )
    })

    describe('name', () => {
      it.each(casesName)('pasa name=$input a RatingRoot', ({ input, expected }) => {
        const root = mountRating({ props: { name: input } }).getComponent(RekaRatingRoot)

        expect(root.props('name')).toBe(expected)
      })
    })

    describe('step', () => {
      it.each(casesStep)(
        'pasa step=$input y renderiza $indicators indicadores',
        ({ input, expected, indicators, width }) => {
          const wrapper = mountRating({ props: { step: input } })

          expect(wrapper.getComponent(RekaRatingRoot).props('step')).toBe(expected)
          expect(wrapper.findAll('[data-test-rating-item-indicator]')).toHaveLength(indicators)
          expect(wrapper.get('[data-test-rating-item-indicator]').attributes('style')).toContain(
            `--reka-rating-item-step-width: ${width}`,
          )
        },
      )
    })

    describe('orientation', () => {
      it.each(casesOrientation)(
        'pasa orientation=$input y aplica $rootClass',
        ({ input, expected, rootClass }) => {
          const wrapper = mountRating({ props: { orientation: input } })

          expect(wrapper.getComponent(RekaRatingRoot).props('orientation')).toBe(expected)
          expect(wrapper.get('[data-test-rating-root]').classes()).toContain(rootClass)
        },
      )
    })

    describe('size', () => {
      it.each(casesSize)(
        'aplica size=$input a items, iconos y espacio',
        ({ input, itemClass, iconClass, gapClass }) => {
          const wrapper = mountRating({ props: { size: input } })

          expect(wrapper.get('[data-test-rating-root]').classes()).toContain(gapClass)
          expect(wrapper.get('[data-test-rating-item]').classes()).toContain(itemClass)
          expect(wrapper.get('[data-test-rating-icon]').classes()).toContain(iconClass)
        },
      )
    })

    describe('severity', () => {
      it.each(casesSeverity)(
        'aplica severity=$input al indicador y al foco',
        ({ input, textClass, focusClass }) => {
          const indicator = mountRating({ props: { severity: input } }).get(
            '[data-test-rating-item-indicator]',
          )

          expect(indicator.classes()).toContain(textClass)
          expect(indicator.classes()).toContain(focusClass)
        },
      )
    })

    describe('color', () => {
      testColor({
        text: 'aplica un color personalizado',
        id: '[data-test-rating-root]',
        varColor: '--rating-color',
        mount: (color) => mountRating({ props: { color } }),
      })

      it('da prioridad a color sobre severity en el indicador y el foco', () => {
        const wrapper = mountRating({ props: { color: '#8b5cf6', severity: 'error' } })
        const indicator = wrapper.get('[data-test-rating-item-indicator]')

        expect(indicator.classes()).toContain('text-(--rating-color)')
        expect(indicator.classes()).toContain('focus-visible:ring-(--rating-color)/60')
        expect(indicator.classes()).not.toContain('text-error')
        expect(indicator.classes()).not.toContain('focus-visible:ring-error/60')
        expect(wrapper.get('[data-test-rating-root]').attributes('style')).toContain(
          '--rating-color: #8b5cf6',
        )
      })
    })

    describe('icon', () => {
      it('renderiza star por defecto y permite sustituirlo por otro IconName', () => {
        const defaultRating = mountRating()
        const customRating = mountRating({ props: { icon: 'heart' } })

        expect(defaultRating.getComponent(Icon).props('name')).toBe('star')
        expect(customRating.getComponent(Icon).props('name')).toBe('heart')
        expect(customRating.findAll('[data-test-rating-icon]')).toHaveLength(5)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-rating-root]',
      mount: (attrs) => mountRating({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:modelValue', () => {
      it('reenvía el valor emitido por RatingRoot', async () => {
        const wrapper = mountRating({ props: { modelValue: 2 } })

        await wrapper.getComponent(RekaRatingRoot).vm.$emit('update:modelValue', 4)

        expect(wrapper.emitted('update:modelValue')).toEqual([[4]])
      })
    })
  })

  describe('slots', () => {
    describe('indicator', () => {
      it('renderiza el contenido del slot en lugar del icono por defecto', () => {
        const wrapper = mountRating({
          slots: {
            indicator: () => h('span', { 'data-test-custom-indicator': '' }, 'Custom indicator'),
          },
        })

        expect(wrapper.findAll('[data-test-custom-indicator]')).toHaveLength(5)
        expect(wrapper.get('[data-test-custom-indicator]').text()).toBe('Custom indicator')
        expect(wrapper.find('[data-test-rating-icon]').exists()).toBe(false)
      })

      it('expone item, step, percentage e iconClass en los slotProps', () => {
        const wrapper = mountRating({
          props: { length: 2, step: 0.5, size: 'lg' },
          slots: {
            indicator: ({ item, step, percentage, iconClass }) =>
              h(
                'span',
                { 'data-test-custom-indicator': '', class: iconClass },
                `${item}:${step}:${percentage}`,
              ),
          },
        })

        const indicators = wrapper.findAll('[data-test-custom-indicator]')
        expect(indicators).toHaveLength(4)
        expect(indicators.map((indicator) => indicator.text())).toEqual([
          '1:0.5:50',
          '1:1:100',
          '2:1.5:50',
          '2:2:100',
        ])
        expect(indicators[0]?.classes()).toContain('size-8')
      })
    })
  })
})
