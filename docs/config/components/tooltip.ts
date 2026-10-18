import type { ComponentDocConfig } from '../component-docs'
import { tooltipDefaults } from '@/components/ui/Tooltip'
import { formatDefaultObject } from '../format-default'
import TooltipBasicExample from '../../components/examples/tooltip/TooltipBasicExample.vue'
import TooltipContentSlotExample from '../../components/examples/tooltip/TooltipContentSlotExample.vue'
import TooltipContentExample from '../../components/examples/tooltip/TooltipContentExample.vue'
import TooltipArrowExample from '../../components/examples/tooltip/TooltipArrowExample.vue'
import TooltipDelayExample from '../../components/examples/tooltip/TooltipDelayExample.vue'

const tooltipConfig: ComponentDocConfig = {
  slug: 'tooltip',
  title: 'Tooltip',
  language: 'en',
  description: 'Shows a short hint when a trigger is hovered or focused.',
  importPath: '@nono-ui/components/ui/Tooltip',
  usage: [
    {
      title: 'Basic usage',
      description: 'Describe a button with a short hint.',
      component: TooltipBasicExample,
    },
  ],
  examples: [
    {
      title: 'Content slot',
      description: 'Render rich content such as a keyboard shortcut.',
      component: TooltipContentSlotExample,
    },
    {
      title: 'Content position',
      description: 'Choose a side, alignment, and offset for the content.',
      component: TooltipContentExample,
    },
    {
      title: 'Arrow',
      description: 'Show or hide the arrow and customize its size.',
      component: TooltipArrowExample,
    },
    {
      title: 'Delay',
      description: 'Wait before opening on hover.',
      component: TooltipDelayExample,
    },
  ],
  accessibility: [
    {
      title: 'Focusable trigger',
      description:
        'Use a focusable trigger such as a button. The tooltip opens on hover and keyboard focus, closes on Escape, and is announced through role="tooltip". Keep tooltip content short and non-interactive, and do not rely on it for essential information.',
      links: [
        {
          label: 'See the Reka UI Tooltip accessibility guide',
          href: 'https://reka-ui.com/docs/components/tooltip#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: String(tooltipDefaults.open),
        description: 'Open state; supports v-model:open.',
      },
      {
        name: 'text',
        type: 'string',
        default: String(tooltipDefaults.text),
        description: 'Plain text content, used when the content slot is not provided.',
      },
      {
        name: 'delayDuration',
        type: 'number',
        default: String(tooltipDefaults.delayDuration),
        description: 'Delay in milliseconds before opening on hover.',
      },
      {
        name: 'disableHoverableContent',
        type: 'boolean',
        default: String(tooltipDefaults.disableHoverableContent),
        description:
          'Closes the tooltip when the pointer leaves the trigger, even over the content.',
      },
      {
        name: 'disableClosingTrigger',
        type: 'boolean',
        default: String(tooltipDefaults.disableClosingTrigger),
        description: 'Keeps the tooltip open when the trigger is clicked.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: String(tooltipDefaults.disabled),
        description: 'Prevents the tooltip from opening.',
      },
      {
        name: 'ignoreNonKeyboardFocus',
        type: 'boolean',
        default: String(tooltipDefaults.ignoreNonKeyboardFocus),
        description: 'Opens on focus only when it comes from the keyboard.',
      },
      {
        name: 'content',
        type: 'TooltipContentConfig',
        default: formatDefaultObject(tooltipDefaults.content),
        description: 'Grouped TooltipContent props, event callbacks, and HTML attributes.',
      },
      {
        name: 'arrow',
        type: 'TooltipArrowConfig',
        default: formatDefaultObject(tooltipDefaults.arrow),
        description: 'Arrow size and attributes.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: String(tooltipDefaults.showArrow),
        description: 'Renders the arrow when content is present.',
      },
    ],
    configs: [
      {
        id: 'tooltip-context',
        title: 'TooltipContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to both slots.',
        rows: [
          { name: 'open', type: 'boolean', description: 'Current open state.' },
          { name: 'close', type: '() => void', description: 'Closes the tooltip.' },
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
        type: 'TooltipContext',
        typeLink: '#tooltip-context',
        description: 'Trigger element. Receives open and close.',
      },
      {
        name: 'content',
        type: 'TooltipContext',
        typeLink: '#tooltip-context',
        description: 'Tooltip content. Overrides text. Receives open and close.',
      },
    ],
    expose: [],
  },
}

export default tooltipConfig
