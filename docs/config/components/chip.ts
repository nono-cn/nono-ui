import type { ComponentDocConfig } from '../component-docs'
import { chipDefaults, chipPositions, chipSizes } from '@/components/ui/Chip'
import ChipColorExample from '../../components/examples/chip/ChipColorExample.vue'
import ChipDefaultExample from '../../components/examples/chip/ChipDefaultExample.vue'
import ChipInsetExample from '../../components/examples/chip/ChipInsetExample.vue'
import ChipPositionExample from '../../components/examples/chip/ChipPositionExample.vue'
import ChipShowExample from '../../components/examples/chip/ChipShowExample.vue'
import ChipSizeExample from '../../components/examples/chip/ChipSizeExample.vue'
import ChipStandaloneExample from '../../components/examples/chip/ChipStandaloneExample.vue'
import ChipUsageExample from '../../components/examples/chip/ChipUsageExample.vue'

const chipConfig: ComponentDocConfig = {
  slug: 'chip',
  title: 'Chip',
  language: 'en',
  description: 'Compact indicator that can appear over an element or on its own.',
  importPath: '@nono-ui/components/ui/Chip',
  usage: [
    {
      title: 'Basic usage',
      description: 'Display an indicator over an associated element.',
      component: ChipUsageExample,
    },
  ],
  examples: [
    {
      title: 'Default',
      description: 'Show the default top-right position on a slotted element.',
      component: ChipDefaultExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or a custom CSS color.',
      component: ChipColorExample,
    },
    {
      title: 'Size',
      description: 'Choose the chip’s visual size.',
      component: ChipSizeExample,
    },
    {
      title: 'Position',
      description: 'Choose the corner where the chip appears.',
      component: ChipPositionExample,
    },
    {
      title: 'Show',
      description: 'Choose whether the chip indicator is visible.',
      component: ChipShowExample,
    },
    {
      title: 'Inset',
      description: 'Choose whether the chip stays within its positioned corner.',
      component: ChipInsetExample,
    },
    {
      title: 'Standalone',
      description: 'Choose whether the indicator is positioned independently from its content.',
      component: ChipStandaloneExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'The chip is a purely visual dot on top of the default slot. It has no text, role, or name, so assistive technology does not notice it.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['div', 'Root', 'Generic container that wraps the default slot.'],
          ['span', 'Chip', 'Visual indicator with no role or name.'],
        ],
      },
    },
    {
      title: 'Communicating the status',
      description:
        'When the chip means something, such as unread messages, say it on the element it decorates, for example with aria-label="Inbox, 3 unread" on the button. Do not rely on color or size alone.',
    },
  ],
  api: {
    props: [
      {
        name: 'color',
        type: 'string',
        default: `'${chipDefaults.color}'`,
        description: 'Theme token or CSS color for the chip indicator.',
      },
      {
        name: 'size',
        type: chipSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${chipDefaults.size}'`,
        description: 'Size of the chip.',
      },
      {
        name: 'position',
        type: chipPositions.map((position) => `'${position}'`).join(' | '),
        default: `'${chipDefaults.position}'`,
        description: 'Chip position when it is rendered without a default slot.',
      },
      {
        name: 'show',
        type: 'boolean',
        default: String(chipDefaults.show),
        description: 'Controls whether the chip is visible. Use with v-model:show.',
      },
      {
        name: 'inset',
        type: 'boolean',
        default: String(chipDefaults.inset),
        description: 'Prevents the chip from being offset from its position.',
      },
      {
        name: 'standalone',
        type: 'boolean',
        default: String(chipDefaults.standalone),
        description: 'Displays the chip without absolute positioning.',
      },
    ],
    emits: [
      {
        name: 'update:show',
        type: '[value: boolean]',
        description: 'Emitted when the chip’s visibility changes.',
      },
    ],
    slots: [{ name: 'default', type: '-', description: 'Element the chip is positioned over.' }],
    expose: [],
  },
}

export default chipConfig
