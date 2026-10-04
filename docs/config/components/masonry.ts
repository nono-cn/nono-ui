import type { ComponentDocConfig } from '../component-docs'
import { masonryDefaults } from '@/components/ui/Masonry'
import MasonryBasicExample from '../../components/examples/masonry/MasonryBasicExample.vue'
import MasonryResponsiveExample from '../../components/examples/masonry/MasonryResponsiveExample.vue'
import MasonrySequentialExample from '../../components/examples/masonry/MasonrySequentialExample.vue'

const masonryConfig: ComponentDocConfig = {
  slug: 'masonry',
  title: 'Masonry',
  language: 'en',
  description:
    'Arranges items of varying heights into columns to make efficient use of available space.',
  importPath: '@nono-ui/components/ui/Masonry',
  usage: [
    {
      title: 'Basic masonry',
      description: 'Set item heights in pixels, then choose the number of columns and spacing.',
      component: MasonryBasicExample,
    },
  ],
  examples: [
    {
      title: 'Responsive columns',
      description: 'Adjust the number of columns to the viewport width.',
      component: MasonryResponsiveExample,
    },
    {
      title: 'Sequential order',
      description: 'Switch between sequential and shortest-column distribution.',
      component: MasonrySequentialExample,
    },
  ],
  accessibility: [
    {
      title: 'Order and semantics',
      description:
        'Masonry groups items by column in the DOM, so assistive technology reads each column from top to bottom. Use semantic content and accessible names in the slot; do not rely on visual left-to-right order to convey meaning.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'MasonryItem[]',
        typeLink: '#masonry-item',
        default: '-',
        required: true,
        description:
          'Objects with a required height in pixels and optional application data. Masonry sizes each item and balances columns using this height.',
      },
      {
        name: 'columns',
        type: 'number | { sm?: number; md?: number; lg?: number }',
        default: String(masonryDefaults.columns),
        description: 'Number of columns or responsive configuration for sm, md, and lg.',
      },
      {
        name: 'spacing',
        type: 'number | string',
        default: String(masonryDefaults.spacing),
        description: 'Spacing between columns and items, multiplied by 0.25rem.',
      },
      {
        name: 'sequential',
        type: 'boolean',
        default: String(masonryDefaults.sequential),
        description:
          'Distributes items sequentially from left to right instead of choosing the shortest column.',
      },
    ],
    configs: [
      {
        id: 'masonry-item',
        title: 'MasonryItem',
        typeLabel: 'MasonryItem',
        description: 'Each item requires a height and may include additional application data.',
        rows: [
          {
            name: 'height',
            type: 'number',
            required: true,
            description: 'Item height in pixels; also used when choosing the shortest column.',
          },
          {
            name: '[key: string]',
            type: 'unknown',
            description: 'Additional properties available through the default slot.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '{ item: MasonryItem; index: number }',
        typeParts: [
          { text: '{ item: ' },
          { text: 'MasonryItem', link: '#masonry-item' },
          { text: '; index: number }' },
        ],
        description:
          'Content for each item, including its custom properties. Without this slot, the object is stringified (usually [object Object]).',
      },
    ],
    expose: [],
  },
}

export default masonryConfig
