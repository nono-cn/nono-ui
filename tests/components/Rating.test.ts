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

function mountRating(options: MountingOptions<RatingProps> = {}) {
  return mount(Rating, options)
}

describe('Rating', () => {
  describe('props', () => {
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
  })
})
