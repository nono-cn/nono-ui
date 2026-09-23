import type { ComponentDocConfig } from '../component-docs'
import ProgressBasicExample from '../../components/examples/progress/ProgressBasicExample.vue'
import ProgressValueExample from '../../components/examples/progress/ProgressValueExample.vue'
import ProgressSizeExample from '../../components/examples/progress/ProgressSizeExample.vue'
import ProgressSeverityExample from '../../components/examples/progress/ProgressSeverityExample.vue'
import ProgressAnimationExample from '../../components/examples/progress/ProgressAnimationExample.vue'
import ProgressOrientationExample from '../../components/examples/progress/ProgressOrientationExample.vue'
import ProgressInvertedExample from '../../components/examples/progress/ProgressInvertedExample.vue'
import ProgressColorExample from '../../components/examples/progress/ProgressColorExample.vue'
import ProgressLabelExample from '../../components/examples/progress/ProgressLabelExample.vue'

const progressConfig: ComponentDocConfig = {
  slug: 'progress',
  title: 'Progress',
  language: 'en',
  description: 'Shows task progress with an accessible, customizable progress bar.',
  importPath: '@nono-ui/components/ui/Progress',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show current progress with a value and an accessible label.',
      component: ProgressBasicExample,
    },
  ],
  examples: [
    {
      title: 'Value',
      description: 'Compare determinate values with indeterminate progress using null.',
      component: ProgressValueExample,
    },
    {
      title: 'Size',
      description: 'Compare the seven available bar thicknesses.',
      component: ProgressSizeExample,
    },
    {
      title: 'Severity',
      description: 'Compare the available semantic colors for the bar.',
      component: ProgressSeverityExample,
    },
    {
      title: 'Animation',
      description:
        'Compare indeterminate progress animations in horizontal and vertical orientations.',
      component: ProgressAnimationExample,
    },
    {
      title: 'Orientation',
      description: 'Show progress in the vertical orientation.',
      component: ProgressOrientationExample,
    },
    {
      title: 'Inverted',
      description: 'Reverse the direction in which the indicator fills.',
      component: ProgressInvertedExample,
    },
    {
      title: 'Color',
      description: 'Customize the indicator color and optionally set a track color.',
      component: ProgressColorExample,
    },
    {
      title: 'Label',
      description: 'Customize the label content using the slot context.',
      component: ProgressLabelExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible name and values',
      description:
        'Progress renders role="progressbar" and communicates aria-valuemin, aria-valuemax, and aria-valuenow when the value is determinate. Use getValueLabel to provide a clear accessible name and getValueText to describe the current value. When value is null, progress is indeterminate and aria-valuenow is not communicated. The visual label is hidden from assistive technologies, so it does not replace an accessible name.',
      links: [
        {
          label: 'See the Progress accessibility guide in Reka UI',
          href: 'https://www.reka-ui.com/docs/components/progress#accessibility',
        },
      ],
    },
    {
      title: 'Color and state',
      description:
        'Do not rely on color, length, or animation alone to communicate state. Pair the bar with visible text or an accessible description, and maintain sufficient contrast between the indicator and track.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'number | null',
        default: '0',
        description:
          'Current progress value. Use null for indeterminate progress; valid values range from 0 to max.',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'Maximum value used to calculate the percentage and accessible attributes.',
      },
      {
        name: 'getValueLabel',
        type: '(value: number | null | undefined, max: number) => string | undefined',
        default: 'calculated percentage',
        description:
          'Resolver that returns the accessible name for progress. If omitted, the percentage of the current value relative to max is used.',
      },
      {
        name: 'getValueText',
        type: '(value: number | null | undefined, max: number) => string | undefined',
        default: 'undefined',
        description: 'Resolver that returns accessible text describing the current progress value.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Visible text inside the bar; its font size adjusts to the size prop.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color value for the indicator.',
      },
      {
        name: 'trackColor',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color value for the track.',
      },
      {
        name: 'size',
        type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        default: "'md'",
        description: 'Determines the bar thickness and the font size of its label.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        description: 'Semantic color of the track and progress indicator.',
      },
      {
        name: 'animation',
        type: "'carousel' | 'carousel-inverse' | 'swing' | 'elastic'",
        default: "'carousel'",
        description: 'Animation used when value is null.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Orientation of the progress bar.',
      },
      {
        name: 'inverted',
        type: 'boolean',
        default: 'false',
        description: 'Reverses the direction in which the indicator fills.',
      },
      {
        name: 'ui',
        type: `{
  indicator?: (context: ProgressContext) => HTMLAttributes
  label?: (context: ProgressContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  indicator?: (context: ' },
          { text: 'ProgressContext', link: '#progress-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'ProgressContext', link: '#progress-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers for customizing the indicator and inner label attributes and classes.',
      },
    ],
    configs: [
      {
        id: 'progress-context',
        title: 'ProgressContext',
        description: 'Context available in ui resolvers and the label slot.',
        showDefault: false,
        rows: [
          {
            name: 'value',
            type: 'number | null',
            description: 'Current value received by the component.',
          },
          {
            name: 'max',
            type: 'number',
            description: 'Configured maximum value.',
          },
          {
            name: 'percentage',
            type: 'number',
            description: 'Calculated percentage, clamped to the range from 0 to 100.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: number | null]',
        description: 'Emitted when the value changes through v-model.',
      },
    ],
    slots: [
      {
        name: 'label',
        type: 'ProgressContext',
        typeLink: '#progress-context',
        description:
          'Visible label content. Receives the current context and replaces the label fallback.',
      },
    ],
    expose: [],
  },
}

export default progressConfig
