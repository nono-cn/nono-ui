import type { ComponentDocConfig } from '../component-docs'
import {
  ribbonDefaults,
  ribbonItemDefaults,
  ribbonPositions,
  ribbonRotations,
} from '@/components/ui/Ribbon'
import { formatValue } from '../format-default'
import RibbonBasicExample from '../../components/examples/ribbon/RibbonBasicExample.vue'
import RibbonPositionExample from '../../components/examples/ribbon/RibbonPositionExample.vue'
import RibbonColorExample from '../../components/examples/ribbon/RibbonColorExample.vue'
import RibbonMultipleExample from '../../components/examples/ribbon/RibbonMultipleExample.vue'
import RibbonSlotsExample from '../../components/examples/ribbon/RibbonSlotsExample.vue'
import RibbonUiExample from '../../components/examples/ribbon/RibbonUiExample.vue'

const ribbonConfig: ComponentDocConfig = {
  slug: 'ribbon',
  title: 'Ribbon',
  language: 'en',
  description: 'Highlights a card or container with diagonal corner ribbons.',
  importPath: '@nono-ui/components/ui/Ribbon',
  usage: [
    {
      title: 'Basic usage',
      description: 'Mark a card with a corner ribbon.',
      component: RibbonBasicExample,
    },
  ],
  examples: [
    {
      title: 'Position',
      description: 'Place the ribbon on any corner and override its rotation.',
      component: RibbonPositionExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme color or custom CSS color for each ribbon.',
      component: RibbonColorExample,
    },
    {
      title: 'Multiple ribbons',
      description: 'Combine ribbons on different corners; later ribbons stack above earlier ones.',
      component: RibbonMultipleExample,
    },
    {
      title: 'Slots',
      description: 'Customize every label, or one ribbon through its slot key.',
      component: RibbonSlotsExample,
    },
    {
      title: 'UI',
      description: 'Customize the band, label, and content wrapper attributes.',
      component: RibbonUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Decorative bands',
      description:
        'Ribbon bands are hidden from assistive technologies with aria-hidden. If a ribbon carries information users need, such as a discount or a status, repeat it in the content.',
    },
  ],
  api: {
    props: [
      {
        name: 'ribbons',
        type: 'RibbonItem[]',
        typeLink: '#ribbon-item',
        default: '[]',
        description: 'Ribbons to render, in stacking order.',
      },
      {
        name: 'ui',
        type: `{
  band?: (context: RibbonItemContext) => HTMLAttributes
  label?: (context: RibbonItemContext) => HTMLAttributes
  content?: () => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  band?: (context: ' },
          { text: 'RibbonItemContext', link: '#ribbon-item-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'RibbonItemContext', link: '#ribbon-item-context' },
          { text: ') => HTMLAttributes\n  content?: () => HTMLAttributes\n}' },
        ],
        default: String(ribbonDefaults.ui),
        description:
          'Resolvers for attributes and classes on each band, each label, and the content wrapper.',
      },
    ],
    configs: [
      {
        id: 'ribbon-item',
        title: 'RibbonItem',
        typeLabel: 'RibbonItem',
        rows: [
          {
            name: 'label',
            type: 'string',
            default: 'undefined',
            description: 'Text shown in the band.',
          },
          {
            name: 'slot',
            type: 'string',
            default: 'undefined',
            description: 'Key used in the targeted label slot, such as label-sale.',
          },
          {
            name: 'color',
            type: 'string',
            default: formatValue(ribbonItemDefaults.color),
            description: 'Theme token or CSS color for the band.',
          },
          {
            name: 'position',
            type: ribbonPositions.map((value) => `'${value}'`).join(' | '),
            default: formatValue(ribbonItemDefaults.position),
            description: 'Corner where the band is placed.',
          },
          {
            name: 'rotate',
            type: 'number',
            default: 'undefined',
            description: `Rotation in degrees. Defaults to the corner rotation: ${ribbonPositions
              .map((position) => `${position} ${ribbonRotations[position]}`)
              .join(', ')}.`,
          },
          {
            name: 'zIndex',
            type: 'number',
            default: `${ribbonItemDefaults.zIndex} + index`,
            description: 'Stacking order of the band; later ribbons stack above by default.',
          },
        ],
      },
      {
        id: 'ribbon-item-context',
        title: 'RibbonItemContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the label slots and the band and label resolvers.',
        rows: [
          {
            name: 'item',
            type: 'RibbonItem',
            typeLink: '#ribbon-item',
            description: 'Configuration for this ribbon.',
          },
          { name: 'index', type: 'number', description: 'Zero-based position in ribbons.' },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content highlighted by the ribbons.',
      },
      {
        name: 'label',
        type: 'RibbonItemContext',
        typeLink: '#ribbon-item-context',
        description: 'Shared label content, replacing the label of every ribbon.',
      },
      {
        name: 'label-[slot]',
        type: 'RibbonItemContext',
        typeLink: '#ribbon-item-context',
        description: 'Label content for the ribbon with that slot key.',
      },
    ],
    expose: [],
  },
}

export default ribbonConfig
