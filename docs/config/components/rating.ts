import type { ComponentDocConfig } from '../component-docs'
import RatingBasicExample from '../../components/examples/rating/RatingBasicExample.vue'
import RatingClearableExample from '../../components/examples/rating/RatingClearableExample.vue'
import RatingHoverableExample from '../../components/examples/rating/RatingHoverableExample.vue'

const ratingConfig: ComponentDocConfig = {
  slug: 'rating',
  title: 'Rating',
  language: 'en',
  description: 'A star-rating input for selecting a score.',
  importPath: '@nono-ui/components/ui/Rating',
  usage: [
    {
      title: 'Basic usage',
      description: 'Choose a rating from one to five.',
      component: RatingBasicExample,
    },
  ],
  examples: [
    {
      title: 'Clearable',
      description: 'Click the selected rating again to clear it.',
      component: RatingClearableExample,
    },
    {
      title: 'Hoverable',
      description: 'Preview a rating by hovering over its stars.',
      component: RatingHoverableExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible label',
      description:
        'Provide an accessible label so screen reader users understand what the rating input represents.',
      links: [
        {
          label: 'Read the Reka UI Rating accessibility guide',
          href: 'https://reka-ui.com/docs/components/rating#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'length',
        type: 'number',
        default: '5',
        description: 'Number of rating items rendered.',
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        description: 'Clicking the selected rating again resets the value to zero.',
      },
      {
        name: 'hoverable',
        type: 'boolean',
        default: 'false',
        description: 'Previews the rating under the pointer before selection.',
      },
    ],
    emits: [],
    slots: [],
    expose: [],
  },
}

export default ratingConfig
