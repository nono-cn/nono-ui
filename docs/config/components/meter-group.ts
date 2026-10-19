import type { ComponentDocConfig } from '../component-docs'
import {
  meterGroupDefaults,
  meterGroupItemDefaults,
  meterGroupOrientations,
  meterGroupSizes,
} from '@/components/ui/MeterGroup'
import { formatValue } from '../format-default'
import MeterGroupBasicExample from '../../components/examples/meter-group/MeterGroupBasicExample.vue'
import MeterGroupSizeExample from '../../components/examples/meter-group/MeterGroupSizeExample.vue'
import MeterGroupOrientationExample from '../../components/examples/meter-group/MeterGroupOrientationExample.vue'
import MeterGroupColorExample from '../../components/examples/meter-group/MeterGroupColorExample.vue'
import MeterGroupStatusExample from '../../components/examples/meter-group/MeterGroupStatusExample.vue'
import MeterGroupMaxExample from '../../components/examples/meter-group/MeterGroupMaxExample.vue'
import MeterGroupIconExample from '../../components/examples/meter-group/MeterGroupIconExample.vue'
import MeterGroupAccessibleValueExample from '../../components/examples/meter-group/MeterGroupAccessibleValueExample.vue'
import MeterGroupSlotsExample from '../../components/examples/meter-group/MeterGroupSlotsExample.vue'
import MeterGroupUiExample from '../../components/examples/meter-group/MeterGroupUiExample.vue'

