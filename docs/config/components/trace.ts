import type { ApiTypePart, ComponentDocConfig } from '../component-docs'
import { traceDefaults, traceStatuses, traceStatusIcons } from '@/components/ui/Trace'
import TraceBasicExample from '../../components/examples/trace/TraceBasicExample.vue'
import TraceStatusExample from '../../components/examples/trace/TraceStatusExample.vue'
import TraceContentExample from '../../components/examples/trace/TraceContentExample.vue'
import TraceStackTraceExample from '../../components/examples/trace/TraceStackTraceExample.vue'
import TraceSlotsExample from '../../components/examples/trace/TraceSlotsExample.vue'
import TraceUiExample from '../../components/examples/trace/TraceUiExample.vue'

const union = (values: readonly string[]) => values.map((value) => `'${value}'`).join(' | ')
const traceUiParts: ApiTypePart[] = [
  { text: '{\n' },
  ...(['item', 'trigger', 'icon', 'label', 'description', 'content'] as const).flatMap(
    (name): ApiTypePart[] => [
      { text: `  ${name}?: (context: ` },
      { text: 'TraceItemContext', link: '#trace-item-context' },
      { text: ') => HTMLAttributes\n' },
    ],
  ),
  { text: '}' },
]
const statusIcons = Object.entries(traceStatusIcons)
  .map(([status, icon]) => `${status}: ${icon}`)
  .join(', ')

const traceConfig: ComponentDocConfig = {
  slug: 'trace',
  title: 'Trace',
  language: 'en',
  description: 'Show the steps of a process with their status and optional details.',
  importPath: '@nono-ui/components/ui/Trace',
  usage: [
    {
      title: 'Basic usage',
      description: 'List the steps of a process with their status.',
      component: TraceBasicExample,
    },
  ],
  examples: [
    {
      title: 'Status',
      description: 'Each status sets the icon and its color; item.icon overrides the icon.',
      component: TraceStatusExample,
    },
    {
      title: 'Collapsible content',
      description:
        'Items with content can be expanded; v-model holds the values of the open items.',
      component: TraceContentExample,
    },
    {
      title: 'Stack trace',
      description:
        'Parse an error stack: the first line is the label and the frames go in the content slot.',
      component: TraceStackTraceExample,
    },
    {
      title: 'Item slots',
      description: 'Use item.slot to customize one item without changing the others.',
      component: TraceSlotsExample,
    },
    {
      title: 'UI resolver',
      description: 'Style an item using its status.',
      component: TraceUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Trace is a list. Items with content use a Reka UI collapsible, so their row is a button that toggles the content.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['<ul> / <li>', 'Root, item', 'Announces the steps as a list.'],
          ['aria-expanded', 'Trigger', 'Whether the content of a collapsible item is open.'],
          ['aria-controls', 'Trigger', 'Points to the content it toggles.'],
          [
            'aria-hidden="true"',
            'Icon, dropdown icon',
            'The status and chevron icons are decorative.',
          ],
          ['data-status', 'Item', 'Current status, for styling.'],
        ],
      },
    },
    {
      title: 'Status',
      description:
        'The status is only shown by its icon and color. Write labels that say the outcome, such as "Build failed", so it is announced too.',
    },
    {
      title: 'Keyboard',
      description: 'Tab moves between collapsible items; Enter or Space opens and closes them.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'TraceItem[]',
        typeLink: '#trace-item',
        default: '[]',
        description: 'Steps in display order.',
      },
      {
        name: 'modelValue',
        type: 'string[]',
        default: '[]',
        description: 'Values of the open items. Supports v-model.',
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: String(traceDefaults.unmountOnHide),
        description: 'Remove the content of closed items from the DOM.',
      },
      {
        name: 'iconDropDownOpen',
        type: 'IconName',
        typeLink: '/components/icon',
        default: `'${traceDefaults.iconDropDownOpen}'`,
        description: 'Icon shown on an open collapsible item.',
      },
      {
        name: 'iconDropDownClose',
        type: 'IconName',
        typeLink: '/components/icon',
        default: `'${traceDefaults.iconDropDownClose}'`,
        description: 'Icon shown on a closed collapsible item.',
      },
      {
        name: 'ui',
        type: traceUiParts.map((part) => part.text).join(''),
        typePre: true,
        typeParts: traceUiParts,
        default: 'undefined',
        description: 'Resolvers for attributes on item parts.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: string[]]',
        description: 'Emitted when an item is opened or closed.',
      },
    ],
    slots: [
      {
        name: 'icon',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Replaces the status icon for every item.',
      },
      {
        name: 'label',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Replaces the label for every item.',
      },
      {
        name: 'description',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Replaces the description for every item.',
      },
      {
        name: 'content',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Collapsible content for every item; makes every item collapsible.',
      },
      {
        name: 'iconDropdown',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Replaces the open and close icon of collapsible items.',
      },
      {
        name: 'icon-{slot}',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Icon for one item, keyed by item.slot or item.value.',
      },
      {
        name: 'label-{slot}',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Label for one item, keyed by item.slot or item.value.',
      },
      {
        name: 'description-{slot}',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Description for one item, keyed by item.slot or item.value.',
      },
      {
        name: 'content-{slot}',
        type: 'TraceItemContext',
        typeLink: '#trace-item-context',
        description: 'Collapsible content for one item; makes that item collapsible.',
      },
    ],
    configs: [
      {
        id: 'trace-item',
        title: 'TraceItem',
        showDefault: false,
        rows: [
          { name: 'value', type: 'string', description: 'Unique value used to open the item.' },
          {
            name: 'slot',
            type: 'string',
            description: 'Optional key for item-specific slots; otherwise value is used.',
          },
          { name: 'label', type: 'string', description: 'Default label text.' },
          { name: 'description', type: 'string', description: 'Text under the label.' },
          {
            name: 'status',
            type: union(traceStatuses),
            description: `Icon and color of the item; pending when undefined (${statusIcons}).`,
          },
          {
            name: 'icon',
            type: 'IconName',
            typeLink: '/components/icon',
            description: 'Replaces the status icon.',
          },
          {
            name: 'content',
            type: 'string',
            description: 'Collapsible text; the item becomes collapsible when set.',
          },
          { name: 'disabled', type: 'boolean', description: 'Prevents opening and closing.' },
        ],
      },
      {
        id: 'trace-item-context',
        title: 'TraceItemContext',
        showDefault: false,
        rows: [
          {
            name: 'item',
            type: 'TraceItem',
            typeLink: '#trace-item',
            description: 'Current item.',
          },
          { name: 'index', type: 'number', description: 'Index in display order.' },
          { name: 'status', type: union(traceStatuses), description: 'Resolved status.' },
          { name: 'open', type: 'boolean', description: 'Whether the content is open.' },
          {
            name: 'collapsible',
            type: 'boolean',
            description: 'Whether the item has content to toggle.',
          },
          { name: 'first', type: 'boolean', description: 'Whether this is the first item.' },
          { name: 'last', type: 'boolean', description: 'Whether this is the last item.' },
        ],
      },
    ],
    expose: [],
  },
}

export default traceConfig
