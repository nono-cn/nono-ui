import type { ComponentDocConfig } from '../component-docs'
import KbdGroupExample from '../../components/examples/kbd/KbdGroupExample.vue'

const kbdGroupConfig: ComponentDocConfig = {
  slug: 'kbd-group',
  title: 'KbdGroup',
  language: 'en',
  description: 'Groups keys into a keyboard shortcut.',
  importPath: '@nono-ui/components/ui/Kbd',
  usage: [
    {
      title: 'Keyboard shortcut',
      description: 'Combine keys and separators into one visible shortcut.',
      component: KbdGroupExample,
    },
  ],
  examples: [],
  accessibility: [
    {
      title: 'Shortcut names',
      description:
        'KbdGroup renders a kbd element and forwards HTML and ARIA attributes to it. Keep each key visible and provide a readable name or nearby text for the complete shortcut.',
    },
  ],
  api: {
    props: [],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Keys and separators displayed in the group.',
      },
    ],
    expose: [],
  },
}

export default kbdGroupConfig
