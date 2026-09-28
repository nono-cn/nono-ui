import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { RatingRoot as RekaRatingRoot } from 'reka-ui'

import { Rating, type RatingProps } from '@/components/ui/Rating'

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
  { input: undefined, expected: true },
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
})
