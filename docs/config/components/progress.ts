import type { ComponentDocConfig } from '../component-docs'
import {
  progressAnimations,
  progressDefaults,
  progressOrientations,
  progressSizes,
} from '@/components/ui/Progress'
import ProgressBasicExample from '../../components/examples/progress/ProgressBasicExample.vue'
import ProgressSizeExample from '../../components/examples/progress/ProgressSizeExample.vue'
import ProgressColorExample from '../../components/examples/progress/ProgressColorExample.vue'
import ProgressTrackColorExample from '../../components/examples/progress/ProgressTrackColorExample.vue'
import ProgressOrientationExample from '../../components/examples/progress/ProgressOrientationExample.vue'
import ProgressAnimationExample from '../../components/examples/progress/ProgressAnimationExample.vue'
import ProgressLabelExample from '../../components/examples/progress/ProgressLabelExample.vue'
import ProgressMaxExample from '../../components/examples/progress/ProgressMaxExample.vue'
import ProgressAccessibleValueExample from '../../components/examples/progress/ProgressAccessibleValueExample.vue'
import ProgressSlotExample from '../../components/examples/progress/ProgressSlotExample.vue'
import ProgressIndicatorSlotExample from '../../components/examples/progress/ProgressIndicatorSlotExample.vue'
import ProgressUiExample from '../../components/examples/progress/ProgressUiExample.vue'

const progressConfig: ComponentDocConfig = {
  slug: 'progress',
  title: 'Progress',
  language: 'en',
  description: 'Show determinate or indeterminate progress with a linear indicator.',
  importPath: '@nono-ui/components/ui/Progress',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show a determinate value and update it with v-model.',
      component: ProgressBasicExample,
    },
  ],
  examples: [
    { title: 'Size', description: 'Change the track thickness.', component: ProgressSizeExample },
    {
      title: 'Color',
      description: 'Choose a theme token or CSS color for the indicator and track.',
      component: ProgressColorExample,
    },
    {
      title: 'Track color',
      description: 'Set the track color independently from the indicator.',
      component: ProgressTrackColorExample,
    },
    {
      title: 'Orientation and direction',
      description: 'Show horizontal or vertical progress, optionally from the opposite edge.',
      component: ProgressOrientationExample,
    },
    {
      title: 'Indeterminate animation',
      description: 'Use a null value when progress is unknown and choose its animation.',
      component: ProgressAnimationExample,
    },
    { title: 'Label', description: 'Show text inside the track.', component: ProgressLabelExample },
    {
      title: 'Max',
      description: 'Set the maximum value used to calculate progress.',
      component: ProgressMaxExample,
    },
    {
      title: 'Accessible value',
      description: 'Provide a spoken name and value for assistive technology.',
      component: ProgressAccessibleValueExample,
    },
    {
      title: 'Slot label',
      description: 'Render a label inside the track at sizes xl and 2xl.',
      component: ProgressSlotExample,
    },
    {
      title: 'Slot indicator',
      description: 'Render content above the track at any size.',
      component: ProgressIndicatorSlotExample,
    },
    {
      title: 'UI',
      description: 'Customize indicator and label attributes using their context.',
      component: ProgressUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Give the progress bar a name with aria-label, aria-labelledby, or getValueLabel. The visual label inside the track is hidden from assistive technology.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="progressbar"', 'Root', 'Announces the progress.'],
          ['aria-valuenow', 'Root', 'The value. Missing while the value is null.'],
          ['aria-valuemin, aria-valuemax', 'Root', '0 and max.'],
          ['aria-label', 'Root', 'From getValueLabel; the percentage by default.'],
          ['aria-valuetext', 'Root', 'From getValueText, when you pass it.'],
          ['aria-hidden="true"', 'Label', 'The visual label inside the track.'],
        ],
      },
    },
    {
      title: 'Unknown progress',
      description:
        'Pass null as value when the amount completed is unknown. In this state the progress bar has no aria-valuenow and animates until a numeric value is provided.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'number | null',
        default: String(progressDefaults.modelValue),
        description: 'Current value, updated with v-model. null makes progress indeterminate.',
      },
      {
        name: 'max',
        type: 'number',
        default: String(progressDefaults.max),
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
          'Visual text inside the track at sizes xl and 2xl; replaced by the label slot when provided.',
      },
      {
        name: 'size',
        type: progressSizes.map((value) => `'${value}'`).join(' | '),
        default: `'${progressDefaults.size}'`,
        description: 'Track thickness and label text size.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${progressDefaults.color}'`,
        description: 'Theme token or CSS color for the indicator and track.',
      },
      {
        name: 'trackColor',
        type: 'string',
        default: 'undefined',
        description: 'Theme token or CSS color overriding the track independently.',
      },
      {
        name: 'animation',
        type: progressAnimations.map((value) => `'${value}'`).join(' | '),
        default: `'${progressDefaults.animation}'`,
        description: 'Animation used while value is null.',
      },
      {
        name: 'orientation',
        type: progressOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${progressDefaults.orientation}'`,
        description: 'Horizontal or vertical track layout.',
      },
      {
        name: 'inverted',
        type: 'boolean',
        default: String(progressDefaults.inverted),
        description: 'Fills the indicator from the opposite edge.',
      },
      {
        name: 'ui',
        type: `{
  indicator?: (context: ProgressContext) => HTMLAttributes
  label?: (context: ProgressContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  indicator?: (context: ' },
          { text: 'ProgressContext', link: '/components/progress#progress-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'ProgressContext', link: '/components/progress#progress-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: 'undefined',
        description: 'Resolvers for indicator and visual label attributes.',
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
        name: 'indicator',
        type: 'ProgressContext',
        typeLink: '/components/progress#progress-context',
        description: 'Renders above the progress track at any size.',
      },
      {
        name: 'label',
        type: 'ProgressContext',
        typeLink: '/components/progress#progress-context',
        description: 'Replaces the visual label with custom content at sizes xl and 2xl.',
      },
    ],
    configs: [
      {
        id: 'progress-context',
        title: 'ProgressContext',
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

export default progressConfig
