import type { ApiTypePart, ComponentDocConfig } from '../component-docs'
import {
  timelineAligns,
  timelineDefaults,
  timelineSizes,
  timelineOrientations,
} from '@/components/ui/Timeline'
import TimelineBasicExample from '../../components/examples/timeline/TimelineBasicExample.vue'
import TimelineLayoutExample from '../../components/examples/timeline/TimelineLayoutExample.vue'
import TimelineSizeExample from '../../components/examples/timeline/TimelineSizeExample.vue'
import TimelineColorExample from '../../components/examples/timeline/TimelineColorExample.vue'
import TimelineSlotsExample from '../../components/examples/timeline/TimelineSlotsExample.vue'
import TimelineUiExample from '../../components/examples/timeline/TimelineUiExample.vue'

const union = (values: readonly string[]) => values.map((value) => `'${value}'`).join(' | ')
const timelineUiParts: ApiTypePart[] = [
  { text: '{\n' },
  ...(
    ['item', 'content', 'header', 'separator', 'indicator', 'label', 'description'] as const
  ).flatMap((name): ApiTypePart[] => [
    { text: `  ${name}?: (context: ` },
    { text: 'TimelineItemContext', link: '#timeline-item-context' },
    { text: ') => HTMLAttributes\n' },
  ]),
  { text: '}' },
]

const timelineConfig: ComponentDocConfig = {
  slug: 'timeline',
  title: 'Timeline',
  language: 'en',
  description: 'Display ordered events and highlight the current position.',
  importPath: '@nono-ui/components/ui/Timeline',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show a sequence with a current item.',
      component: TimelineBasicExample,
    },
  ],
  examples: [
    {
      title: 'Layout',
      description: 'Choose the timeline direction and where each event appears.',
      component: TimelineLayoutExample,
    },
    {
      title: 'Size',
      description: 'Change the indicator and icon size.',
      component: TimelineSizeExample,
    },
    {
      title: 'Color',
      description:
        'Choose a theme token or custom CSS color for the indicator and completed separator.',
      component: TimelineColorExample,
    },
    {
      title: 'Item slots',
      description: 'Use item.slot to customize one item without changing the others.',
      component: TimelineSlotsExample,
    },
    {
      title: 'UI resolver',
      description: 'Style an item using its active state.',
      component: TimelineUiExample,
    },
  ],
  accessibility: [
    {
      title: 'List semantics',
      description:
        'Timeline renders a list with list items. Supply meaningful labels and descriptions; the indicator and separator are decorative and hidden from assistive technology.',
    },
    {
      title: 'Current position',
      description:
        'The modelValue prop changes the visual completed state. If the current position must be announced, add aria-current to the active item through ui.item.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'TimelineItem[]',
        typeLink: '#timeline-item',
        required: true,
        description: 'Events in display order, before reverse is applied.',
      },
      {
        name: 'modelValue',
        type: 'string | number',
        default: 'undefined',
        description:
          'Current item value. Supports v-model; matching items through the current item are marked completed.',
      },
      {
        name: 'orientation',
        type: union(timelineOrientations),
        default: `'${timelineDefaults.orientation}'`,
        description: 'Vertical or horizontal layout.',
      },
      {
        name: 'align',
        type: union(timelineAligns),
        default: `'${timelineDefaults.align}'`,
        description:
          'Position of the content relative to the indicator; alternate switches sides per item.',
      },
      {
        name: 'size',
        type: union(timelineSizes),
        default: `'${timelineDefaults.size}'`,
        description: 'Indicator diameter and the scale inherited by its text and SVG content.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${timelineDefaults.color}'`,
        description: 'Theme token or CSS color used by the indicator and completed separator.',
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: String(timelineDefaults.reverse),
        description: 'Display items in reverse order; completion follows that display order.',
      },
      {
        name: 'ui',
        type: timelineUiParts.map((part) => part.text).join(''),
        typePre: true,
        typeParts: timelineUiParts,
        default: 'undefined',
        description: 'Resolvers for attributes on item parts.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: string | number | undefined]',
        description:
          'Emitted when modelValue changes, including external prop updates and clearing the value.',
      },
    ],
    slots: [
      {
        name: 'header',
        type: 'TimelineItemContext',
        typeLink: '#timeline-item-context',
        description: 'Replaces the header for every item.',
      },
      {
        name: 'label',
        type: 'TimelineItemContext',
        typeLink: '#timeline-item-context',
        description: 'Replaces the default label for every item.',
      },
      {
        name: 'description',
        type: 'TimelineItemContext',
        typeLink: '#timeline-item-context',
        description: 'Replaces the default description for every item.',
      },
      {
        name: 'indicator',
        type: 'TimelineItemContext',
        typeLink: '#timeline-item-context',
        description: 'Replaces the default icon for every item.',
      },
      {
        name: 'header-{slot}',
        type: 'TimelineItemContext',
        typeLink: '#timeline-item-context',
        description: 'Header for one item, keyed by item.slot or item.value.',
      },
      {
        name: 'label-{slot}',
        type: 'TimelineItemContext',
        typeLink: '#timeline-item-context',
        description: 'Label for one item, keyed by item.slot or item.value.',
      },
      {
        name: 'description-{slot}',
        type: 'TimelineItemContext',
        typeLink: '#timeline-item-context',
        description: 'Description for one item, keyed by item.slot or item.value.',
      },
      {
        name: 'indicator-{slot}',
        type: 'TimelineItemContext',
        typeLink: '#timeline-item-context',
        description: 'Indicator for one item, keyed by item.slot or item.value.',
      },
    ],
    configs: [
      {
        id: 'timeline-item',
        title: 'TimelineItem',
        showDefault: false,
        rows: [
          {
            name: 'value',
            type: 'string | number',
            description: 'Unique value used to identify the current item.',
          },
          {
            name: 'slot',
            type: 'string',
            description: 'Optional key for item-specific slots; otherwise value is stringified.',
          },
          { name: 'label', type: 'string', description: 'Default label text.' },
          { name: 'description', type: 'string', description: 'Default description text.' },
          {
            name: 'icon',
            type: 'IconName',
            typeLink: '/components/icon',
            description: 'Optional decorative icon inside the indicator.',
          },
        ],
      },
      {
        id: 'timeline-item-context',
        title: 'TimelineItemContext',
        showDefault: false,
        rows: [
          {
            name: 'modelValue',
            type: 'string | number | undefined',
            description: 'Current model value.',
          },
          {
            name: 'item',
            type: 'TimelineItem',
            typeLink: '#timeline-item',
            description: 'Current item.',
          },
          { name: 'index', type: 'number', description: 'Index in displayed order.' },
          {
            name: 'active',
            type: 'boolean',
            description: 'Whether item.value matches modelValue.',
          },
          {
            name: 'completed',
            type: 'boolean',
            description: 'Whether this item is at or before the active item.',
          },
          {
            name: 'first',
            type: 'boolean',
            description: 'Whether this is the first displayed item.',
          },
          {
            name: 'last',
            type: 'boolean',
            description: 'Whether this is the last displayed item.',
          },
          {
            name: 'itemAlign',
            type: "'left' | 'right'",
            description: 'Resolved side for this item.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default timelineConfig
