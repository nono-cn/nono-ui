import type { ComponentDocConfig } from '../component-docs'
import { cardDefaults } from '@/components/ui/Card'
import CardBasicExample from '../../components/examples/card/CardBasicExample.vue'
import CardActionExample from '../../components/examples/card/CardActionExample.vue'
import CardHeaderExample from '../../components/examples/card/CardHeaderExample.vue'
import CardLabelDescriptionExample from '../../components/examples/card/CardLabelDescriptionExample.vue'
import CardUiExample from '../../components/examples/card/CardUiExample.vue'
import CardSlotsExample from '../../components/examples/card/CardSlotsExample.vue'

const cardConfig: ComponentDocConfig = {
  slug: 'card',
  title: 'Card',
  language: 'en',
  description:
    'Surface with an optional header, content, and footer for grouping related information.',
  importPath: '@nono-ui/components/ui/Card',
  usage: [
    {
      title: 'Basic card',
      description: 'Use label and description to generate the header automatically.',
      component: CardBasicExample,
    },
  ],
  examples: [
    {
      title: 'Label and description',
      description: 'Edit the generated heading and supporting text.',
      component: CardLabelDescriptionExample,
    },
    {
      title: 'Action and footer',
      description: 'Add actions to the header and supporting content to the footer.',
      component: CardActionExample,
    },
    {
      title: 'Custom header',
      description: 'Replace the generated heading and description with the header slot.',
      component: CardHeaderExample,
    },
    {
      title: 'Label and description slots',
      description: 'Replace the generated heading and description content.',
      component: CardSlotsExample,
    },
    {
      title: 'UI',
      description: 'Customize the attributes of each card region.',
      component: CardUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Content and headings',
      description:
        'Use label to generate an h3 heading, or provide a semantic heading through the header slot. Keep a logical reading order across the header, content, and footer.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: String(cardDefaults.label),
        description: 'Card header text.',
      },
      {
        name: 'description',
        type: 'string',
        default: String(cardDefaults.description),
        description: 'Descriptive text displayed below the header.',
      },
      {
        name: 'ui',
        type: `{
  header?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  action?: () => HTMLAttributes
  content?: () => HTMLAttributes
  footer?: () => HTMLAttributes
}`,
        typePre: true,
        default: String(cardDefaults.ui),
        description:
          'Resolvers for header, label, description, action, content, and footer attributes, including class, style, and ARIA.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Main card content.' },
      {
        name: 'header',
        type: '-',
        description:
          'Replaces the generated heading and description inside the header; an action slot still renders alongside it.',
      },
      {
        name: 'label',
        type: '-',
        description: 'Replaces the generated heading text inside the h3 element.',
      },
      {
        name: 'description',
        type: '-',
        description: 'Replaces the generated description text inside the p element.',
      },
      { name: 'action', type: '-', description: 'Action displayed in the header.' },
      { name: 'footer', type: '-', description: 'Card footer content.' },
    ],
    expose: [],
  },
}

export default cardConfig
