import type { ComponentDocConfig } from '../component-docs'
import BadgeLabelExample from '../../components/examples/badge/BadgeLabelExample.vue'
import BadgeColorExample from '../../components/examples/badge/BadgeColorExample.vue'
import BadgeIconExample from '../../components/examples/badge/BadgeIconExample.vue'
import BadgeSeverityExample from '../../components/examples/badge/BadgeSeverityExample.vue'
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
      title: 'Severity',
      description: 'Choose the semantic color and visual style of the badge.',
      component: BadgeSeverityExample,
    },
    {
      title: 'Size',
      description: 'Choose the badge size and internal spacing.',
      component: BadgeSizeExample,
    },
    {
      title: 'Color',
      description: 'Choose a custom color and see how each variant applies it.',
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
        default: 'undefined',
        description: 'Text displayed when no content is provided in the default slot.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Visual size and internal spacing of the badge.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
        default: "'solid'",
        description: 'Visual style applied to the badge.',
      },
      {
        name: 'severity',
        type: "'primary' | 'neutral' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Semantic severity used to choose the badge color.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color with a calculated contrasting text color.',
      },
      {
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: 'undefined',
        description: 'Name of the icon displayed at the start when no leading slot is provided.',
      },
      {
        name: 'trailingIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: 'undefined',
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
