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
      title: 'Roles and attributes',
      description:
        'KbdGroup renders a kbd element that wraps each key, which is how HTML marks a key combination. It forwards HTML and ARIA attributes to that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['kbd', 'Root', 'Marks the whole combination as keyboard input.'],
          ['kbd', 'Each key', 'Marks each key inside the combination.'],
        ],
      },
    },
    {
      title: 'Readable shortcuts',
      description:
        'Keep each key visible, and provide a readable name or nearby text for the complete shortcut, such as "Control K".',
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
