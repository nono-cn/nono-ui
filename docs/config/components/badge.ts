import type { ComponentDocConfig } from '../component-docs'
import { badgeDefaults, badgeSizes, badgeVariantNames } from '@/components/ui/Badge'
import BadgeLabelExample from '../../components/examples/badge/BadgeLabelExample.vue'
import BadgeColorExample from '../../components/examples/badge/BadgeColorExample.vue'
import BadgeIconExample from '../../components/examples/badge/BadgeIconExample.vue'
import BadgeRadiusExample from '../../components/examples/badge/BadgeRadiusExample.vue'
import BadgeSizeExample from '../../components/examples/badge/BadgeSizeExample.vue'
import BadgeTrailingIconExample from '../../components/examples/badge/BadgeTrailingIconExample.vue'
import BadgeSlotsExample from '../../components/examples/badge/BadgeSlotsExample.vue'
import BadgeUsageExample from '../../components/examples/badge/BadgeUsageExample.vue'
import BadgeVariantExample from '../../components/examples/badge/BadgeVariantExample.vue'

const badgeConfig: ComponentDocConfig = {
  slug: 'badge',
  title: 'Badge',
  language: 'en',
  description: 'A compact label for statuses, categories, and metadata.',
  importPath: '@nono-ui/components/ui/Badge',
  usage: [
    {
      title: 'Basic usage',
      description: 'Start with a badge using its default configuration.',
      component: BadgeUsageExample,
    },
  ],
  examples: [
    {
      title: 'Label',
      description: 'Edit the text displayed inside the badge.',
      component: BadgeLabelExample,
    },
    {
      title: 'Variant',
      description: 'Choose the visual style applied to the badge.',
      component: BadgeVariantExample,
    },
    {
      title: 'Size',
      description: 'Choose the badge size, internal spacing, and icon size.',
      component: BadgeSizeExample,
    },
    {
      title: 'Radius',
      description: 'Choose the corner radius of the badge.',
      component: BadgeRadiusExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or custom color and see how each variant applies it.',
      component: BadgeColorExample,
    },
    {
      title: 'Icon',
      description: 'Choose a leading icon for the badge.',
      component: BadgeIconExample,
    },
    {
      title: 'Trailing icon',
      description: 'Choose an icon displayed at the end of the badge.',
      component: BadgeTrailingIconExample,
    },
    {
      title: 'Custom slots',
      description: 'Replace the label and icon fallbacks with custom slot content.',
      component: BadgeSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Content and semantics',
      description:
        'Use visible text to communicate status and add ARIA semantics only when needed. Do not rely on color alone to convey a badge’s meaning.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: String(badgeDefaults.label),
        description: 'Text displayed when no content is provided in the default slot.',
      },
      {
        name: 'size',
        type: badgeSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${badgeDefaults.size}'`,
        description: 'Visual size and internal spacing of the badge and its icons.',
      },
      {
        name: 'variant',
        type: badgeVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${badgeDefaults.variant}'`,
        description: 'Visual style applied to the badge.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${badgeDefaults.radius}'`,
        description: 'Tailwind radius token, CSS border-radius value, or a number of pixels.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${badgeDefaults.color}'`,
        description: 'Theme token or CSS color used by the badge variants.',
      },
      {
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: String(badgeDefaults.icon),
        description: 'Name of the icon displayed at the start when no leading slot is provided.',
      },
      {
        name: 'trailingIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: String(badgeDefaults.trailingIcon),
        description: 'Name of the icon displayed at the end when no trailing slot is provided.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Main badge content; overrides the label fallback.',
      },
      {
        name: 'leading',
        type: '-',
        description: 'Content displayed at the start; overrides the icon fallback.',
      },
      {
        name: 'trailing',
        type: '-',
        description: 'Content displayed at the end; overrides the trailingIcon fallback.',
      },
    ],
    expose: [],
  },
}

export default badgeConfig
