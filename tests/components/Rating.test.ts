import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { RatingRoot as RekaRatingRoot } from 'reka-ui'

import { Rating, type RatingProps } from '@/components/ui/Rating'
import { ratingDefaults } from '@/components/ui/Rating/defaults'

const casesLength = [
  { input: undefined, expected: ratingDefaults.length },
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: 3, expected: 3 },
  { input: 10, expected: 10 },
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
  })
})
