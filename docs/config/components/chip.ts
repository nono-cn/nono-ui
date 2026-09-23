import type { ComponentDocConfig } from '../component-docs'
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
      description: 'Use the default slot to position the chip over an element.',
      component: ChipDefaultExample,
    },
    {
      title: 'Color',
      description: 'Apply a custom CSS color to the chip.',
      component: ChipColorExample,
    },
    {
      title: 'Size',
      description: 'Adjust the chip’s size.',
      component: ChipSizeExample,
    },
    {
      title: 'Position',
      description: 'Place the chip in one of the available corners.',
      component: ChipPositionExample,
    },
    {
      title: 'Show',
      description: 'Control whether the chip is visible.',
      component: ChipShowExample,
    },
    {
      title: 'Inset',
      description: 'Prevent the chip from being offset from its position.',
      component: ChipInsetExample,
    },
    {
      title: 'Standalone',
      description: 'Display the chip without absolute positioning.',
      component: ChipStandaloneExample,
    },
  ],
  accessibility: [
    {
      title: 'Visual information',
      description:
        'Do not rely on color or size alone to convey important information. Add accessible content to the associated element when the chip communicates a status.',
    },
  ],
  api: {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color for the chip.',
      },
      {
        name: 'size',
        type: "'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
        default: "'3xl'",
        description: 'Size of the chip.',
      },
      {
        name: 'position',
        type: "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'",
        default: "'top-right'",
        description: 'Chip position when it is rendered without a default slot.',
      },
      {
        name: 'show',
        type: 'boolean',
        default: 'true',
        description: 'Controls whether the chip is visible. Use with v-model:show.',
      },
      {
        name: 'inset',
        type: 'boolean',
        default: 'false',
        description: 'Prevents the chip from being offset from its position.',
      },
      {
        name: 'standalone',
        type: 'boolean',
        default: 'false',
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
