import { stepperSizes, stepperDefaults } from '@/components/ui/Stepper'
import type { ComponentDocConfig, ApiTableRow } from '../component-docs'
import StepperSizeExample from '../../components/examples/stepper/StepperSizeExample.vue'
import StepperUsageExample from '../../components/examples/stepper/StepperUsageExample.vue'
import StepperVerticalExample from '../../components/examples/stepper/StepperVerticalExample.vue'
import StepperNavigationExample from '../../components/examples/stepper/StepperNavigationExample.vue'
import StepperDisabledExample from '../../components/examples/stepper/StepperDisabledExample.vue'
import StepperColorExample from '../../components/examples/stepper/StepperColorExample.vue'
import StepperSlotsExample from '../../components/examples/stepper/StepperSlotsExample.vue'
import StepperUiExample from '../../components/examples/stepper/StepperUiExample.vue'

const row = (name: string, type: string, description: string): ApiTableRow => ({
  name,
  type,
  description,
})
const contextRows: ApiTableRow[] = [
  row('modelValue', 'number | undefined', 'Current step value; falls back to 1.'),
  row('totalSteps', 'number', 'Number of configured steps.'),
  ...['isNextDisabled', 'isPrevDisabled', 'isFirstStep', 'isLastStep'].map((name) =>
    row(
      name,
      'boolean',
      'Position and immediate-neighbour state in the steps array. isNextDisabled and isPrevDisabled are also true when the component is disabled.',
    ),
  ),
  row(
    'goToStep',
    '(step: number) => void',
    'Navigates to an existing enabled step when the component is enabled, subject to Reka linear navigation.',
  ),
  ...['nextStep', 'prevStep'].map((name) =>
    row(
      name,
      '() => void',
      'Navigates to the immediate adjacent step if both the component and that step are enabled.',
    ),
  ),
  ...['hasNext', 'hasPrev'].map((name) =>
    row(
      name,
      '() => boolean',
      'Checks that the component and immediate neighbour are enabled and Reka permits navigation.',
    ),
  ),
]
const config: ComponentDocConfig = {
  slug: 'stepper',
  title: 'Stepper',
  language: 'en',
  description: 'Guides users through a sequence of steps with optional descriptions and content.',
  importPath: '@nono-ui/components/ui/Stepper',
  usage: [
    {
      title: 'Basic usage',
      description: 'Use consecutive step values starting at 1 and bind v-model.',
      component: StepperUsageExample,
    },
  ],
  examples: [
    {
      title: 'Size',
      description:
        'Scale the indicators, icons, labels, descriptions, spacing, and separator placement in both orientations.',
      component: StepperSizeExample,
    },
    {
      title: 'Vertical orientation',
      description: 'Stack the steps vertically.',
      component: StepperVerticalExample,
    },
    {
      title: 'Linear navigation',
      description:
        'Allow the current and previous steps plus the next step, or allow free navigation with linear=false.',
      component: StepperNavigationExample,
    },
    {
      title: 'Disabled',
      description: 'Disable navigation through every step.',
      component: StepperDisabledExample,
    },
    {
      title: 'Color',
      description: 'Customize the active and completed indicators.',
      component: StepperColorExample,
    },
    {
      title: 'Custom slots',
      description: 'Replace a specific label and add previous/next controls to the active content.',
      component: StepperSlotsExample,
    },
    {
      title: 'UI resolvers',
      description: 'Customize individual nodes with HTML attributes and classes.',
      component: StepperUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Labels and keyboard',
      description:
        'Pass aria-label to name the root group. Keep meaningful labels for each step: the default triggers are buttons linked to their titles and descriptions. The keyboard focus ring surrounds the indicator. Tab reaches available triggers; arrow keys move focus along the orientation, and Enter or Space activates the focused step.',
    },
    {
      title: 'Custom content',
      description:
        'Root HTML and ARIA attributes are forwarded to StepperRoot. Preserve labels when replacing slots, and use native buttons with disabled states for content navigation, as shown in Custom slots. Keep custom slot content keyboard accessible; do not place interactive elements inside a trigger slot.',
    },
  ],
  api: {
    props: [
      {
        ...row(
          'modelValue',
          'number',
          'Active step, controlled with v-model. Without a value the active step is 1.',
        ),
        default: 'undefined (effective: 1)',
      },
      {
        ...row(
          'steps',
          'StepperStep[]',
          'Ordered steps; use unique consecutive values starting at 1 for Reka navigation.',
        ),
        typeLink: '#stepper-step',
        default: '[]',
      },
      {
        ...row('orientation', "'horizontal' | 'vertical'", 'Layout and keyboard arrow direction.'),
        default: "'horizontal'",
      },
      {
        ...row(
          'size',
          stepperSizes.map((size) => `'${size}'`).join(' | '),
          'Controls indicators, icons, numbers, label and description typography, spacing, separator alignment, and content indentation.',
        ),
        default: `'${stepperDefaults.size}'`,
      },
      {
        ...row(
          'disabled',
          'boolean',
          'Disables all step triggers and slot navigation helpers. External modelValue updates remain supported.',
        ),
        default: 'false',
      },
      {
        ...row('linear', 'boolean', 'Restricts forward navigation to the next step.'),
        default: 'true',
      },
      {
        ...row(
          'color',
          'string',
          'Theme token (primary, neutral, secondary, warning, success, error) or custom CSS color for active/completed indicators and focus rings.',
        ),
        default: "'primary'",
      },
      {
        ...row(
          'ui',
          '{\n  list?: (context: StepperContext) => HTMLAttributes\n  item?: (context: StepperItemContext) => HTMLAttributes\n  trigger?: (context: StepperItemContext) => HTMLAttributes\n  indicator?: (context: StepperItemContext) => HTMLAttributes\n  wrapper?: (context: StepperItemContext) => HTMLAttributes\n  label?: (context: StepperItemContext) => HTMLAttributes\n  description?: (context: StepperItemContext) => HTMLAttributes\n  separator?: (context: StepperItemContext) => HTMLAttributes\n  content?: (context: StepperItemContext) => HTMLAttributes\n}',
          'HTML attribute resolvers for each node. Classes and styles merge with the built-in styles.',
        ),
        typePre: true,
        typeParts: [
          { text: '{\n' },
          { text: '  list?: (context: ' },
          { text: 'StepperContext', link: '#stepper-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '  item?: (context: ' },
          { text: 'StepperItemContext', link: '#stepper-item-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '  trigger?: (context: ' },
          { text: 'StepperItemContext', link: '#stepper-item-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '  indicator?: (context: ' },
          { text: 'StepperItemContext', link: '#stepper-item-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '  wrapper?: (context: ' },
          { text: 'StepperItemContext', link: '#stepper-item-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '  label?: (context: ' },
          { text: 'StepperItemContext', link: '#stepper-item-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '  description?: (context: ' },
          { text: 'StepperItemContext', link: '#stepper-item-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '  separator?: (context: ' },
          { text: 'StepperItemContext', link: '#stepper-item-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '  content?: (context: ' },
          { text: 'StepperItemContext', link: '#stepper-item-context' },
          { text: ') => HTMLAttributes\n' },
          { text: '}' },
        ],
        default: 'undefined',
      },
    ],
    emits: [
      row(
        'update:modelValue',
        '[value: number | undefined]',
        'Emitted when the active step changes.',
      ),
    ],
    slots: ['indicator', 'label', 'description', 'content'].flatMap((name) => [
      {
        ...row(
          name,
          'StepperItemContext',
          name === 'content'
            ? 'Content for the active step only.'
            : `Replaces the ${name} of each step.`,
        ),
        typeLink: '#stepper-item-context',
      },
      {
        ...row(
          `${name}-{slot}`,
          'StepperItemContext',
          `Step-specific ${name}; only available when the step defines item.slot and takes precedence over the general slot.`,
        ),
        typeLink: '#stepper-item-context',
      },
    ]),
    expose: [],
    configs: [
      {
        id: 'stepper-step',
        title: 'StepperStep',
        showDefault: false,
        rows: [
          { ...row('value', 'number', 'Unique step value starting at 1.'), required: true },
          row('disabled', 'boolean', 'Disables this step.'),
          row(
            'slot',
            'string | number',
            'Stable rendering key and suffix for step-specific slots. Without it, the step only uses the general slots.',
          ),
          row('label', 'string', 'Step title.'),
          row('description', 'string', 'Additional text below the title.'),
          {
            ...row(
              'icon',
              'IconName',
              'Icon name used instead of the step number. Without an icon, the number is always shown.',
            ),
            typeLink: '/components/icon#props',
          },
        ],
      },
      { id: 'stepper-context', title: 'StepperContext', showDefault: false, rows: contextRows },
      {
        id: 'stepper-item-context',
        title: 'StepperItemContext',
        showDefault: false,
        rows: [
          {
            ...row(
              '...StepperContext',
              'StepperContext',
              'Includes the navigation state and functions.',
            ),
            typeLink: '#stepper-context',
          },
          { ...row('item', 'StepperStep', 'Source step.'), typeLink: '#stepper-step' },
          row('index', 'number', 'Zero-based index in the steps array.'),
          row('completed', 'boolean', 'Whether item.value is lower than the current modelValue.'),
          row('active', 'boolean', 'Whether item.value matches the current modelValue.'),
          row('first', 'boolean', 'First item in the array.'),
          row('last', 'boolean', 'Last item in the array.'),
        ],
      },
    ],
  },
}
export default config
