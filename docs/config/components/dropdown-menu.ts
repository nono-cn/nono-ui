import type { ComponentDocConfig } from '../component-docs'
import { dropdownMenuDefaults, dropdownMenuSizes } from '@/components/ui/DropdownMenu'
import { formatDefaultObject, formatValue } from '../format-default'
import DropdownMenuBasicExample from '../../components/examples/dropdown-menu/DropdownMenuBasicExample.vue'
import DropdownMenuOpenExample from '../../components/examples/dropdown-menu/DropdownMenuOpenExample.vue'
import DropdownMenuModalExample from '../../components/examples/dropdown-menu/DropdownMenuModalExample.vue'
import DropdownMenuDisabledExample from '../../components/examples/dropdown-menu/DropdownMenuDisabledExample.vue'
import DropdownMenuSizeExample from '../../components/examples/dropdown-menu/DropdownMenuSizeExample.vue'
import DropdownMenuContentExample from '../../components/examples/dropdown-menu/DropdownMenuContentExample.vue'
import DropdownMenuArrowExample from '../../components/examples/dropdown-menu/DropdownMenuArrowExample.vue'
import DropdownMenuIconExample from '../../components/examples/dropdown-menu/DropdownMenuIconExample.vue'
import DropdownMenuDescriptionExample from '../../components/examples/dropdown-menu/DropdownMenuDescriptionExample.vue'
import DropdownMenuItemSlotsExample from '../../components/examples/dropdown-menu/DropdownMenuItemSlotsExample.vue'

