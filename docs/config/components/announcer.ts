import type { ComponentDocConfig } from '../component-docs'
import AnnouncerBasicExample from '../../components/examples/announcer/AnnouncerBasicExample.vue'
import AnnouncerPolitenessExample from '../../components/examples/announcer/AnnouncerPolitenessExample.vue'
import AnnouncerSlotExample from '../../components/examples/announcer/AnnouncerSlotExample.vue'

const announcerConfig: ComponentDocConfig = {
  slug: 'announcer',
  title: 'Announcer',
  language: 'en',
  description: 'Announces dynamic updates to screen readers without adding visible content.',
  importPath: '@nono-ui/components/ui/Announcer',
  usage: [
    {
      title: 'Basic message',
      description: 'Announce a dynamic update with the default configuration.',
      component: AnnouncerBasicExample,
    },
  ],
  examples: [
    {
      title: 'Politeness',
      description: 'Choose the announcement priority level.',
      component: AnnouncerPolitenessExample,
    },
    {
      title: 'Custom content',
      description: 'Use the default slot when you need control over the announced content.',
      component: AnnouncerSlotExample,
    },
  ],
  accessibility: [
    {
      title: 'Live regions',
      description:
        'Announcer renders a span with aria-live and aria-atomic, forwards HTML and ARIA attributes, class, and style to the root element, and stays visually hidden when no default slot is provided. Use assertive politeness only for urgent updates, and avoid announcing the same state multiple times.',
    },
  ],
  api: {
    props: [
      {
        name: 'atomic',
        type: 'boolean',
        default: 'true',
        description:
          'Determines whether the entire region is announced when part of its content changes.',
      },
      {
        name: 'message',
        type: 'string',
        default: "''",
        description: 'Message announced when no content is provided in the default slot.',
      },
      {
        name: 'politeness',
        type: "'assertive' | 'polite' | 'off'",
        default: "'polite'",
        description:
          'Value for aria-live. Also determines the role: alert for assertive, status for polite, and no role for off.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description:
          'Custom content announced by the region. When provided, the content is no longer visually hidden.',
      },
    ],
    expose: [],
  },
}

export default announcerConfig
