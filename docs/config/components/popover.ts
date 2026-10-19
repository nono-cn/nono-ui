import type { ComponentDocConfig } from '../component-docs'
import { popoverDefaults } from '@/components/ui/Popover'
import { formatDefaultObject, formatValue } from '../format-default'
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
        typeLink: '#popover-content-config',
        default: formatDefaultObject(popoverDefaults.content),
        description: 'Grouped PopoverContent props, event callbacks, and HTML attributes.',
      },
      {
        name: 'arrow',
        type: 'PopoverArrowConfig',
        typeLink: '#popover-arrow-config',
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
        id: 'popover-content-config',
        title: 'PopoverContentConfig',
        description:
          'Combines the listed Reka UI content props and event callbacks with HTML attributes such as id, class, style, and ARIA attributes.',
        rows: [
          {
            name: 'as',
            type: 'AsTag | Component',
            default: formatValue(popoverDefaults.content.as),
            description: 'Element or component the content renders as.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.asChild),
            description: 'Renders the child element instead, merging props and behavior.',
          },
          {
            name: 'side',
            type: "'top' | 'right' | 'bottom' | 'left'",
            default: formatValue(popoverDefaults.content.side),
            description: 'Preferred side of the trigger to render against.',
          },
          {
            name: 'sideOffset',
            type: 'number',
            default: formatValue(popoverDefaults.content.sideOffset),
            description: 'Distance in pixels from the trigger.',
          },
          {
            name: 'sideFlip',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.sideFlip),
            description: 'Flips to the opposite side when colliding with the boundary.',
          },
          {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            default: formatValue(popoverDefaults.content.align),
            description: 'Preferred alignment against the trigger.',
          },
          {
            name: 'alignOffset',
            type: 'number',
            default: formatValue(popoverDefaults.content.alignOffset),
            description: 'Offset in pixels from the start or end alignment.',
          },
          {
            name: 'alignFlip',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.alignFlip),
            description: 'Flips alignment when colliding with the boundary.',
          },
          {
            name: 'avoidCollisions',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.avoidCollisions),
            description: 'Changes side and alignment to prevent collisions with the boundary.',
          },
          {
            name: 'collisionBoundary',
            type: 'Element | null | Array<Element | null>',
            default: formatValue(popoverDefaults.content.collisionBoundary),
            description: 'Elements used as the collision boundary. Defaults to the viewport.',
          },
          {
            name: 'collisionPadding',
            type: 'number | Partial<Record<Side, number>>',
            default: formatValue(popoverDefaults.content.collisionPadding),
            description:
              'Distance in pixels from the boundary edges where collision detection occurs.',
          },
          {
            name: 'arrowPadding',
            type: 'number',
            default: formatValue(popoverDefaults.content.arrowPadding),
            description: 'Padding between the arrow and the content edges.',
          },
          {
            name: 'hideShiftedArrow',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.hideShiftedArrow),
            description: 'Hides the arrow when it cannot stay centered on the trigger.',
          },
          {
            name: 'sticky',
            type: "'partial' | 'always'",
            default: formatValue(popoverDefaults.content.sticky),
            description: 'Sticky behavior on the align axis when the trigger leaves the boundary.',
          },
          {
            name: 'hideWhenDetached',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.hideWhenDetached),
            description: 'Hides the content when the trigger is fully occluded.',
          },
          {
            name: 'positionStrategy',
            type: "'absolute' | 'fixed'",
            default: formatValue(popoverDefaults.content.positionStrategy),
            description: 'CSS position strategy used for the content.',
          },
          {
            name: 'updatePositionStrategy',
            type: "'optimized' | 'always'",
            default: formatValue(popoverDefaults.content.updatePositionStrategy),
            description: 'Whether to update the position on every animation frame.',
          },
          {
            name: 'disableUpdateOnLayoutShift',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.disableUpdateOnLayoutShift),
            description: 'Skips position updates when the layout shifts.',
          },
          {
            name: 'prioritizePosition',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.prioritizePosition),
            description: 'Keeps the content in the viewport even if it overlaps the trigger.',
          },
          {
            name: 'disableOutsidePointerEvents',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.disableOutsidePointerEvents),
            description: 'Disables pointer events outside the content while it is open.',
          },
          {
            name: 'forceMount',
            type: 'boolean',
            default: formatValue(popoverDefaults.content.forceMount),
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
          {
            name: 'onOpenAutoFocus',
            type: '(event: Event) => void',
            default: 'undefined',
            description: 'Handles the event fired when focus moves into the content.',
          },
          {
            name: 'onCloseAutoFocus',
            type: '(event: Event) => void',
            default: 'undefined',
            description: 'Handles the event fired when focus returns after closing.',
          },
        ],
      },
      {
        id: 'popover-arrow-config',
        title: 'PopoverArrowConfig',
        description:
          'Combines the listed Reka UI arrow props with HTML attributes such as class and style.',
        rows: [
          {
            name: 'as',
            type: 'AsTag | Component',
            default: formatValue(popoverDefaults.arrow.as),
            description: 'Element or component the arrow renders as.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: formatValue(popoverDefaults.arrow.asChild),
            description: 'Renders the child element instead of the default arrow.',
          },
          {
            name: 'width',
            type: 'number',
            default: formatValue(popoverDefaults.arrow.width),
            description: 'Arrow width in pixels.',
          },
          {
            name: 'height',
            type: 'number',
            default: formatValue(popoverDefaults.arrow.height),
            description: 'Arrow height in pixels.',
          },
          {
            name: 'rounded',
            type: 'boolean',
            default: formatValue(popoverDefaults.arrow.rounded),
            description: 'Renders a rounded arrow tip.',
          },
        ],
      },
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
