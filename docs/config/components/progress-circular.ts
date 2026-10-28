import type { ComponentDocConfig } from '../component-docs'
import { progressCircularDefaults, progressCircularSizes } from '@/components/ui/ProgressCircular'
import ProgressCircularBasicExample from '../../components/examples/progress-circular/ProgressCircularBasicExample.vue'
import ProgressCircularSizeExample from '../../components/examples/progress-circular/ProgressCircularSizeExample.vue'
import ProgressCircularThicknessExample from '../../components/examples/progress-circular/ProgressCircularThicknessExample.vue'
import ProgressCircularColorExample from '../../components/examples/progress-circular/ProgressCircularColorExample.vue'
import ProgressCircularTrackColorExample from '../../components/examples/progress-circular/ProgressCircularTrackColorExample.vue'
import ProgressCircularIndeterminateExample from '../../components/examples/progress-circular/ProgressCircularIndeterminateExample.vue'
import ProgressCircularLabelExample from '../../components/examples/progress-circular/ProgressCircularLabelExample.vue'
import ProgressCircularMaxExample from '../../components/examples/progress-circular/ProgressCircularMaxExample.vue'
import ProgressCircularAccessibleValueExample from '../../components/examples/progress-circular/ProgressCircularAccessibleValueExample.vue'
import ProgressCircularSlotExample from '../../components/examples/progress-circular/ProgressCircularSlotExample.vue'
import ProgressCircularUiExample from '../../components/examples/progress-circular/ProgressCircularUiExample.vue'

const progressCircularConfig: ComponentDocConfig = {
  slug: 'progress-circular',
  title: 'ProgressCircular',
  language: 'en',
  description: 'Show determinate or indeterminate progress with a circular indicator.',
  importPath: '@nono-ui/components/ui/ProgressCircular',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show a determinate value and update it with v-model.',
      component: ProgressCircularBasicExample,
    },
  ],
  examples: [
    {
      title: 'Size',
      description: 'Change the diameter and label text size.',
      component: ProgressCircularSizeExample,
    },
    {
      title: 'Thickness',
      description: 'Change the stroke width, measured against a diameter of 100.',
      component: ProgressCircularThicknessExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or CSS color for the indicator and track.',
      component: ProgressCircularColorExample,
    },
    {
      title: 'Track color',
      description: 'Set the track color independently from the indicator.',
      component: ProgressCircularTrackColorExample,
    },
    {
      title: 'Indeterminate',
      description: 'Use a null value when progress is unknown to spin a quarter arc.',
      component: ProgressCircularIndeterminateExample,
    },
    {
      title: 'Label',
      description: 'Show text in the center of the circle.',
      component: ProgressCircularLabelExample,
    },
    {
      title: 'Max',
      description: 'Set the maximum value used to calculate progress.',
      component: ProgressCircularMaxExample,
    },
    {
      title: 'Accessible value',
      description: 'Provide a spoken name and value for assistive technology.',
      component: ProgressCircularAccessibleValueExample,
    },
    {
      title: 'Slot label',
      description: 'Render custom content in the center of the circle.',
      component: ProgressCircularSlotExample,
    },
    {
      title: 'UI',
      description: 'Customize svg, track, indicator, and label attributes using their context.',
      component: ProgressCircularUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Give the progress a name with aria-label, aria-labelledby, or getValueLabel. The svg and the visual label in the center are hidden from assistive technology.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="progressbar"', 'Root', 'Announces the progress.'],
          ['aria-valuenow', 'Root', 'The value. Missing while the value is null.'],
          ['aria-valuemin, aria-valuemax', 'Root', '0 and max.'],
          ['aria-label', 'Root', 'From getValueLabel; the percentage by default.'],
          ['aria-valuetext', 'Root', 'From getValueText, when you pass it.'],
          ['aria-hidden="true"', 'Svg', 'The track and indicator circles.'],
          ['aria-hidden="true"', 'Label', 'The visual label in the center.'],
        ],
      },
    },
    {
      title: 'Unknown progress',
      description:
        'Pass null as value when the amount completed is unknown. In this state the progress has no aria-valuenow and a quarter arc spins until a numeric value is provided.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'number | null',
        default: String(progressCircularDefaults.modelValue),
        description: 'Current value, updated with v-model. null makes progress indeterminate.',
      },
      {
        name: 'max',
        type: 'number',
        default: String(progressCircularDefaults.max),
        description: 'Maximum value. Reka UI requires a number greater than zero.',
      },
      {
        name: 'getValueLabel',
        type: '(value: number | null | undefined, max: number) => string | undefined',
        default: 'percentage label',
        description: 'Provides the accessible name rendered by ProgressRoot.',
      },
      {
        name: 'getValueText',
        type: '(value: number | null | undefined, max: number) => string | undefined',
        default: 'undefined',
        description: 'Provides aria-valuetext for assistive technology.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description:
          'Visual text in the center of the circle; replaced by the label slot when provided.',
      },
      {
        name: 'size',
        type: progressCircularSizes.map((value) => `'${value}'`).join(' | '),
        default: `'${progressCircularDefaults.size}'`,
        description: 'Diameter and label text size.',
      },
      {
        name: 'thickness',
        type: 'number',
        default: String(progressCircularDefaults.thickness),
        description: 'Stroke width of the track and indicator, measured against a diameter of 100.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${progressCircularDefaults.color}'`,
        description: 'Theme token or CSS color for the indicator and track.',
      },
      {
        name: 'trackColor',
        type: 'string',
        default: 'undefined',
        description: 'Theme token or CSS color overriding the track independently.',
      },
      {
        name: 'ui',
        type: `{
  svg?: (context: ProgressCircularContext) => SVGAttributes
  track?: (context: ProgressCircularContext) => SVGAttributes
  indicator?: (context: ProgressCircularContext) => SVGAttributes
  label?: (context: ProgressCircularContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  svg?: (context: ' },
          {
            text: 'ProgressCircularContext',
            link: '/components/progress-circular#progress-circular-context',
          },
          { text: ') => SVGAttributes\n  track?: (context: ' },
          {
            text: 'ProgressCircularContext',
            link: '/components/progress-circular#progress-circular-context',
          },
          { text: ') => SVGAttributes\n  indicator?: (context: ' },
          {
            text: 'ProgressCircularContext',
            link: '/components/progress-circular#progress-circular-context',
          },
          { text: ') => SVGAttributes\n  label?: (context: ' },
          {
            text: 'ProgressCircularContext',
            link: '/components/progress-circular#progress-circular-context',
          },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: 'undefined',
        description: 'Resolvers for svg, track, indicator, and visual label attributes.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: number | null]',
        description: 'Emitted when the value model changes.',
      },
    ],
    slots: [
      {
        name: 'label',
        type: 'ProgressCircularContext',
        typeLink: '/components/progress-circular#progress-circular-context',
        description: 'Replaces the visual label in the center of the circle with custom content.',
      },
    ],
    configs: [
      {
        id: 'progress-circular-context',
        title: 'ProgressCircularContext',
        showDefault: false,
        rows: [
          { name: 'value', type: 'number | null', description: 'Current progress value.' },
          { name: 'max', type: 'number', description: 'Maximum progress value.' },
          {
            name: 'percentage',
            type: 'number',
            description: 'Value as a percentage, clamped between zero and 100.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default progressCircularConfig
