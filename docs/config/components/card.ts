import type { ComponentDocConfig } from '../component-docs'
import CardBasicExample from '../../components/examples/card/CardBasicExample.vue'
import CardActionExample from '../../components/examples/card/CardActionExample.vue'
import CardHeaderExample from '../../components/examples/card/CardHeaderExample.vue'

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
      title: 'Action and footer',
      description: 'Add actions to the header and supporting content to the footer.',
      component: CardActionExample,
    },
    {
      title: 'Custom header',
      description: 'Replace the generated header with the header slot.',
      component: CardHeaderExample,
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
        default: 'undefined',
        description: 'Card header text.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
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
        default: 'undefined',
        description: 'Resolvers for customizing the attributes of the card regions.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Main card content.' },
      { name: 'header', type: '-', description: 'Replaces the entire header content.' },
      { name: 'label', type: '-', description: 'Header content.' },
      { name: 'description', type: '-', description: 'Descriptive header content.' },
      { name: 'action', type: '-', description: 'Action displayed in the header.' },
      { name: 'footer', type: '-', description: 'Card footer content.' },
    ],
    expose: [],
  },
}

export default cardConfig
