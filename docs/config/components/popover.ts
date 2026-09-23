import type { ComponentDocConfig } from '../component-docs'
import PopoverBasicExample from '../../components/examples/popover/PopoverBasicExample.vue'
import PopoverContentExample from '../../components/examples/popover/PopoverContentExample.vue'
import PopoverArrowExample from '../../components/examples/popover/PopoverArrowExample.vue'
import PopoverControlledExample from '../../components/examples/popover/PopoverControlledExample.vue'

const popoverConfig: ComponentDocConfig = {
  slug: 'popover',
  title: 'Popover',
  language: 'en',
  description: 'Displays contextual content related to a trigger element.',
  importPath: '@nono-ui/components/ui/Popover',
  usage: [
    {
      title: 'Basic popover',
      description: 'Open contextual content from a trigger button.',
      component: PopoverBasicExample,
    },
  ],
  examples: [
    {
      title: 'Content',
      description: 'Configure the content position, offsets, and collision behavior.',
      component: PopoverContentExample,
    },
    {
      title: 'Arrow',
      description: 'Customize the arrow’s size and shape.',
      component: PopoverArrowExample,
    },
    {
      title: 'Controlled state',
      description: 'Control the open state from the parent component.',
      component: PopoverControlledExample,
    },
  ],
  accessibility: [
    {
      title: 'Triggers and keyboard',
      description:
        'Use an interactive element with a clear accessible name (aria-label / aria-labelledby) as the trigger. The content manages focus and can be dismissed with Escape.',
      links: [
        {
          label: 'See the Reka UI Popover accessibility guide',
          href: 'https://www.reka-ui.com/docs/components/popover#accessibility',
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
        description: 'Controls whether the popover is open. Use with v-model:open.',
      },
      {
        name: 'modal',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction with content outside the popover while it is open.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: 'false',
        description: 'Displays the arrow configured through arrow.',
      },
      {
        name: 'content',
        type: 'PopoverContentConfig',
        default: 'undefined',
        description: 'Grouped configuration of PopoverContent props, callbacks, and attributes.',
      },
      {
        name: 'arrow',
        type: 'PopoverArrowConfig',
        default: 'undefined',
        description: 'Grouped configuration of PopoverArrow props and attributes.',
      },
    ],
    configs: [
      {
        id: 'popover-context',
        title: 'PopoverContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Shared context received by the default and content slots.',
        rows: [
          { name: 'open', type: 'boolean', description: 'Indicates whether the popover is open.' },
          {
            name: 'close',
            type: '() => void',
            description: 'Closes the popover programmatically.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:open',
        type: '[value: boolean]',
        description: 'Emitted when the open state changes.',
      },
      { name: 'show', type: '[]', description: 'Emitted when the popover opens.' },
      { name: 'close', type: '[]', description: 'Emitted when the popover closes.' },
    ],
    slots: [
      {
        name: 'default',
        type: 'PopoverContext',
        typeLink: '#popover-context',
        description: 'Trigger. Receives open and close.',
      },
      {
        name: 'content',
        type: 'PopoverContext',
        typeLink: '#popover-context',
        description: 'Contextual content. Receives open and close.',
      },
    ],
    expose: [],
  },
}

export default popoverConfig
