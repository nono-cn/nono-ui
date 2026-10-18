import type { ComponentDocConfig } from '../component-docs'
import { popoverDefaults } from '@/components/ui/Popover'
import { formatDefaultObject } from '../format-default'
import PopoverBasicExample from '../../components/examples/popover/PopoverBasicExample.vue'
import PopoverContentExample from '../../components/examples/popover/PopoverContentExample.vue'
import PopoverArrowExample from '../../components/examples/popover/PopoverArrowExample.vue'
import PopoverControlledExample from '../../components/examples/popover/PopoverControlledExample.vue'

const popoverConfig: ComponentDocConfig = {
  slug: 'popover',
  title: 'Popover',
  language: 'en',
  description: 'Displays rich content in a portal, triggered by a button.',
  importPath: '@nono-ui/components/ui/Popover',
  usage: [
    {
      title: 'Basic usage',
      description: 'Open a popover from a button and close it from the content slot.',
      component: PopoverBasicExample,
    },
  ],
  examples: [
    {
      title: 'Content position',
      description: 'Choose a side, alignment, and offset for the content.',
      component: PopoverContentExample,
    },
    {
      title: 'Arrow',
      description: 'Show and customize the arrow.',
      component: PopoverArrowExample,
    },
    {
      title: 'Controlled state',
      description: 'Control the popover through v-model:open.',
      component: PopoverControlledExample,
    },
  ],
  accessibility: [
    {
      title: 'Focus and dismissal',
      description:
        'Use a focusable trigger such as a button. Focus moves into the content when it opens and returns to the trigger when it closes. Escape and outside interactions dismiss the popover. Set modal to true to trap focus and block interaction with the rest of the page.',
      links: [
        {
          label: 'See the Reka UI Popover accessibility guide',
          href: 'https://reka-ui.com/docs/components/popover#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: String(popoverDefaults.open),
        description: 'Open state; supports v-model:open.',
      },
      {
        name: 'modal',
        type: 'boolean',
        default: String(popoverDefaults.modal),
        description:
          'Traps focus and disables interaction outside the content while the popover is open.',
      },
      {
        name: 'content',
        type: 'PopoverContentConfig',
        default: formatDefaultObject(popoverDefaults.content),
        description: 'Grouped PopoverContent props, event callbacks, and HTML attributes.',
      },
      {
        name: 'arrow',
        type: 'PopoverArrowConfig',
        default: formatDefaultObject(popoverDefaults.arrow),
        description: 'Arrow size, shape, and attributes.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: String(popoverDefaults.showArrow),
        description: 'Renders the arrow when content is present.',
      },
    ],
    configs: [
      {
        id: 'popover-context',
        title: 'PopoverContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to both slots.',
        rows: [
          { name: 'open', type: 'boolean', description: 'Current open state.' },
          { name: 'close', type: '() => void', description: 'Closes the popover.' },
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
        type: 'PopoverContext',
        typeLink: '#popover-context',
        description: 'Trigger element. Receives open and close.',
      },
      {
        name: 'content',
        type: 'PopoverContext',
        typeLink: '#popover-context',
        description: 'Popover content. Receives open and close.',
      },
    ],
    expose: [],
  },
}

export default popoverConfig
