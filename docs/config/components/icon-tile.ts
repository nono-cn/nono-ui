import type { ComponentDocConfig } from '../component-docs'
import { iconTileDefaults, iconTileSizes, iconTileVariantNames } from '@/components/ui/IconTile'
import IconTileIconExample from '../../components/examples/icon-tile/IconTileIconExample.vue'
import IconTileUsageExample from '../../components/examples/icon-tile/IconTileUsageExample.vue'
import IconTileVariantExample from '../../components/examples/icon-tile/IconTileVariantExample.vue'
import IconTileSizeExample from '../../components/examples/icon-tile/IconTileSizeExample.vue'
import IconTileRadiusExample from '../../components/examples/icon-tile/IconTileRadiusExample.vue'
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
      title: 'Icon',
      description: 'Choose the icon shown inside the tile.',
      component: IconTileIconExample,
    },
    {
      title: 'Variant',
      description: 'Choose an outline, elevated, soft, solid, or framed surface.',
      component: IconTileVariantExample,
    },
    {
      title: 'Size',
      description: 'Scale the tile and its default icon together.',
      component: IconTileSizeExample,
    },
    {
      title: 'Radius',
      description: 'Choose a Tailwind radius or set a custom radius in pixels.',
      component: IconTileRadiusExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or a custom hexadecimal color.',
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
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        required: true,
        description: 'Registered icon name rendered inside the tile.',
      },
      {
        name: 'variant',
        type: iconTileVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${iconTileDefaults.variant}'`,
        description: 'Surface treatment of the tile.',
      },
      {
        name: 'size',
        type: iconTileSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${iconTileDefaults.size}'`,
        description: 'Tile size from 24px to 64px. The default icon scales with the tile.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${iconTileDefaults.radius}'`,
        description:
          'Tailwind radius token, CSS border-radius value, or a number of pixels such as 12.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${iconTileDefaults.color}'`,
        description:
          'Theme token such as primary, neutral, or success, a custom token, or a CSS color such as #7c3aed. Named tokens fall back to neutral.',
      },
    ],
    emits: [],
    slots: [],
    expose: [],
  },
}

export default iconTileConfig
