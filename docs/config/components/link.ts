import type { ComponentDocConfig } from '../component-docs'
import { linkDefaults } from '@/components/ui/Link'
import LinkUsageExample from '../../components/examples/link/LinkUsageExample.vue'
import LinkDestinationsExample from '../../components/examples/link/LinkDestinationsExample.vue'
import LinkReplaceExample from '../../components/examples/link/LinkReplaceExample.vue'
import LinkAppearanceExample from '../../components/examples/link/LinkAppearanceExample.vue'
import LinkContentExample from '../../components/examples/link/LinkContentExample.vue'
import LinkClickExample from '../../components/examples/link/LinkClickExample.vue'

const linkConfig: ComponentDocConfig = {
  slug: 'link',
  title: 'Link',
  language: 'en',
  description: 'Navigation link with Button appearance, icons, and router integration.',
  importPath: '@nono-ui/components/ui/Link',
  usage: [
    {
      title: 'Basic usage',
      description: 'Navigate to a route in the application.',
      component: LinkUsageExample,
    },
  ],
  examples: [
    {
      title: 'Destinations',
      description: 'Link to an internal route or external URL, or omit a destination.',
      component: LinkDestinationsExample,
    },
    {
      title: 'Replace history',
      description: 'Replace the current history entry when navigating internally.',
      component: LinkReplaceExample,
    },
    {
      title: 'Appearance',
      description: 'Configure the Button props inherited by Link.',
      component: LinkAppearanceExample,
    },
    {
      title: 'Content and icons',
      description: 'Use inherited icon props and Button slots.',
      component: LinkContentExample,
    },
    {
      title: 'Click event',
      description: 'Respond to a click on the link.',
      component: LinkClickExample,
    },
  ],
  accessibility: [
    {
      title: 'Navigation semantics',
      description:
        'Provide to when the element should navigate: internal and external destinations render an anchor. Without to, Link renders a div and should only present noninteractive content. Use a descriptive label or default slot; icon-only links need an aria-label.',
    },
    {
      title: 'External destinations',
      description:
        'Use target="_blank" only when opening a new tab is intentional. Pair it with rel="noopener noreferrer". HTML and ARIA attributes, class, and style are passed to the root element.',
    },
  ],
  api: {
    props: [
      {
        name: '...ButtonProps',
        type: "Omit<ButtonProps, 'as' | 'asChild' | 'loading'>",
        typeLink: '/components/button#props',
        description:
          'Includes label, variant, size, radius, color, icon, and trailingIcon. Link defaults variant to link; the other inherited defaults match Button.',
      },
      {
        name: 'to',
        type: 'RouteLocationRaw',
        default: String(linkDefaults.to),
        description:
          'Internal route as a string or route object, or an external URL string. When omitted, the root is a div.',
      },
      {
        name: 'replace',
        type: 'boolean',
        default: String(linkDefaults.replace),
        description: 'Replace the current history entry for internal navigation.',
      },
    ],
    emits: [
      {
        name: 'click',
        type: '[event: PointerEvent]',
        description: 'Emitted when the underlying Button accepts a click.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Button default slot; replaces the label fallback.',
      },
      { name: 'leading', type: '-', description: 'Button leading slot; replaces icon.' },
      {
        name: 'trailing',
        type: '-',
        description: 'Button trailing slot; replaces trailingIcon.',
      },
    ],
    expose: [],
  },
}

export default linkConfig
