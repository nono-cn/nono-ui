import type { ComponentDocConfig } from '../component-docs'
import { switchDefaults, switchSizes } from '@/components/ui/Switch'
import SwitchBasicExample from '../../components/examples/switch/SwitchBasicExample.vue'
import SwitchValuesExample from '../../components/examples/switch/SwitchValuesExample.vue'
import SwitchSizeExample from '../../components/examples/switch/SwitchSizeExample.vue'
import SwitchAppearanceExample from '../../components/examples/switch/SwitchAppearanceExample.vue'
import SwitchIconsExample from '../../components/examples/switch/SwitchIconsExample.vue'
import SwitchUiExample from '../../components/examples/switch/SwitchUiExample.vue'

const switchConfig: ComponentDocConfig = {
  slug: 'switch',
  title: 'Switch',
  language: 'en',
  description: 'Accessible on/off control with custom values, appearance, and icons.',
  importPath: '@nono-ui/components/ui/Switch',
  usage: [
    { title: 'Basic usage', description: 'Toggle a boolean value.', component: SwitchBasicExample },
  ],
  examples: [
    {
      title: 'Custom values',
      description: 'Use custom values for the two states.',
      component: SwitchValuesExample,
    },
    {
      title: 'Size',
      description: 'Choose the size of the track and thumb.',
      component: SwitchSizeExample,
    },
    {
      title: 'Appearance',
      description: 'Choose a theme color or a custom CSS color.',
      component: SwitchAppearanceExample,
    },
    {
      title: 'Icons',
      description: 'Choose an icon name for each state.',
      component: SwitchIconsExample,
    },
    {
      title: 'UI',
      description: 'Customize the thumb from its current state.',
      component: SwitchUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible name',
      description:
        'Associate the switch with a visible label or provide aria-label or aria-labelledby. HTML and ARIA attributes are forwarded to the root button.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'boolean | number | string',
        default: String(switchDefaults.falseValue),
        description: 'Current value; updated with v-model.',
      },
      {
        name: 'trueValue',
        type: 'boolean | number | string',
        default: String(switchDefaults.trueValue),
        description: 'Value representing the on state.',
      },
      {
        name: 'falseValue',
        type: 'boolean | number | string',
        default: String(switchDefaults.falseValue),
        description: 'Value representing the off state.',
      },
      {
        name: 'size',
        type: switchSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${switchDefaults.size}'`,
        description: 'Visual size of the track and thumb.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${switchDefaults.color}'`,
        description: 'Theme token or CSS color for the on and focus states.',
      },
      {
        name: 'checkedIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: String(switchDefaults.checkedIcon),
        description: 'Icon name shown in the on state.',
      },
      {
        name: 'uncheckedIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: String(switchDefaults.uncheckedIcon),
        description: 'Icon name shown in the off state.',
      },
      {
        name: 'ui',
        type: '{ thumb?: (context: SwitchContext) => HTMLAttributes }',
        typeParts: [
          { text: '{ thumb?: (context: ' },
          { text: 'SwitchContext', link: '/components/switch#switch-context' },
          { text: ') => HTMLAttributes }' },
        ],
        typePre: true,
        default: String(switchDefaults.ui),
        description: 'Resolver for thumb attributes, classes, styles, and ARIA.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
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
        rows: [{ name: 'state', type: 'boolean', description: 'Whether the switch is on.' }],
      },
    ],
    expose: [],
  },
}

export default switchConfig
