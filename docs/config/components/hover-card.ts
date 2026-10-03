import type { ComponentDocConfig } from '../component-docs'
import { hoverCardDefaults } from '@/components/ui/HoverCard'
import HoverCardBasicExample from '../../components/examples/hover-card/HoverCardBasicExample.vue'
import HoverCardContentExample from '../../components/examples/hover-card/HoverCardContentExample.vue'
import HoverCardArrowExample from '../../components/examples/hover-card/HoverCardArrowExample.vue'
import HoverCardControlledExample from '../../components/examples/hover-card/HoverCardControlledExample.vue'

const hoverCardConfig: ComponentDocConfig = {
  slug: 'hover-card',
  title: 'HoverCard',
  language: 'en',
  description: 'Shows contextual information when a trigger is hovered or focused.',
  importPath: '@nono-ui/components/ui/HoverCard',
  usage: [
    {
      title: 'Basic usage',
      description: 'Preview a profile from a linked name.',
      component: HoverCardBasicExample,
    },
  ],
  examples: [
    {
      title: 'Content position',
      description: 'Choose a side and offset for the card.',
      component: HoverCardContentExample,
    },
    {
      title: 'Arrow',
      description: 'Show and customize the arrow.',
      component: HoverCardArrowExample,
    },
    {
      title: 'Controlled state',
      description: 'Control the card through v-model:open.',
      component: HoverCardControlledExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible trigger',
      description:
        'Use a focusable trigger with a clear accessible name. Keep essential information available outside the hover card, since touch and keyboard interactions may differ from pointer hover.',
      links: [
        {
          label: 'Reka UI HoverCard documentation',
          href: 'https://reka-ui.com/docs/components/hover-card',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        description: 'Open state; supports v-model:open.',
      },
      {
        name: 'openDelay',
        type: 'number',
        default: String(hoverCardDefaults.openDelay),
        description: 'Delay in milliseconds before opening on hover.',
      },
      {
        name: 'closeDelay',
        type: 'number',
        default: String(hoverCardDefaults.closeDelay),
        description: 'Delay in milliseconds before closing.',
      },
      {
        name: 'enableTouch',
        type: 'boolean',
        default: 'undefined',
        description: 'Enables touch interaction on the Reka HoverCard root.',
      },
      {
        name: 'content',
        type: 'HoverCardContentConfig',
        default: 'undefined',
        description: 'Content positioning, attributes, and outside interaction callbacks.',
      },
      {
        name: 'arrow',
        type: 'HoverCardArrowConfig',
        default: 'undefined',
        description: 'Arrow size, shape, and attributes.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: String(hoverCardDefaults.showArrow),
        description: 'Renders the default arrow when content is present.',
      },
    ],
    configs: [
      {
        id: 'hover-card-context',
        title: 'HoverCardContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to both slots.',
        rows: [
          { name: 'open', type: 'boolean', description: 'Current open state.' },
          { name: 'close', type: '() => void', description: 'Closes the card.' },
        ],
      },
    ],
    emits: [
      {
        name: 'update:open',
        type: '[value: boolean]',
        description: 'Emitted when the open state changes.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: 'HoverCardContext',
        typeLink: '#hover-card-context',
        description: 'Trigger element.',
      },
      {
        name: 'content',
        type: 'HoverCardContext',
        typeLink: '#hover-card-context',
        description: 'Card content.',
      },
    ],
    expose: [],
  },
}

export default hoverCardConfig
