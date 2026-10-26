import type { ComponentDocConfig } from '../component-docs'
import {
  sliderDefaults,
  sliderOrientations,
  sliderSizes,
  sliderThumbAlignments,
} from '@/components/ui/Slider'
import SliderBasicExample from '../../components/examples/slider/SliderBasicExample.vue'
import SliderMultipleExample from '../../components/examples/slider/SliderMultipleExample.vue'
import SliderMinMaxExample from '../../components/examples/slider/SliderMinMaxExample.vue'
import SliderStepExample from '../../components/examples/slider/SliderStepExample.vue'
import SliderMinStepsBetweenThumbsExample from '../../components/examples/slider/SliderMinStepsBetweenThumbsExample.vue'
import SliderSizeExample from '../../components/examples/slider/SliderSizeExample.vue'
import SliderColorExample from '../../components/examples/slider/SliderColorExample.vue'
import SliderOrientationExample from '../../components/examples/slider/SliderOrientationExample.vue'
import SliderInvertedExample from '../../components/examples/slider/SliderInvertedExample.vue'
import SliderThumbAlignmentExample from '../../components/examples/slider/SliderThumbAlignmentExample.vue'
import SliderDisabledExample from '../../components/examples/slider/SliderDisabledExample.vue'
import SliderUiExample from '../../components/examples/slider/SliderUiExample.vue'

