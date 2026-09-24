import type { ComponentDocConfig } from '../component-docs'
import TooltipArrowExample from '../../components/examples/tooltip/TooltipArrowExample.vue'
import TooltipBasicExample from '../../components/examples/tooltip/TooltipBasicExample.vue'
import TooltipContentExample from '../../components/examples/tooltip/TooltipContentExample.vue'
import TooltipDelayExample from '../../components/examples/tooltip/TooltipDelayExample.vue'
import TooltipDisabledExample from '../../components/examples/tooltip/TooltipDisabledExample.vue'

const tooltipConfig: ComponentDocConfig = {
  slug: 'tooltip',
  title: 'Tooltip',
  language: 'en',
  description: 'Displays a short hint when its trigger receives keyboard focus or hover.',
  importPath: '@nono-ui/components/ui/Tooltip',
  usage: [
    {
      title: 'Basic tooltip',
      description: 'Show a short hint for a trigger.',
      component: TooltipBasicExample,
    },
  ],
  examples: [
    {
      title: 'Delay',
      description: 'Set how long to wait before the tooltip opens.',
      component: TooltipDelayExample,
    },
    {
      title: 'Content',
      description: 'Configure content placement and alignment.',
      component: TooltipContentExample,
    },
    {
      title: 'Disabled',
      description: 'Configure hoverable content, trigger activation, and the disabled state.',
      component: TooltipDisabledExample,
    },
    {
      title: 'Arrow',
      description: 'Show and configure an optional arrow.',
      component: TooltipArrowExample,
    },
  ],
  accessibility: [
    {
      title: 'Keyboard and disabled triggers',
      description:
        'Give the trigger an accessible name. Reka opens the tooltip on focus or hover and closes it on Escape. To show a tooltip for a disabled button, put it inside a focusable span and set pointer-events to none on the button.',
      links: [
        {
          label: 'See the Reka UI Tooltip accessibility guide',
          href: 'https://www.reka-ui.com/docs/components/tooltip#accessibility',
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
        description: 'Controls whether the tooltip is open. Use with v-model:open.',
      },
      {
        name: 'delayDuration',
        type: 'number',
        default: '0',
        description: 'Milliseconds to wait before opening the tooltip.',
      },
      {
        name: 'disableHoverableContent',
        type: 'boolean',
        default: 'undefined',
        description: 'Prevents the tooltip from staying open while its content is hovered.',
      },
      {
        name: 'disableClosingTrigger',
        type: 'boolean',
        default: 'false',
        description: 'Keeps the tooltip open when its trigger is activated.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the tooltip.',
      },
      {
        name: 'ignoreNonKeyboardFocus',
        type: 'boolean',
        default: 'false',
        description: 'Opens on focus only when the focus is keyboard-visible.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: 'false',
        description: 'Renders the arrow configured through arrow.',
      },
      {
        name: 'content',
        type: 'TooltipContentConfig',
        default: 'undefined',
        description:
          'Grouped configuration of TooltipContent props, callbacks, and HTML attributes.',
      },
      {
        name: 'arrow',
        type: 'TooltipArrowConfig',
        default: 'undefined',
        description: 'Grouped configuration of TooltipArrow dimensions and HTML attributes.',
      },
    ],
    configs: [
      {
        id: 'tooltip-context',
        title: 'TooltipContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Shared context received by the default and content slots.',
        rows: [
          { name: 'open', type: 'boolean', description: 'Indicates whether the tooltip is open.' },
          {
            name: 'close',
            type: '() => void',
            description: 'Closes the tooltip programmatically.',
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
    ],
    slots: [
      {
        name: 'default',
        type: 'TooltipContext',
        typeLink: '#tooltip-context',
        description: 'Trigger. Receives open and close.',
      },
      {
        name: 'content',
        type: 'TooltipContext',
        typeLink: '#tooltip-context',
        description: 'Tooltip body. Receives open and close.',
      },
    ],
    expose: [],
  },
}

export default tooltipConfig
