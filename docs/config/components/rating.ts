import type { ComponentDocConfig } from '../component-docs'
import RatingBasicExample from '../../components/examples/rating/RatingBasicExample.vue'
import RatingClearableExample from '../../components/examples/rating/RatingClearableExample.vue'
import RatingHoverableExample from '../../components/examples/rating/RatingHoverableExample.vue'
import RatingLoopExample from '../../components/examples/rating/RatingLoopExample.vue'
import RatingDisabledExample from '../../components/examples/rating/RatingDisabledExample.vue'
import RatingStepExample from '../../components/examples/rating/RatingStepExample.vue'
import RatingOrientationExample from '../../components/examples/rating/RatingOrientationExample.vue'

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
    {
      title: 'Loop',
      description: 'Wrap keyboard navigation from the last star to the first.',
      component: RatingLoopExample,
    },
    {
      title: 'Disabled',
      description: 'Display a rating without allowing changes.',
      component: RatingDisabledExample,
    },
    {
      title: 'Step',
      description: 'Choose the increment between rating values.',
      component: RatingStepExample,
    },
    {
      title: 'Orientation',
      description: 'Arrange rating items horizontally or vertically.',
      component: RatingOrientationExample,
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
        name: 'modelValue',
        type: 'number | undefined',
        description: 'Selected rating. Bind it with v-model.',
      },
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
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Wraps keyboard navigation from the last rating item to the first.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction with the rating.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Marks the rating as required when used in a form.',
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name used to submit the rating value with its form.',
      },
      {
        name: 'step',
        type: '1 | 0.5 | 0.25 | 0.1',
        default: '1',
        description: 'Granularity of each rating item, including fractional values.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Direction in which rating items are arranged.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: 'number',
        description: 'Emitted when the selected rating changes.',
      },
    ],
    slots: [],
    expose: [],
  },
}

export default ratingConfig
