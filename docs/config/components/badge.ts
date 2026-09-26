import type { ComponentDocConfig } from '../component-docs'
import BadgeColorExample from '../../components/examples/badge/BadgeColorExample.vue'
import BadgeIconExample from '../../components/examples/badge/BadgeIconExample.vue'
import BadgeSeverityExample from '../../components/examples/badge/BadgeSeverityExample.vue'
import BadgeSizeExample from '../../components/examples/badge/BadgeSizeExample.vue'
import BadgeTrailingIconExample from '../../components/examples/badge/BadgeTrailingIconExample.vue'
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
      title: 'Variant',
      description: 'Compare the badge’s visual variants.',
      component: BadgeVariantExample,
    },
    {
      title: 'Severity',
      description: 'Compare badge severities.',
      component: BadgeSeverityExample,
    },
    {
      title: 'Size',
      description: 'Adjust the badge’s visual size.',
      component: BadgeSizeExample,
    },
    {
      title: 'Color',
      description: 'Apply a custom CSS color.',
      component: BadgeColorExample,
    },
    {
      title: 'Icon',
      description: 'Add a leading icon.',
      component: BadgeIconExample,
    },
    {
      title: 'Trailing icon',
      description: 'Add a trailing icon.',
      component: BadgeTrailingIconExample,
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
        type: 'IconName | IconConfig',
        typeParts: [
          { text: 'IconName' },
          { text: ' | ' },
          { text: 'IconConfig', link: '/components/icon#icon-config' },
        ],
        default: 'undefined',
        description:
          'Icon name or full configuration displayed at the start when no leading slot is provided.',
      },
      {
        name: 'trailingIcon',
        type: 'IconName | IconConfig',
        typeParts: [
          { text: 'IconName' },
          { text: ' | ' },
          { text: 'IconConfig', link: '/components/icon#icon-config' },
        ],
        default: 'undefined',
        description:
          'Icon name or full configuration displayed at the end when no trailing slot is provided.',
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
