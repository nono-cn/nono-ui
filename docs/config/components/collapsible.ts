import type { ComponentDocConfig } from '../component-docs'
import { collapsibleDefaults } from '@/components/ui/Collapsible'
import CollapsibleBasicExample from '../../components/examples/collapsible/CollapsibleBasicExample.vue'
import CollapsibleStateExample from '../../components/examples/collapsible/CollapsibleStateExample.vue'

const collapsibleConfig: ComponentDocConfig = {
  slug: 'collapsible',
  title: 'Collapsible',
  language: 'en',
  description: 'Show or hide one section with an accessible trigger.',
  importPath: '@nono-ui/components/ui/Collapsible',
  usage: [
    {
      title: 'Basic usage',
      description: 'Use the unstyled default with your own trigger element.',
      component: CollapsibleBasicExample,
    },
  ],
  examples: [
    {
      title: 'Controlled state',
      description: 'Bind the open state with v-model and toggle the disabled state.',
      component: CollapsibleStateExample,
    },
  ],
  accessibility: [
    {
      title: 'Trigger and content',
      description:
        'Use a button as the default slot so the trigger is focusable and has a clear accessible name. Reka UI supplies the expanded state and supports Enter and Space. Disabled triggers cannot be activated.',
      links: [
        {
          label: 'Read the Reka UI Collapsible accessibility guide',
          href: 'https://reka-ui.com/docs/components/collapsible#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'boolean',
        default: 'false',
        description: 'Whether content is open. Bind with v-model.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: String(collapsibleDefaults.disabled),
        description: 'Prevents the trigger from toggling the content.',
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: String(collapsibleDefaults.unmountOnHide),
        description: 'Unmounts content while the collapsible is closed when true.',
      },
      {
        name: 'ui',
        type: `{
  content?: (context: CollapsibleContext) => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolver for content attributes based on the current open state.',
      },
    ],
    configs: [
      {
        id: 'collapsible-context',
        title: 'CollapsibleContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to both slots and UI resolvers.',
        rows: [
          {
            name: 'open',
            type: 'boolean',
            description: 'Whether the content is currently open.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: boolean]',
        description: 'Emitted when the trigger changes the open state.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: 'CollapsibleContext',
        typeLink: '#collapsible-context',
        description: 'Trigger element. Provide one focusable element, such as a button.',
      },
      {
        name: 'content',
        type: 'CollapsibleContext',
        typeLink: '#collapsible-context',
        description: 'Content shown when open; omitted entirely if the slot is absent.',
      },
    ],
    expose: [],
  },
}

export default collapsibleConfig
