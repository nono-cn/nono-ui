import type { ComponentDocConfig } from '../component-docs'
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
      title: 'Vertical',
      description: 'Changes the orientation when actions need to be stacked.',
      component: ButtonGroupVerticalExample,
    },
    {
      title: 'Size',
      description: 'Applies a shared size to every button in the group.',
      component: ButtonGroupSizesExample,
    },
  ],
  accessibility: [
    {
      title: 'Action group',
      description:
        'ButtonGroup adds role="group" to its root element. Give each button a clear accessible label and keep actions in a logical order.',
    },
  ],
  api: {
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Direction in which the buttons are arranged.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Size applied to descendant buttons.',
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
