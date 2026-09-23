import type { ComponentDocConfig } from '../component-docs'
import SwitchBasicExample from '../../components/examples/switch/SwitchBasicExample.vue'
import SwitchValuesExample from '../../components/examples/switch/SwitchValuesExample.vue'
import SwitchSizesExample from '../../components/examples/switch/SwitchSizesExample.vue'
import SwitchSeverityExample from '../../components/examples/switch/SwitchSeverityExample.vue'
import SwitchColorExample from '../../components/examples/switch/SwitchColorExample.vue'
import SwitchIconsExample from '../../components/examples/switch/SwitchIconsExample.vue'

const switchConfig: ComponentDocConfig = {
  slug: 'switch',
  title: 'Switch',
  language: 'en',
  description: 'Interactive control for turning an option on or off.',
  importPath: '@nono-ui/components/ui/Switch',
  usage: [
    {
      title: 'Basic usage',
      description: 'Associate the control with a label and bind its state with v-model:value.',
      component: SwitchBasicExample,
    },
  ],
  examples: [
    {
      title: 'Custom values',
      description: 'Set trueValue and falseValue to use non-boolean values.',
      component: SwitchValuesExample,
    },
    {
      title: 'Size',
      description: 'Compare the five available sizes.',
      component: SwitchSizesExample,
    },
    {
      title: 'Severity',
      description: 'Choose a semantic color for the on state.',
      component: SwitchSeverityExample,
    },
    {
      title: 'Custom color',
      description: 'Use color to apply a custom CSS color that takes precedence over severity.',
      component: SwitchColorExample,
    },
    {
      title: 'Icons',
      description: 'Show different icons inside the thumb based on the state.',
      component: SwitchIconsExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible name',
      description:
        'Provide an associated visible label, or aria-label / aria-labelledby when the switch has no visible text. HTML and ARIA attributes are forwarded to the root button.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'boolean | number | string',
        default: 'false',
        description: 'Current value; updated through v-model:value.',
      },
      {
        name: 'trueValue',
        type: 'boolean | number | string',
        default: 'true',
        description: 'Value that represents the on state.',
      },
      {
        name: 'falseValue',
        type: 'boolean | number | string',
        default: 'false',
        description: 'Value that represents the off state.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Visual size of the switch and its thumb.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Semantic color of the on state.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color. Takes precedence over severity.',
      },
      {
        name: 'uncheckedIcon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Icon shown inside the thumb when the switch is off.',
      },
      {
        name: 'checkedIcon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Icon shown inside the thumb when the switch is on.',
      },
      {
        name: 'ui',
        type: `{
  thumb?: (context: SwitchContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  thumb?: (context: ' },
          { text: 'SwitchContext', link: '/components/switch#switch-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description: 'Resolver for customizing the thumb attributes and classes.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: boolean | number | string]',
        description: 'Emitted when the value changes.',
      },
    ],
    slots: [],
    configs: [
      {
        id: 'switch-context',
        title: 'SwitchContext',
        showDefault: false,
        rows: [
          {
            name: 'state',
            type: 'boolean',
            description: 'Indicates whether the switch is on.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default switchConfig
