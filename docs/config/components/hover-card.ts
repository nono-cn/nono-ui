import type { ComponentDocConfig } from '../component-docs'
import { hoverCardDefaults } from '@/components/ui/HoverCard'
import { formatDefaultObject, formatValue } from '../format-default'
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
        default: String(hoverCardDefaults.open),
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
        default: String(hoverCardDefaults.enableTouch),
        description: 'Enables touch interaction on the Reka HoverCard root.',
      },
      {
        name: 'content',
        type: 'HoverCardContentConfig',
        typeLink: '#hover-card-content-config',
        default: formatDefaultObject(hoverCardDefaults.content),
        description: 'Content positioning, attributes, and outside interaction callbacks.',
      },
      {
        name: 'arrow',
        type: 'HoverCardArrowConfig',
        typeLink: '#hover-card-arrow-config',
        default: formatDefaultObject(hoverCardDefaults.arrow),
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
        id: 'hover-card-content-config',
        title: 'HoverCardContentConfig',
        description:
          'Combines the listed Reka UI content props and event callbacks with HTML attributes such as id, class, style, and ARIA attributes.',
        rows: [
          {
            name: 'as',
            type: 'AsTag | Component',
            default: formatValue(hoverCardDefaults.content.as),
            description: 'Element or component the content renders as.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.asChild),
            description: 'Renders the child element instead, merging props and behavior.',
          },
          {
            name: 'side',
            type: "'top' | 'right' | 'bottom' | 'left'",
            default: formatValue(hoverCardDefaults.content.side),
            description: 'Preferred side of the trigger to render against.',
          },
          {
            name: 'sideOffset',
            type: 'number',
            default: formatValue(hoverCardDefaults.content.sideOffset),
            description: 'Distance in pixels from the trigger.',
          },
          {
            name: 'sideFlip',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.sideFlip),
            description: 'Flips to the opposite side when colliding with the boundary.',
          },
          {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            default: formatValue(hoverCardDefaults.content.align),
            description: 'Preferred alignment against the trigger.',
          },
          {
            name: 'alignOffset',
            type: 'number',
            default: formatValue(hoverCardDefaults.content.alignOffset),
            description: 'Offset in pixels from the start or end alignment.',
          },
          {
            name: 'alignFlip',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.alignFlip),
            description: 'Flips alignment when colliding with the boundary.',
          },
          {
            name: 'avoidCollisions',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.avoidCollisions),
            description: 'Changes side and alignment to prevent collisions with the boundary.',
          },
          {
            name: 'collisionBoundary',
            type: 'Element | null | Array<Element | null>',
            default: formatValue(hoverCardDefaults.content.collisionBoundary),
            description: 'Elements used as the collision boundary. Defaults to the viewport.',
          },
          {
            name: 'collisionPadding',
            type: 'number | Partial<Record<Side, number>>',
            default: formatValue(hoverCardDefaults.content.collisionPadding),
            description:
              'Distance in pixels from the boundary edges where collision detection occurs.',
          },
          {
            name: 'arrowPadding',
            type: 'number',
            default: formatValue(hoverCardDefaults.content.arrowPadding),
            description: 'Padding between the arrow and the content edges.',
          },
          {
            name: 'hideShiftedArrow',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.hideShiftedArrow),
            description: 'Hides the arrow when it cannot stay centered on the trigger.',
          },
          {
            name: 'sticky',
            type: "'partial' | 'always'",
            default: formatValue(hoverCardDefaults.content.sticky),
            description: 'Sticky behavior on the align axis when the trigger leaves the boundary.',
          },
          {
            name: 'hideWhenDetached',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.hideWhenDetached),
            description: 'Hides the content when the trigger is fully occluded.',
          },
          {
            name: 'positionStrategy',
            type: "'absolute' | 'fixed'",
            default: formatValue(hoverCardDefaults.content.positionStrategy),
            description: 'CSS position strategy used for the content.',
          },
          {
            name: 'updatePositionStrategy',
            type: "'optimized' | 'always'",
            default: formatValue(hoverCardDefaults.content.updatePositionStrategy),
            description: 'Whether to update the position on every animation frame.',
          },
          {
            name: 'disableUpdateOnLayoutShift',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.disableUpdateOnLayoutShift),
            description: 'Skips position updates when the layout shifts.',
          },
          {
            name: 'prioritizePosition',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.prioritizePosition),
            description: 'Keeps the content in the viewport even if it overlaps the trigger.',
          },
          {
            name: 'forceMount',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.content.forceMount),
            description: 'Keeps the content mounted for custom presence and animation handling.',
          },
          {
            name: 'onEscapeKeyDown',
            type: '(event: KeyboardEvent) => void',
            default: 'undefined',
            description: 'Handles Escape before the content closes.',
          },
          {
            name: 'onPointerDownOutside',
            type: '(event: PointerDownOutsideEvent) => void',
            default: 'undefined',
            description: 'Handles a pointer interaction outside the content.',
          },
          {
            name: 'onFocusOutside',
            type: '(event: FocusOutsideEvent) => void',
            default: 'undefined',
            description: 'Handles focus moving outside the content.',
          },
          {
            name: 'onInteractOutside',
            type: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void',
            default: 'undefined',
            description: 'Handles pointer or focus interaction outside the content.',
          },
        ],
      },
      {
        id: 'hover-card-arrow-config',
        title: 'HoverCardArrowConfig',
        description:
          'Combines the listed Reka UI arrow props with HTML attributes such as class and style.',
        rows: [
          {
            name: 'as',
            type: 'AsTag | Component',
            default: formatValue(hoverCardDefaults.arrow.as),
            description: 'Element or component the arrow renders as.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.arrow.asChild),
            description: 'Renders the child element instead of the default arrow.',
          },
          {
            name: 'width',
            type: 'number',
            default: formatValue(hoverCardDefaults.arrow.width),
            description: 'Arrow width in pixels.',
          },
          {
            name: 'height',
            type: 'number',
            default: formatValue(hoverCardDefaults.arrow.height),
            description: 'Arrow height in pixels.',
          },
          {
            name: 'rounded',
            type: 'boolean',
            default: formatValue(hoverCardDefaults.arrow.rounded),
            description: 'Renders a rounded arrow tip.',
          },
        ],
      },
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
