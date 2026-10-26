import type { ComponentDocConfig } from '../component-docs'
import {
  buttonGroupDefaults,
  buttonGroupOrientations,
  buttonGroupSizes,
} from '@/components/ui/ButtonGroup'
import ButtonGroupBasicExample from '../../components/examples/button-group/ButtonGroupBasicExample.vue'
import ButtonGroupVerticalExample from '../../components/examples/button-group/ButtonGroupVerticalExample.vue'
import ButtonGroupSizesExample from '../../components/examples/button-group/ButtonGroupSizesExample.vue'

const buttonGroupConfig: ComponentDocConfig = {
  slug: 'button-group',
  title: 'ButtonGroup',
  language: 'en',
  description: 'Groups related buttons and applies a shared orientation and size.',
  importPath: '@nono-ui/components/ui/ButtonGroup',
  usage: [
    {
      title: 'Basic usage',
      description: 'Groups related actions into a single visual unit.',
      component: ButtonGroupBasicExample,
    },
  ],
  examples: [
    {
      title: 'Orientation',
      description: 'Choose a horizontal or vertical layout for the button group.',
      component: ButtonGroupVerticalExample,
    },
    {
      title: 'Size',
      description: 'Passes a shared size to buttons in the group.',
      component: ButtonGroupSizesExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Give the group a name with aria-label or aria-labelledby when its purpose is not clear from the buttons. Keep the actions in a logical order.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [['role="group"', 'Root', 'Groups the buttons so they are announced together.']],
      },
    },
    {
      title: 'Keyboard',
      description:
        'The group does not change keyboard behavior: each button is its own tab stop, in the order they appear.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Tab', 'Moves focus to the next button.'],
          ['Shift + Tab', 'Moves focus to the previous button.'],
          ['Space, Enter', 'Activates the focused button.'],
        ],
      },
    },
  ],
  api: {
    props: [
      {
        name: 'orientation',
        type: buttonGroupOrientations.map((orientation) => `'${orientation}'`).join(' | '),
        default: `'${buttonGroupDefaults.orientation}'`,
        description: 'Direction in which the buttons are arranged.',
      },
      {
        name: 'size',
        type: buttonGroupSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${buttonGroupDefaults.size}'`,
        description:
          'Default size provided to descendant Buttons; an explicit Button size takes priority.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Buttons and content rendered inside the group.',
      },
    ],
    expose: [],
  },
}

export default buttonGroupConfig