const meterGroupConfig: ComponentDocConfig = {
  slug: 'meter-group',
  title: 'MeterGroup',
  language: 'en',
  description: 'Show several values that share one track, with a legend for each item.',
  importPath: '@nono-ui/components/ui/MeterGroup',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show several values that share one track, with a legend for each item.',
      component: MeterGroupBasicExample,
    },
  ],
  examples: [
    {
      title: 'Size',
      description: 'Change the track thickness, legend marker, icon, and text size.',
      component: MeterGroupSizeExample,
    },
    {
      title: 'Orientation',
      description:
        'Lay the track out horizontally or vertically; vertical meters fill from the bottom.',
      component: MeterGroupOrientationExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme color or custom CSS color for each item.',
      component: MeterGroupColorExample,
    },
    {
      title: 'Status',
      description: 'Show the total percentage above the track.',
      component: MeterGroupStatusExample,
    },
    {
      title: 'Max',
      description:
        'Set the maximum value; when the total exceeds it, the items scale to fit the track.',
      component: MeterGroupMaxExample,
    },
    {
      title: 'Icon',
      description: 'Replace the legend marker with an icon tinted with the item color.',
      component: MeterGroupIconExample,
    },
    {
      title: 'Accessible value',
      description: 'Provide a spoken name and value for the meter.',
      component: MeterGroupAccessibleValueExample,
    },
    {
      title: 'Slots',
      description: 'Customize the status and every legend part, or one item through its slot key.',
      component: MeterGroupSlotsExample,
    },
    {
      title: 'UI',
      description: 'Customize the track, each indicator, and each legend part using their context.',
      component: MeterGroupUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Meter role',
      description:
        'The track is rendered with role="meter" and exposes the total, clamped to max, through aria-valuenow and aria-valuemax. Individual items are not announced by the meter; the legend is the textual equivalent.',
    },
    {
      title: 'Accessible name and value',
      description:
        'The accessible name comes from getValueLabel, which defaults to the percentage. Use getValueLabel for a descriptive name such as "Storage usage", and getValueText for a spoken value other than the number.',
    },
    {
      title: 'Decorative markers',
      description:
        'Legend markers and icons are hidden from assistive technologies; the item label carries the meaning, so do not rely on color alone.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'MeterGroupItem[]',
        typeLink: '#meter-group-item',
        default: '[]',
        description: 'Values to render on the track, in order.',
      },
      {
        name: 'max',
        type: 'number',
        default: formatValue(meterGroupDefaults.max),
        description: `Maximum value. Values of zero or less fall back to ${meterGroupDefaults.max}. When the total exceeds max, the indicators scale to fit.`,
      },
      {
        name: 'orientation',
        type: meterGroupOrientations.map((value) => `'${value}'`).join(' | '),
        default: formatValue(meterGroupDefaults.orientation),
        description: 'Horizontal or vertical track layout.',
      },
      {
        name: 'size',
        type: meterGroupSizes.map((value) => `'${value}'`).join(' | '),
        default: formatValue(meterGroupDefaults.size),
        description: 'Track thickness, legend marker, icon, and text size.',
      },
      {
        name: 'status',
        type: 'boolean',
        default: formatValue(meterGroupDefaults.status),
        description:
          'Shows the total percentage above the track, or the status slot when provided.',
      },
      {
        name: 'getValueLabel',
        type: '(value: number | null | undefined, max: number) => string | undefined',
        default: 'percentage label',
        description: 'Provides the accessible name of the meter.',
      },
      {
        name: 'getValueText',
        type: '(value: number | null | undefined, max: number) => string | undefined',
        default: formatValue(meterGroupDefaults.getValueText),
        description: 'Provides aria-valuetext for assistive technology.',
      },
      {
        name: 'ui',
        type: `{
  status?: (context: MeterGroupContext) => HTMLAttributes
  track?: (context: MeterGroupContext) => HTMLAttributes
  indicator?: (context: MeterGroupItemContext) => HTMLAttributes
  list?: (context: MeterGroupContext) => HTMLAttributes
  item?: (context: MeterGroupItemContext) => HTMLAttributes
  leading?: (context: MeterGroupItemContext) => HTMLAttributes
  label?: (context: MeterGroupItemContext) => HTMLAttributes
  trailing?: (context: MeterGroupItemContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  status?: (context: ' },
          { text: 'MeterGroupContext', link: '#meter-group-context' },
          { text: ') => HTMLAttributes\n  track?: (context: ' },
          { text: 'MeterGroupContext', link: '#meter-group-context' },
          { text: ') => HTMLAttributes\n  indicator?: (context: ' },
          { text: 'MeterGroupItemContext', link: '#meter-group-item-context' },
          { text: ') => HTMLAttributes\n  list?: (context: ' },
          { text: 'MeterGroupContext', link: '#meter-group-context' },
          { text: ') => HTMLAttributes\n  item?: (context: ' },
          { text: 'MeterGroupItemContext', link: '#meter-group-item-context' },
          { text: ') => HTMLAttributes\n  leading?: (context: ' },
          { text: 'MeterGroupItemContext', link: '#meter-group-item-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'MeterGroupItemContext', link: '#meter-group-item-context' },
          { text: ') => HTMLAttributes\n  trailing?: (context: ' },
          { text: 'MeterGroupItemContext', link: '#meter-group-item-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: formatValue(meterGroupDefaults.ui),
        description:
          'Resolvers for attributes and classes on the status, track, each indicator, the legend list, and each legend part. leading also applies to item icons.',
      },
    ],
    configs: [
      {
        id: 'meter-group-item',
        title: 'MeterGroupItem',
        typeLabel: 'MeterGroupItem',
        rows: [
          {
            name: 'value',
            type: 'number',
            required: true,
            description: 'Amount of the item. Negative values count as zero.',
          },
          {
            name: 'label',
            type: 'string',
            default: 'undefined',
            description:
              'Text shown in the legend. Items without a label or label slot are left out of the legend.',
          },
          {
            name: 'slot',
            type: 'string',
            default: 'undefined',
            description: 'Key used in the targeted slots, such as label-system.',
          },
          {
            name: 'color',
            type: 'string',
            default: formatValue(meterGroupItemDefaults.color),
            description:
              'Theme color, such as primary or success, or any CSS color for the indicator, legend marker, and icon.',
          },
          {
            name: 'icon',
            type: 'IconName',
            typeLink: '/components/icon#props',
            default: 'undefined',
            description:
              'Name of the icon shown instead of the legend marker, tinted with the item color and sized with size.',
          },
        ],
      },
      {
        id: 'meter-group-context',
        title: 'MeterGroupContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the status slot and the status, track, and list resolvers.',
        rows: [
          { name: 'value', type: 'number', description: 'Sum of the item values, clamped to max.' },
          { name: 'max', type: 'number', description: 'Maximum value of the meter.' },
          {
            name: 'percentage',
            type: 'number',
            description: 'Total as a percentage between zero and 100.',
          },
        ],
      },
      {
        id: 'meter-group-item-context',
        title: 'MeterGroupItemContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the legend slots and the item resolvers.',
        rows: [
          {
            name: 'item',
            type: 'MeterGroupItem',
            typeLink: '#meter-group-item',
            description: 'Configuration for this item.',
          },
          { name: 'index', type: 'number', description: 'Zero-based position in items.' },
          { name: 'value', type: 'number', description: 'Item value, with negatives as zero.' },
          {
            name: 'percentage',
            type: 'number',
            description: 'Item value as a percentage of max, clamped to 100.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'status',
        type: 'MeterGroupContext',
        typeLink: '#meter-group-context',
        description: 'Replaces the status content above the track. Requires status.',
      },
      {
        name: 'leading',
        type: 'MeterGroupItemContext',
        typeLink: '#meter-group-item-context',
        description: 'Shared legend marker, replacing the marker or icon of every item.',
      },
      {
        name: 'label',
        type: 'MeterGroupItemContext',
        typeLink: '#meter-group-item-context',
        description: 'Shared legend label, replacing the label of every item.',
      },
      {
        name: 'trailing',
        type: 'MeterGroupItemContext',
        typeLink: '#meter-group-item-context',
        description: 'Shared trailing content, replacing the percentage of every item.',
      },
      {
        name: 'leading-[slot]',
        type: 'MeterGroupItemContext',
        typeLink: '#meter-group-item-context',
        description: 'Legend marker for the item with that slot key.',
      },
      {
        name: 'label-[slot]',
        type: 'MeterGroupItemContext',
        typeLink: '#meter-group-item-context',
        description: 'Legend label for the item with that slot key.',
      },
      {
        name: 'trailing-[slot]',
        type: 'MeterGroupItemContext',
        typeLink: '#meter-group-item-context',
        description: 'Trailing content for the item with that slot key.',
      },
    ],
    expose: [],
  },
}

export default meterGroupConfig