const sliderConfig: ComponentDocConfig = {
  slug: 'slider',
  title: 'Slider',
  language: 'en',
  description: 'Select a value or a range of values by dragging thumbs along a track.',
  importPath: '@nono-ui/components/ui/Slider',
  usage: [
    {
      title: 'Basic usage',
      description: 'Pick a value and update it with v-model.',
      component: SliderBasicExample,
    },
  ],
  examples: [
    {
      title: 'Multiple',
      description: 'Pass several values to render one thumb per value.',
      component: SliderMultipleExample,
    },
    {
      title: 'Min and max',
      description: 'Set the minimum and maximum values of the slider.',
      component: SliderMinMaxExample,
    },
    {
      title: 'Step',
      description: 'Set the interval between values.',
      component: SliderStepExample,
    },
    {
      title: 'Min steps between thumbs',
      description: 'Keep a minimum number of steps between thumbs.',
      component: SliderMinStepsBetweenThumbsExample,
    },
    {
      title: 'Size',
      description: 'Change the track thickness and the thumb size.',
      component: SliderSizeExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or CSS color for the track, range, and thumbs.',
      component: SliderColorExample,
    },
    {
      title: 'Orientation',
      description: 'Show a horizontal or vertical slider.',
      component: SliderOrientationExample,
    },
    {
      title: 'Inverted',
      description: 'Fill the track from the opposite edge.',
      component: SliderInvertedExample,
    },
    {
      title: 'Thumb alignment',
      description: 'Keep the thumbs inside the track or let them overflow its ends.',
      component: SliderThumbAlignmentExample,
    },
    {
      title: 'Disabled',
      description: 'Prevent interaction with the slider.',
      component: SliderDisabledExample,
    },
    {
      title: 'UI',
      description:
        'Customize the track, the range, and each thumb using the slider context or the context of each thumb.',
      component: SliderUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Each thumb is the element assistive technology interacts with, so roles, values, and names live on the thumbs rather than on the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="slider"', 'Thumb', 'Every thumb is announced as a slider.'],
          [
            'aria-label',
            'Thumb',
            '"Value N of M" in the current locale. Return an aria-label from ui.thumb to give each thumb a more specific name, using its index to tell them apart.',
          ],
          ['aria-valuenow', 'Thumb', 'Current value of the thumb.'],
          ['aria-valuemin', 'Thumb', 'The min prop.'],
          ['aria-valuemax', 'Thumb', 'The max prop.'],
          ['aria-orientation', 'Thumb', 'The orientation prop.'],
          ['tabindex="0"', 'Thumb', 'Removed while disabled, so the thumbs leave the tab order.'],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'Keys act on the focused thumb, except Home and End, which always move the first and last thumbs. Values are rounded to step and kept within min and max.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Tab', 'Moves focus to the next thumb.'],
          ['Shift + Tab', 'Moves focus to the previous thumb.'],
          ['ArrowRight, ArrowUp', 'Increases the value by one step.'],
          ['ArrowLeft, ArrowDown', 'Decreases the value by one step.'],
          ['PageUp', 'Increases the value by ten steps.'],
          ['PageDown', 'Decreases the value by ten steps.'],
          ['Shift + Arrow', 'Moves the value by ten steps in the direction of the arrow.'],
          ['Home', 'Moves the first thumb to min.'],
          ['End', 'Moves the last thumb to max.'],
        ],
      },
    },
    {
      title: 'Direction',
      description:
        'The keys follow the direction the track fills in. In a right-to-left layout a horizontal slider behaves as if it were inverted, and an inverted one as if it were not.',
      table: {
        columns: ['Layout', 'Increase', 'Decrease'],
        rows: [
          ['horizontal', 'ArrowRight, ArrowUp, PageUp', 'ArrowLeft, ArrowDown, PageDown'],
          [
            'horizontal + inverted',
            'ArrowLeft, ArrowUp, PageUp',
            'ArrowRight, ArrowDown, PageDown',
          ],
          ['vertical', 'ArrowUp, ArrowRight, PageUp', 'ArrowDown, ArrowLeft, PageDown'],
          ['vertical + inverted', 'ArrowDown, ArrowRight, PageDown', 'ArrowUp, ArrowLeft, PageUp'],
        ],
      },
    },
    {
      title: 'Forms',
      description:
        'When the slider is inside a form and has a name, a hidden input is rendered for each thumb so the values are submitted. Use the required prop to mark the value as required.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'number[]',
        default: '[0]',
        description: 'Current values, one per thumb, updated with v-model.',
      },
      {
        name: 'min',
        type: 'number',
        default: String(sliderDefaults.min),
        description: 'Minimum value.',
      },
      {
        name: 'max',
        type: 'number',
        default: String(sliderDefaults.max),
        description: 'Maximum value.',
      },
      {
        name: 'step',
        type: 'number',
        default: String(sliderDefaults.step),
        description: 'Interval between values.',
      },
      {
        name: 'minStepsBetweenThumbs',
        type: 'number',
        default: String(sliderDefaults.minStepsBetweenThumbs),
        description: 'Minimum number of steps between thumbs.',
      },
      {
        name: 'orientation',
        type: sliderOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${sliderDefaults.orientation}'`,
        description: 'Horizontal or vertical track layout.',
      },
      {
        name: 'inverted',
        type: 'boolean',
        default: String(sliderDefaults.inverted),
        description: 'Fills the track from the opposite edge.',
      },
      {
        name: 'thumbAlignment',
        type: sliderThumbAlignments.map((value) => `'${value}'`).join(' | '),
        default: `'${sliderDefaults.thumbAlignment}'`,
        description: 'Keeps the thumbs inside the track or lets them overflow its ends.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: String(sliderDefaults.disabled),
        description: 'Prevents interaction with the slider.',
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name of the values submitted with the form.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: String(sliderDefaults.required),
        description: 'Marks the value as required in a form.',
      },
      {
        name: 'size',
        type: sliderSizes.map((value) => `'${value}'`).join(' | '),
        default: `'${sliderDefaults.size}'`,
        description: 'Track thickness and thumb size.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${sliderDefaults.color}'`,
        description: 'Theme token or CSS color for the track, range, and thumbs.',
      },
      {
        name: 'ui',
        type: `{
  track?: (context: SliderContext) => HTMLAttributes
  range?: (context: SliderContext) => HTMLAttributes
  thumb?: (context: SliderThumbContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  track?: (context: ' },
          { text: 'SliderContext', link: '/components/slider#slider-context' },
          { text: ') => HTMLAttributes\n  range?: (context: ' },
          { text: 'SliderContext', link: '/components/slider#slider-context' },
          { text: ') => HTMLAttributes\n  thumb?: (context: ' },
          { text: 'SliderThumbContext', link: '/components/slider#slider-thumb-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: 'undefined',
        description: 'Resolvers for track, range, and thumb attributes.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: number[]]',
        description: 'Emitted when the values change.',
      },
      {
        name: 'change',
        type: '[value: number[]]',
        description:
          'Emitted when the user moves a thumb. It is not emitted when modelValue changes from outside.',
      },
    ],
    slots: [],
    configs: [
      {
        id: 'slider-context',
        title: 'SliderContext',
        showDefault: false,
        rows: [
          { name: 'value', type: 'number[]', description: 'Current values, one per thumb.' },
          { name: 'disabled', type: 'boolean', description: 'Whether the slider is disabled.' },
        ],
      },
      {
        id: 'slider-thumb-context',
        title: 'SliderThumbContext',
        showDefault: false,
        rows: [
          { name: 'value', type: 'number', description: 'Value of the thumb.' },
          { name: 'index', type: 'number', description: 'Position of the thumb.' },
          { name: 'disabled', type: 'boolean', description: 'Whether the slider is disabled.' },
        ],
      },
    ],
    expose: [],
  },
}

export default sliderConfig
