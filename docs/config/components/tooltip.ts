import type { ComponentDocConfig } from '../component-docs'
import { tooltipDefaults } from '@/components/ui/Tooltip'
import { formatDefaultObject, formatValue } from '../format-default'
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
        typeLink: '#tooltip-content-config',
        default: formatDefaultObject(tooltipDefaults.content),
        description: 'Grouped TooltipContent props and event callbacks.',
      },
      {
        name: 'arrow',
        type: 'TooltipArrowConfig',
        typeLink: '#tooltip-arrow-config',
        default: formatDefaultObject(tooltipDefaults.arrow),
        description: 'Arrow size.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: String(tooltipDefaults.showArrow),
        description: 'Renders the arrow when content is present.',
      },
      {
        name: 'ui',
        type: `{
  content?: (context: TooltipContext) => HTMLAttributes
  arrow?: (context: TooltipContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  content?: (context: ' },
          { text: 'TooltipContext', link: '#tooltip-context' },
          { text: ') => HTMLAttributes\n  arrow?: (context: ' },
          { text: 'TooltipContext', link: '#tooltip-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: String(tooltipDefaults.ui),
        description:
          'Resolvers for attributes and classes on the content and the arrow. Each receives TooltipContext. Use content.ariaLabel for the accessible label; an aria-label set here is ignored.',
      },
    ],
    configs: [
      {
        id: 'tooltip-content-config',
        title: 'TooltipContentConfig',
        description:
          'Reka UI content props and event callbacks. Set HTML attributes such as class and style through ui.content.',
        rows: [
          {
            name: 'as',
            type: 'AsTag | Component',
            default: formatValue(tooltipDefaults.content.as),
            description: 'Element or component the content renders as.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: formatValue(tooltipDefaults.content.asChild),
            description: 'Renders the child element instead, merging props and behavior.',
          },
          {
            name: 'side',
            type: "'top' | 'right' | 'bottom' | 'left'",
            default: formatValue(tooltipDefaults.content.side),
            description: 'Preferred side of the trigger to render against.',
          },
          {
            name: 'sideOffset',
            type: 'number',
            default: formatValue(tooltipDefaults.content.sideOffset),
            description: 'Distance in pixels from the trigger.',
          },
          {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            default: formatValue(tooltipDefaults.content.align),
            description: 'Preferred alignment against the trigger.',
          },
          {
            name: 'alignOffset',
            type: 'number',
            default: formatValue(tooltipDefaults.content.alignOffset),
            description: 'Offset in pixels from the start or end alignment.',
          },
          {
            name: 'avoidCollisions',
            type: 'boolean',
            default: formatValue(tooltipDefaults.content.avoidCollisions),
            description: 'Changes side and alignment to prevent collisions with the boundary.',
          },
          {
            name: 'collisionBoundary',
            type: 'Element | null | Array<Element | null>',
            default: formatValue(tooltipDefaults.content.collisionBoundary),
            description: 'Elements used as the collision boundary. Defaults to the viewport.',
          },
          {
            name: 'collisionPadding',
            type: 'number | Partial<Record<Side, number>>',
            default: formatValue(tooltipDefaults.content.collisionPadding),
            description:
              'Distance in pixels from the boundary edges where collision detection occurs.',
          },
          {
            name: 'arrowPadding',
            type: 'number',
            default: formatValue(tooltipDefaults.content.arrowPadding),
            description: 'Padding between the arrow and the content edges.',
          },
          {
            name: 'sticky',
            type: "'partial' | 'always'",
            default: formatValue(tooltipDefaults.content.sticky),
            description: 'Sticky behavior on the align axis when the trigger leaves the boundary.',
          },
          {
            name: 'hideWhenDetached',
            type: 'boolean',
            default: formatValue(tooltipDefaults.content.hideWhenDetached),
            description: 'Hides the content when the trigger is fully occluded.',
          },
          {
            name: 'positionStrategy',
            type: "'absolute' | 'fixed'",
            default: formatValue(tooltipDefaults.content.positionStrategy),
            description: 'CSS position strategy used for the content.',
          },
          {
            name: 'updatePositionStrategy',
            type: "'optimized' | 'always'",
            default: formatValue(tooltipDefaults.content.updatePositionStrategy),
            description: 'Whether to update the position on every animation frame.',
          },
          {
            name: 'ariaLabel',
            type: 'string',
            default: formatValue(tooltipDefaults.content.ariaLabel),
            description: 'Accessible label announced instead of the content.',
          },
          {
            name: 'forceMount',
            type: 'boolean',
            default: formatValue(tooltipDefaults.content.forceMount),
            description: 'Keeps the content mounted for custom presence and animation handling.',
          },
          {
            name: 'onEscapeKeyDown',
            type: '(event: KeyboardEvent) => void',
            default: 'undefined',
            description: 'Handles Escape before the tooltip closes.',
          },
          {
            name: 'onPointerDownOutside',
            type: '(event: Event) => void',
            default: 'undefined',
            description: 'Handles a pointer interaction outside the content.',
          },
        ],
      },
      {
        id: 'tooltip-arrow-config',
        title: 'TooltipArrowConfig',
        description:
          'Reka UI arrow props. Set HTML attributes such as class and style through ui.arrow.',
        rows: [
          {
            name: 'as',
            type: 'AsTag | Component',
            default: formatValue(tooltipDefaults.arrow.as),
            description: 'Element or component the arrow renders as.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: formatValue(tooltipDefaults.arrow.asChild),
            description: 'Renders the child element instead of the default arrow.',
          },
          {
            name: 'width',
            type: 'number',
            default: formatValue(tooltipDefaults.arrow.width),
            description: 'Arrow width in pixels.',
          },
          {
            name: 'height',
            type: 'number',
            default: formatValue(tooltipDefaults.arrow.height),
            description: 'Arrow height in pixels.',
          },
        ],
      },
      {
        id: 'tooltip-context',
        title: 'TooltipContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to both slots and the ui resolvers.',
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