const dropdownMenuConfig: ComponentDocConfig = {
  slug: 'dropdown-menu',
  title: 'DropdownMenu',
  language: 'en',
  description: 'Displays a menu of actions, triggered by a button.',
  importPath: '@nono-ui/components/ui/DropdownMenu',
  usage: [
    {
      title: 'Basic usage',
      description: 'Open a menu of items from a button.',
      component: DropdownMenuBasicExample,
    },
  ],
  examples: [
    {
      title: 'Open',
      description: 'Bind v-model:open to read or set whether the menu is open.',
      component: DropdownMenuOpenExample,
    },
    {
      title: 'Modal',
      description: 'With modal, the rest of the page cannot be used while the menu is open.',
      component: DropdownMenuModalExample,
    },
    {
      title: 'Disabled',
      description: 'Disable the trigger so the menu cannot be opened.',
      component: DropdownMenuDisabledExample,
    },
    {
      title: 'Size',
      description: 'Change the padding and text size of the items.',
      component: DropdownMenuSizeExample,
    },
    {
      title: 'Content',
      description:
        'Choose the side, alignment and offset of the menu, and whether keyboard navigation loops.',
      component: DropdownMenuContentExample,
    },
    {
      title: 'Arrow',
      description: 'Show an arrow pointing to the trigger and change its size and shape.',
      component: DropdownMenuArrowExample,
    },
    {
      title: 'Icon',
      description: 'Show an icon before the label of each item.',
      component: DropdownMenuIconExample,
    },
    {
      title: 'Description',
      description: 'Show a secondary line below the label of each item.',
      component: DropdownMenuDescriptionExample,
    },
    {
      title: 'Item slots',
      description:
        'Replace the leading and the label of every item; the slots receive the item and its index.',
      component: DropdownMenuItemSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'The default slot becomes the trigger, so use a focusable element with a clear accessible name, such as a button.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['aria-haspopup="menu"', 'Trigger', 'Announces that the trigger opens a menu.'],
          ['aria-expanded', 'Trigger', 'true while the menu is open.'],
          ['aria-controls', 'Trigger', 'Id of the content while the menu is open.'],
          [
            'disabled, data-disabled',
            'Trigger',
            'Set while disabled; the trigger cannot be focused or open the menu.',
          ],
          ['role="menu"', 'Content', 'Announces the content as a menu.'],
          ['aria-labelledby', 'Content', 'Id of the trigger, so the menu is named by it.'],
          ['role="menuitem"', 'Item', 'Announces each item as a menu item.'],
          ['aria-hidden="true"', 'Rest of the page', 'Set while a modal menu is open.'],
        ],
      },
    },
    {
      title: 'Focus and keyboard',
      description:
        'When the menu opens, focus moves into the content, and when it closes focus returns to the trigger. Typing a character moves focus to the next item whose label starts with it. By default the menu is modal: the page cannot scroll, pointer events outside the content are disabled, and the rest of the page is hidden from assistive technology. With modal set to false, the page stays usable while the menu is open.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Space, Enter', 'Opens the menu from the trigger, or selects the focused item.'],
          [
            'ArrowDown',
            'Opens the menu from the trigger, or moves focus to the next item. With content.loop it wraps from the last item to the first.',
          ],
          [
            'ArrowUp',
            'Moves focus to the previous item. With content.loop it wraps from the first item to the last.',
          ],
          ['Home, End', 'Moves focus to the first or last item.'],
          ['Escape', 'Closes the menu.'],
        ],
      },
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: String(dropdownMenuDefaults.open),
        description: 'Open state; supports v-model:open.',
      },
      {
        name: 'modal',
        type: 'boolean',
        default: String(dropdownMenuDefaults.modal),
        description:
          'Disables interaction outside the content and hides the rest of the page from assistive technology while the menu is open.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: String(dropdownMenuDefaults.disabled),
        description: 'Disables the trigger, so the menu cannot be opened.',
      },
      {
        name: 'size',
        type: dropdownMenuSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${dropdownMenuDefaults.size}'`,
        description: 'Padding and text size of the items.',
      },
      {
        name: 'items',
        type: 'DropdownMenuItem[]',
        typeLink: '#dropdown-menu-item',
        default: String(dropdownMenuDefaults.items),
        description: 'Items of the menu; the content is only rendered when there are items.',
      },
      {
        name: 'content',
        type: 'DropdownMenuContentConfig',
        typeLink: '#dropdown-menu-content-config',
        default: formatDefaultObject(dropdownMenuDefaults.content),
        description: 'Grouped DropdownMenuContent props and event callbacks.',
      },
      {
        name: 'arrow',
        type: 'DropdownMenuArrowConfig',
        typeLink: '#dropdown-menu-arrow-config',
        default: formatDefaultObject(dropdownMenuDefaults.arrow),
        description: 'Arrow size and shape.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: String(dropdownMenuDefaults.showArrow),
        description: 'Renders an arrow pointing to the trigger.',
      },
    ],
    configs: [
      {
        id: 'dropdown-menu-content-config',
        title: 'DropdownMenuContentConfig',
        description: 'Reka UI content props and event callbacks.',
        rows: [
          {
            name: 'as',
            type: 'AsTag | Component',
            default: formatValue(dropdownMenuDefaults.content.as),
            description: 'Element or component the content renders as.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.asChild),
            description: 'Renders the child element instead, merging props and behavior.',
          },
          {
            name: 'loop',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.loop),
            description: 'Keyboard navigation wraps from the last item to the first, and back.',
          },
          {
            name: 'side',
            type: "'top' | 'right' | 'bottom' | 'left'",
            default: formatValue(dropdownMenuDefaults.content.side),
            description: 'Preferred side of the trigger to render against.',
          },
          {
            name: 'sideOffset',
            type: 'number',
            default: formatValue(dropdownMenuDefaults.content.sideOffset),
            description: 'Distance in pixels from the trigger.',
          },
          {
            name: 'sideFlip',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.sideFlip),
            description: 'Flips to the opposite side when colliding with the boundary.',
          },
          {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            default: formatValue(dropdownMenuDefaults.content.align),
            description: 'Preferred alignment against the trigger.',
          },
          {
            name: 'alignOffset',
            type: 'number',
            default: formatValue(dropdownMenuDefaults.content.alignOffset),
            description: 'Offset in pixels from the start or end alignment.',
          },
          {
            name: 'alignFlip',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.alignFlip),
            description: 'Flips alignment when colliding with the boundary.',
          },
          {
            name: 'avoidCollisions',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.avoidCollisions),
            description: 'Changes side and alignment to prevent collisions with the boundary.',
          },
          {
            name: 'collisionBoundary',
            type: 'Element | null | Array<Element | null>',
            default: formatValue(dropdownMenuDefaults.content.collisionBoundary),
            description: 'Elements used as the collision boundary. Defaults to the viewport.',
          },
          {
            name: 'collisionPadding',
            type: 'number | Partial<Record<Side, number>>',
            default: formatValue(dropdownMenuDefaults.content.collisionPadding),
            description:
              'Distance in pixels from the boundary edges where collision detection occurs.',
          },
          {
            name: 'arrowPadding',
            type: 'number',
            default: formatValue(dropdownMenuDefaults.content.arrowPadding),
            description: 'Padding between the arrow and the content edges.',
          },
          {
            name: 'hideShiftedArrow',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.hideShiftedArrow),
            description: 'Hides the arrow when it cannot stay centered on the trigger.',
          },
          {
            name: 'sticky',
            type: "'partial' | 'always'",
            default: formatValue(dropdownMenuDefaults.content.sticky),
            description: 'Sticky behavior on the align axis when the trigger leaves the boundary.',
          },
          {
            name: 'hideWhenDetached',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.hideWhenDetached),
            description: 'Hides the content when the trigger is fully occluded.',
          },
          {
            name: 'positionStrategy',
            type: "'absolute' | 'fixed'",
            default: formatValue(dropdownMenuDefaults.content.positionStrategy),
            description: 'CSS position strategy used for the content.',
          },
          {
            name: 'updatePositionStrategy',
            type: "'optimized' | 'always'",
            default: formatValue(dropdownMenuDefaults.content.updatePositionStrategy),
            description: 'Whether to update the position on every animation frame.',
          },
          {
            name: 'disableUpdateOnLayoutShift',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.disableUpdateOnLayoutShift),
            description: 'Skips position updates when the layout shifts.',
          },
          {
            name: 'prioritizePosition',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.prioritizePosition),
            description: 'Keeps the content in the viewport even if it overlaps the trigger.',
          },
          {
            name: 'forceMount',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.content.forceMount),
            description: 'Keeps the content mounted for custom presence and animation handling.',
          },
          {
            name: 'onEscapeKeyDown',
            type: '(event: KeyboardEvent) => void',
            default: 'undefined',
            description: 'Handles Escape before the menu closes.',
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
        id: 'dropdown-menu-arrow-config',
        title: 'DropdownMenuArrowConfig',
        description: 'Reka UI arrow props.',
        rows: [
          {
            name: 'as',
            type: 'AsTag | Component',
            default: formatValue(dropdownMenuDefaults.arrow.as),
            description: 'Element or component the arrow renders as.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.arrow.asChild),
            description: 'Renders the child element instead of the default arrow.',
          },
          {
            name: 'width',
            type: 'number',
            default: formatValue(dropdownMenuDefaults.arrow.width),
            description: 'Arrow width in pixels.',
          },
          {
            name: 'height',
            type: 'number',
            default: formatValue(dropdownMenuDefaults.arrow.height),
            description: 'Arrow height in pixels.',
          },
          {
            name: 'rounded',
            type: 'boolean',
            default: formatValue(dropdownMenuDefaults.arrow.rounded),
            description: 'Renders a rounded arrow tip.',
          },
        ],
      },
      {
        id: 'dropdown-menu-item',
        title: 'DropdownMenuItem',
        showDefault: false,
        description: 'Each entry of items.',
        rows: [
          { name: 'label', type: 'string', description: 'Text of the item.' },
          {
            name: 'description',
            type: 'string',
            description: 'Secondary text shown below the label.',
          },
          {
            name: 'icon',
            type: 'IconName',
            typeLink: '/components/icon',
            description: 'Icon shown before the label; its size follows the menu size.',
          },
        ],
      },
      {
        id: 'dropdown-menu-item-context',
        title: 'DropdownMenuItemContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the item slots.',
        rows: [
          {
            name: 'item',
            type: 'DropdownMenuItem',
            typeLink: '#dropdown-menu-item',
            description: 'The item being rendered.',
          },
          { name: 'index', type: 'number', description: 'Position of the item in items.' },
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
        type: '-',
        description: 'Trigger element.',
      },
      {
        name: 'item-leading',
        type: 'DropdownMenuItemContext',
        typeLink: '#dropdown-menu-item-context',
        description:
          'Content before the label of every item; replaces item.icon and takes the size of the menu.',
      },
      {
        name: 'item-label',
        type: 'DropdownMenuItemContext',
        typeLink: '#dropdown-menu-item-context',
        description: 'Label of every item; replaces item.label.',
      },
    ],
    expose: [],
  },
}

export default dropdownMenuConfig
