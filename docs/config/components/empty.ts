import type { ComponentDocConfig } from '../component-docs'
import EmptyDefaultExample from '../../components/examples/empty/EmptyDefaultExample.vue'
import EmptyDescriptionExample from '../../components/examples/empty/EmptyDescriptionExample.vue'
import EmptyLabelExample from '../../components/examples/empty/EmptyLabelExample.vue'
import EmptyMediaVariantExample from '../../components/examples/empty/EmptyMediaVariantExample.vue'
import EmptyUsageExample from '../../components/examples/empty/EmptyUsageExample.vue'

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
      title: 'Label',
      description: 'Set the main title of the empty state.',
      component: EmptyLabelExample,
    },
    {
      title: 'Description',
      description: 'Add supporting information to the empty state.',
      component: EmptyDescriptionExample,
    },
    {
      title: 'Media variant',
      description: 'Apply the icon visual style to the media content.',
      component: EmptyMediaVariantExample,
    },
  ],
  accessibility: [
    {
      title: 'Status message',
      description:
        'Provide a clear label and description. Actions in the content should have accessible names, and the message should not rely solely on an icon or color.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Title of the empty state.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Supporting text for the empty state.',
      },
      {
        name: 'mediaVariant',
        type: "'default' | 'icon'",
        default: "'default'",
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
        default: 'undefined',
        description: 'Resolvers for customizing the attributes of the inner regions.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Main content, such as actions or links.' },
      { name: 'media', type: '-', description: 'Icon, illustration, or other visual content.' },
      { name: 'label', type: '-', description: 'Replaces the label text.' },
      { name: 'description', type: '-', description: 'Replaces the description text.' },
    ],
    expose: [],
  },
}

export default emptyConfig
