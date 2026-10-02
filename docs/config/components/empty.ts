import type { ComponentDocConfig } from '../component-docs'
import { emptyDefaults, emptyMediaVariantNames } from '@/components/ui/Empty'
import EmptyDefaultExample from '../../components/examples/empty/EmptyDefaultExample.vue'
import EmptyMediaLabelDescriptionExample from '../../components/examples/empty/EmptyMediaLabelDescriptionExample.vue'
import EmptySlotsExample from '../../components/examples/empty/EmptySlotsExample.vue'
import EmptyUsageExample from '../../components/examples/empty/EmptyUsageExample.vue'

const optionType = (values: readonly string[]) => values.map((value) => `'${value}'`).join(' | ')
const quotedDefault = (value: string) => `'${value}'`

const emptyConfig: ComponentDocConfig = {
  slug: 'empty',
  title: 'Empty',
  language: 'en',
  description: 'Visual state for a section with no data or results.',
  importPath: '@nono-ui/components/ui/Empty',
  usage: [
    {
      title: 'Basic usage',
      description: 'Show an empty state with an action to continue.',
      component: EmptyUsageExample,
    },
  ],
  examples: [
    {
      title: 'Default',
      description: 'Add actions or links as the main content.',
      component: EmptyDefaultExample,
    },
    {
      title: 'Media, label & description',
      description: 'Combine the media slot with editable label and description content.',
      component: EmptyMediaLabelDescriptionExample,
    },
    {
      title: 'Slots',
      description: 'Replace the label and description, and provide custom content.',
      component: EmptySlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Meaningful empty state',
      description:
        'Empty renders a generic container and does not announce updates automatically. Provide a clear label and description, give actions accessible names, and use an appropriate live region in the surrounding context when the empty state changes dynamically.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: String(emptyDefaults.label),
        description: 'Title of the empty state.',
      },
      {
        name: 'description',
        type: 'string',
        default: String(emptyDefaults.description),
        description: 'Supporting text for the empty state.',
      },
      {
        name: 'mediaVariant',
        type: optionType(emptyMediaVariantNames),
        default: quotedDefault(emptyDefaults.mediaVariant),
        description: 'Visual style of the media slot.',
      },
      {
        name: 'ui',
        type: `{
  header?: () => HTMLAttributes
  media?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  content?: () => HTMLAttributes
}`,
        typePre: true,
        default: String(emptyDefaults.ui),
        description:
          'Resolvers for adding HTML attributes, classes, styles, and ARIA attributes to the header, media, label, description, and content regions.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Main content, such as actions or links; omitted when the slot is empty.',
      },
      {
        name: 'media',
        type: '-',
        description: 'Optional icon, illustration, or other visual content shown above the text.',
      },
      {
        name: 'label',
        type: '-',
        description: 'Custom content that replaces the label prop when provided.',
      },
      {
        name: 'description',
        type: '-',
        description: 'Custom content that replaces the description prop when provided.',
      },
    ],
    expose: [],
  },
}

export default emptyConfig
