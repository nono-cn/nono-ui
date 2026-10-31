import type { ComponentDocConfig } from '../component-docs'
import { dropdownMenuDefaults, dropdownMenuSizes } from '@/components/ui/DropdownMenu'
import DropdownMenuBasicExample from '../../components/examples/dropdown-menu/DropdownMenuBasicExample.vue'
import DropdownMenuOpenExample from '../../components/examples/dropdown-menu/DropdownMenuOpenExample.vue'
import DropdownMenuModalExample from '../../components/examples/dropdown-menu/DropdownMenuModalExample.vue'
import DropdownMenuDisabledExample from '../../components/examples/dropdown-menu/DropdownMenuDisabledExample.vue'
import DropdownMenuSizeExample from '../../components/examples/dropdown-menu/DropdownMenuSizeExample.vue'

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
          ['ArrowDown', 'Opens the menu from the trigger, or moves focus to the next item.'],
          ['ArrowUp', 'Moves focus to the previous item.'],
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
    ],
    configs: [
      {
        id: 'dropdown-menu-item',
        title: 'DropdownMenuItem',
        showDefault: false,
        description: 'Each entry of items.',
        rows: [{ name: 'label', type: 'string', description: 'Text of the item.' }],
      },
      {
        id: 'dropdown-menu-context',
        title: 'DropdownMenuContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the default slot.',
        rows: [
          { name: 'open', type: 'boolean', description: 'Current open state.' },
          { name: 'close', type: '() => void', description: 'Closes the menu.' },
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
        type: 'DropdownMenuContext',
        typeLink: '#dropdown-menu-context',
        description: 'Trigger element. Receives open and close.',
      },
    ],
    expose: [],
  },
}

export default dropdownMenuConfig
