import type { ComponentDocConfig } from '../component-docs'
import RibbonBasicExample from '../../components/examples/ribbon/RibbonBasicExample.vue'
import RibbonPositionsExample from '../../components/examples/ribbon/RibbonPositionsExample.vue'
import RibbonStylesExample from '../../components/examples/ribbon/RibbonStylesExample.vue'

const ribbonConfig: ComponentDocConfig = {
  slug: 'ribbon',
  title: 'Ribbon',
  language: 'en',
  description: 'Adds decorative ribbons over a card or content block.',
  importPath: '@nono-ui/components/ui/Ribbon',
  usage: [
    {
      title: 'Basic ribbon',
      description: 'Add a decorative ribbon to the content.',
      component: RibbonBasicExample,
    },
  ],
  examples: [
    {
      title: 'Positions',
      description: 'Place ribbons in any of the four corners.',
      component: RibbonPositionsExample,
    },
    {
      title: 'Severity and color',
      description: 'Use a severity or a custom CSS color.',
      component: RibbonStylesExample,
    },
  ],
  accessibility: [
    {
      title: 'Decorative content',
      description:
        'Ribbons are rendered with aria-hidden="true" because they are decorative. Keep important information in the default slot content as text and actions that assistive technologies can read and use. Do not rely on color, position, or rotation alone to communicate a status.',
    },
  ],
  api: {
    props: [
      {
        name: 'ribbons',
        type: 'RibbonItem[]',
        typeLink: '/components/ribbon#ribbon-item',
        default: '[]',
        description: 'List of ribbons rendered over the content.',
      },
    ],
    configs: [
      {
        id: 'ribbon-item',
        title: 'RibbonItem',
        description: 'Configuration for each object in ribbons.',
        showDefault: true,
        rows: [
          {
            name: 'label',
            type: 'string',
            description: 'Text displayed on the ribbon.',
            required: true,
          },
          {
            name: 'severity',
            type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
            default: "'primary'",
            description: 'Semantic visual style of the ribbon.',
          },
          {
            name: 'color',
            type: 'string',
            default: 'undefined',
            description: 'Custom CSS color. Takes precedence over severity.',
          },
          {
            name: 'position',
            type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
            default: "'top-right'",
            description: 'Corner where the ribbon is placed.',
          },
          {
            name: 'rotate',
            type: 'number',
            default: 'based on position',
            description: 'Rotation angle in degrees.',
          },
          {
            name: 'zIndex',
            type: 'number',
            default: '20 + index',
            description: 'Stacking order of the ribbon relative to the others.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content rendered beneath the ribbons.',
      },
    ],
    expose: [],
  },
}

export default ribbonConfig
