import type { ComponentDocConfig } from '../component-docs'
import SliderBasicExample from '../../components/examples/slider/SliderBasicExample.vue'
import SliderRangeExample from '../../components/examples/slider/SliderRangeExample.vue'
import SliderVerticalExample from '../../components/examples/slider/SliderVerticalExample.vue'
import SliderSizesExample from '../../components/examples/slider/SliderSizesExample.vue'
import SliderSeverityExample from '../../components/examples/slider/SliderSeverityExample.vue'
import SliderColorExample from '../../components/examples/slider/SliderColorExample.vue'
import SliderInvertedExample from '../../components/examples/slider/SliderInvertedExample.vue'
import SliderThumbAlignmentExample from '../../components/examples/slider/SliderThumbAlignmentExample.vue'
import SliderDisabledExample from '../../components/examples/slider/SliderDisabledExample.vue'

const sliderConfig: ComponentDocConfig = {
  slug: 'slider',
  title: 'Slider',
  language: 'en',
  description: 'Accessible slider for selecting one or more numeric values.',
  importPath: '@nono-ui/components/ui/Slider',
  usage: [
    {
      title: 'Value',
      description: 'Bind a value, provide an accessible name, and display the selected value.',
      component: SliderBasicExample,
    },
  ],
  examples: [
    {
      title: 'Min steps between thumbs',
      description: 'Use two thumbs with limits, increments, and a minimum distance between them.',
      component: SliderRangeExample,
    },
    {
      title: 'Orientation',
      description: 'Place the slider vertically inside a container with a defined height.',
      component: SliderVerticalExample,
    },
    {
      title: 'Size',
      description: 'Compare the xs, sm, md, lg, and xl sizes.',
      component: SliderSizesExample,
    },
    {
      title: 'Severity',
      description: 'Compare the available semantic colors for the selected value.',
      component: SliderSeverityExample,
    },
    {
      title: 'Color',
      description: 'Apply a custom CSS color instead of the semantic color.',
      component: SliderColorExample,
    },
    {
      title: 'Inverted',
      description: 'Compare the normal direction with inverted enabled.',
      component: SliderInvertedExample,
    },
    {
      title: 'Thumb alignment',
      description: 'Compare how contain and overflow align the thumb at the endpoints.',
      component: SliderThumbAlignmentExample,
    },
    {
      title: 'Disabled',
      description: 'Compare the interactive and disabled states.',
      component: SliderDisabledExample,
    },
  ],
  accessibility: [
    {
      title: 'Thumb labels',
      description:
        'The slider automatically labels range thumbs as minimum and maximum. For custom labeling, pass aria-label / aria-labelledby through ui.thumb. Use name and required when the value is part of a form.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: '[] | [number] | [number, number] | null',
        default: '[0]',
        description: 'Controlled slider value. Can also be bound with v-model:value.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables interaction with all thumbs.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Sets the slider orientation.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Sets the size of the track and thumbs.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color for the track, range, and thumbs.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        description: 'Semantic color of the slider.',
      },
      {
        name: 'inverted',
        type: 'boolean',
        default: 'false',
        description: 'Reverses the value direction within the slider.',
      },
      {
        name: 'min',
        type: 'number',
        default: '0',
        description: 'Minimum allowed value.',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'Maximum allowed value.',
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        description: 'Increment between allowed values.',
      },
      {
        name: 'minStepsBetweenThumbs',
        type: 'number',
        default: '0',
        description: 'Minimum distance between thumbs, expressed in steps.',
      },
      {
        name: 'thumbAlignment',
        type: "'contain' | 'overflow'",
        default: "'contain'",
        description: 'Determines how the thumb aligns with the track endpoints.',
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name used when submitting the value as part of a form.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'undefined',
        description: 'Marks the control as required in a form.',
      },
      {
        name: 'ui',
        type: `{
  track?: (context: SliderContext) => HTMLAttributes
  range?: (context: SliderContext) => HTMLAttributes
  thumb?: (context: SliderThumbContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  track?: (context: ' },
          { text: 'SliderContext', link: '#slider-context' },
          { text: ') => HTMLAttributes\n  range?: (context: ' },
          { text: 'SliderContext', link: '#slider-context' },
          { text: ') => HTMLAttributes\n  thumb?: (context: ' },
          { text: 'SliderThumbContext', link: '#slider-thumb-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers for customizing the attributes and classes of the track, range, and thumbs.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: [] | [number] | [number, number] | null]',
        description: 'Emitted when the value changes during interaction.',
      },
      {
        name: 'valueCommit',
        type: '[value: number[]]',
        description: 'Emitted when the user commits the slider value.',
      },
    ],
    slots: [] /* removed custom slots */,
    /*
      {
        name: 'thumb',
        type: 'SliderThumbContext',
        typeLink: '#slider-thumb-context',
        description: 'Adds content inside each thumb and receives its context.',
      },
    ], */
    expose: [],
    configs: [
      {
        id: 'slider-context',
        title: 'SliderContext',
        description: 'Context available in ui resolvers.',
        rows: [
          {
            name: 'values',
            type: 'number[]',
            description: 'Current values of all thumbs.',
          },
        ],
      },
      {
        id: 'slider-thumb-context',
        title: 'SliderThumbContext',
        description: 'Context available in the ui.thumb resolver.',
        rows: [
          {
            name: 'values',
            type: 'number[]',
            description: 'Current values of all thumbs.',
          },
          { name: 'index', type: 'number', description: 'Index of the thumb in the slider.' },
          { name: 'value', type: 'number', description: 'Current thumb value.' },
          {
            name: 'first',
            type: 'boolean',
            description: 'Indicates whether this is the first thumb.',
          },
          {
            name: 'last',
            type: 'boolean',
            description: 'Indicates whether this is the last thumb.',
          },
        ],
      },
    ],
  },
}

export default sliderConfig
