import type { ComponentDocConfig } from '../component-docs'
import { ratingDefaults, ratingOrientations, ratingSizes } from '@/components/ui/Rating'
import RatingBasicExample from '../../components/examples/rating/RatingBasicExample.vue'
import RatingSizeExample from '../../components/examples/rating/RatingSizeExample.vue'
import RatingColorExample from '../../components/examples/rating/RatingColorExample.vue'
import RatingIconExample from '../../components/examples/rating/RatingIconExample.vue'
import RatingLengthExample from '../../components/examples/rating/RatingLengthExample.vue'
import RatingStepExample from '../../components/examples/rating/RatingStepExample.vue'
import RatingClearableExample from '../../components/examples/rating/RatingClearableExample.vue'
import RatingHoverableExample from '../../components/examples/rating/RatingHoverableExample.vue'
import RatingDisabledExample from '../../components/examples/rating/RatingDisabledExample.vue'
import RatingReadonlyExample from '../../components/examples/rating/RatingReadonlyExample.vue'
import RatingOrientationExample from '../../components/examples/rating/RatingOrientationExample.vue'
import RatingUiExample from '../../components/examples/rating/RatingUiExample.vue'
import RatingSlotExample from '../../components/examples/rating/RatingSlotExample.vue'

const ratingConfig: ComponentDocConfig = {
  slug: 'rating',
  title: 'Rating',
  language: 'en',
  description: 'An interactive rating control with configurable stars and increments.',
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
      title: 'Size',
      description: 'Change the size and spacing of rating items.',
      component: RatingSizeExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme color or a custom CSS color.',
      component: RatingColorExample,
    },
    {
      title: 'Icon',
      description: 'Choose the icon shown in each rating item.',
      component: RatingIconExample,
    },
    {
      title: 'Length',
      description: 'Set the number of rating items.',
      component: RatingLengthExample,
    },
    {
      title: 'Step',
      description: 'Choose whole or half-star increments.',
      component: RatingStepExample,
    },
    {
      title: 'Clearable',
      description: 'Select the current value again to clear it.',
      component: RatingClearableExample,
    },
    {
      title: 'Hoverable',
      description: 'Preview the value while hovering over rating items.',
      component: RatingHoverableExample,
    },
    {
      title: 'Disabled',
      description: 'Prevent interaction and show disabled styling.',
      component: RatingDisabledExample,
    },
    {
      title: 'Readonly',
      description: 'Display a rating without allowing changes.',
      component: RatingReadonlyExample,
    },
    {
      title: 'Orientation',
      description: 'Lay out items horizontally or vertically.',
      component: RatingOrientationExample,
    },
    {
      title: 'UI',
      description: 'Customize each item and indicator using their context.',
      component: RatingUiExample,
    },
    {
      title: 'Item slot',
      description:
        "Replace the icon while retaining Rating's selected-state styling through iconClass.",
      component: RatingSlotExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible name and keyboard use',
      description:
        'Provide an accessible name with aria-label or aria-labelledby. Use readonly to display a value without allowing changes; disabled removes interaction.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'number',
        default: 'undefined',
        description: 'Selected value, updated with v-model.',
      },
      {
        name: 'length',
        type: 'number',
        default: String(ratingDefaults.length),
        description: 'Number of rating items.',
      },
      {
        name: 'step',
        type: '0.5 | 1',
        default: String(ratingDefaults.step),
        description: 'Increment between selectable values.',
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: String(ratingDefaults.clearable),
        description: 'Allows clearing the selected rating.',
      },
      {
        name: 'hoverable',
        type: 'boolean',
        default: String(ratingDefaults.hoverable),
        description: 'Previews values on hover.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: String(ratingDefaults.loop),
        description: 'Wraps keyboard navigation between ends.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: String(ratingDefaults.disabled),
        description: 'Prevents interaction and applies disabled styling.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: String(ratingDefaults.readonly),
        description: 'Prevents value changes while retaining full opacity.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: String(ratingDefaults.required),
        description: 'Marks the field as required.',
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Field name for form submission.',
      },
      {
        name: 'orientation',
        type: ratingOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${ratingDefaults.orientation}'`,
        description: 'Direction of items and keyboard navigation.',
      },
      {
        name: 'size',
        type: ratingSizes.map((value) => `'${value}'`).join(' | '),
        default: `'${ratingDefaults.size}'`,
        description: 'Size and spacing of rating items.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${ratingDefaults.color}'`,
        description: 'Theme token or CSS color for the indicators.',
      },
      {
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: `'${ratingDefaults.icon}'`,
        description: 'Icon used by each indicator when the item slot is absent.',
      },
      {
        name: 'ui',
        type: `{
  item?: (context: RatingItemContext) => HTMLAttributes
  indicator?: (context: RatingItemContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  item?: (context: ' },
          { text: 'RatingItemContext', link: '/components/rating#rating-item-context' },
          { text: ') => HTMLAttributes\n  indicator?: (context: ' },
          { text: 'RatingItemContext', link: '/components/rating#rating-item-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: 'undefined',
        description:
          'item sets attributes on each rating item; indicator sets attributes on each selectable step.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: number]',
        description: 'Emitted when the selected rating changes.',
      },
    ],
    slots: [
      {
        name: 'item',
        type: 'RatingItemContext',
        typeLink: '/components/rating#rating-item-context',
        description: 'Custom content inside each indicator; replaces the icon.',
      },
    ],
    configs: [
      {
        id: 'rating-item-context',
        title: 'RatingItemContext',
        showDefault: false,
        rows: [
          { name: 'item', type: 'number', description: 'One-based item number.' },
          { name: 'step', type: 'number', description: 'Value represented by this indicator.' },
          {
            name: 'percentage',
            type: 'number',
            description: 'Percentage of the item covered by this step.',
          },
          {
            name: 'iconClass',
            type: 'string',
            description: 'Size classes for a replacement icon.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default ratingConfig
