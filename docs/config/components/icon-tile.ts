import type { ComponentDocConfig } from '../component-docs'
import IconTileUsageExample from '../../components/examples/icon-tile/IconTileUsageExample.vue'
import IconTileVariantExample from '../../components/examples/icon-tile/IconTileVariantExample.vue'
import IconTileSizeExample from '../../components/examples/icon-tile/IconTileSizeExample.vue'
import IconTileShapeExample from '../../components/examples/icon-tile/IconTileShapeExample.vue'
import IconTileSeverityExample from '../../components/examples/icon-tile/IconTileSeverityExample.vue'
import IconTileColorExample from '../../components/examples/icon-tile/IconTileColorExample.vue'

const iconTileConfig: ComponentDocConfig = {
  slug: 'icon-tile',
  title: 'Icon Tile',
  language: 'en',
  description: 'Displays an icon inside a consistently sized decorative surface.',
  importPath: '@nono-ui/components/ui/IconTile',
  usage: [
    {
      title: 'Basic usage',
      description: 'Provide an icon name to display an icon inside the tile.',
      component: IconTileUsageExample,
    },
  ],
  examples: [
    {
      title: 'Variants',
      description: 'Choose a solid, outline, elevated, or framed surface.',
      component: IconTileVariantExample,
    },
    {
      title: 'Sizes',
      description: 'Scale the tile and its default icon together.',
      component: IconTileSizeExample,
    },
    {
      title: 'Shape',
      description: 'Use a rounded square or circular tile.',
      component: IconTileShapeExample,
    },
    {
      title: 'Severity',
      description: 'Choose a semantic tone for the icon and tile.',
      component: IconTileSeverityExample,
    },
    {
      title: 'Color',
      description: 'Set a custom color for the icon and tile.',
      component: IconTileColorExample,
    },
  ],
  accessibility: [
    {
      title: 'Decorative and informative tiles',
      description:
        'The tile is a non-interactive div. Decorative icons are hidden from assistive technology by Icon. Add an accessible name with aria-label when the tile itself conveys information, and wrap it in a button or link when it is interactive.',
    },
  ],
  api: {
    props: [
      {
        name: 'iconName',
        type: 'IconName',
        typeLink: '/components/icon#props',
        required: true,
        description: 'Registered icon name rendered inside the tile.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'elevated' | 'frame'",
        default: "'outline'",
        description: 'Surface treatment of the tile.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Tile size from 24px to 64px. The default icon scales with the tile.',
      },
      {
        name: 'shape',
        type: "'rounded' | 'full'",
        default: "'rounded'",
        description: 'Rounded-square or circular tile shape.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Semantic tone applied to the icon and tile surface.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom color that overrides the semantic severity tone.',
      },
    ],
    emits: [],
    slots: [],
    expose: [],
  },
}

export default iconTileConfig
