import type { ComponentDocConfig } from '../component-docs'
import { announcerDefaults, announcerPolitenessOptions } from '@/components/ui/Announcer'
import AnnouncerBasicExample from '../../components/examples/announcer/AnnouncerBasicExample.vue'
import AnnouncerMessageExample from '../../components/examples/announcer/AnnouncerMessageExample.vue'
import AnnouncerPolitenessExample from '../../components/examples/announcer/AnnouncerPolitenessExample.vue'
import AnnouncerAtomicExample from '../../components/examples/announcer/AnnouncerAtomicExample.vue'
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
      title: 'Message',
      description: 'Customize the message announced to screen readers.',
      component: AnnouncerMessageExample,
    },
    {
      title: 'Politeness',
      description: 'Choose how urgently the message is announced.',
      component: AnnouncerPolitenessExample,
    },
    {
      title: 'Atomic announcements',
      description: 'Control whether assistive technology announces the entire region.',
      component: AnnouncerAtomicExample,
    },
    {
      title: 'Custom content',
      description: 'Use the default slot to announce formatted content.',
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
        default: String(announcerDefaults.atomic),
        description:
          'Determines whether the entire region is announced when part of its content changes.',
      },
      {
        name: 'message',
        type: 'string',
        default: `'${announcerDefaults.message}'`,
        description: 'Message announced when no content is provided in the default slot.',
      },
      {
        name: 'politeness',
        type: announcerPolitenessOptions.map((option) => `'${option}'`).join(' | '),
        default: `'${announcerDefaults.politeness}'`,
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
