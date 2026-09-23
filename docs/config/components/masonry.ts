import type { ComponentDocConfig } from '../component-docs'
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
      description: 'Arrange items of varying heights into three columns.',
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
      description: 'Distribute items from left to right in strict order.',
      component: MasonrySequentialExample,
    },
  ],
  accessibility: [
    {
      title: 'Order and semantics',
      description:
        'Masonry does not add interactive roles. Keep items in a logical reading order, and use semantic elements and accessible names within the slot.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'unknown[]',
        default: '-',
        required: true,
        description: 'Items Masonry distributes across the columns.',
      },
      {
        name: 'columns',
        type: 'number | { sm?: number; md?: number; lg?: number }',
        default: '4',
        description: 'Number of columns or responsive configuration for sm, md, and lg.',
      },
      {
        name: 'spacing',
        type: 'number | string',
        default: '2',
        description: 'Spacing between columns and items, multiplied by 0.25rem.',
      },
      {
        name: 'sequential',
        type: 'boolean',
        default: 'false',
        description:
          'Distributes items sequentially from left to right instead of choosing the shortest column.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '{ item: unknown; index: number }',
        description: 'Content for each item. If omitted, a div is rendered with the item’s value.',
      },
    ],
    expose: [],
  },
}

export default masonryConfig
