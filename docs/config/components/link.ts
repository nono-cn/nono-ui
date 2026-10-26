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
      title: 'Roles and attributes',
      description:
        'Use a descriptive label or default slot, and give icon-only links an aria-label. HTML and ARIA attributes, class, and style are passed to the root element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['a', 'Root with to', 'Anchor for internal and external destinations.'],
          ['href', 'Root with to', 'The resolved destination.'],
          [
            'div',
            'Root without to',
            'Not focusable, so only use it for content that does not navigate.',
          ],
          [
            'aria-hidden="true"',
            'Icons',
            'Icons are decorative, so the label must carry the meaning.',
          ],
        ],
      },
    },
    {
      title: 'Keyboard',
      description: 'A link without to is not focusable.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Tab', 'Moves focus to the link.'],
          ['Enter', 'Follows the link.'],
        ],
      },
    },
    {
      title: 'External destinations',
      description:
        'External links do not get target or rel by default. Use target="_blank" only when opening a new tab is intentional, and pair it with rel="noopener noreferrer".',
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
