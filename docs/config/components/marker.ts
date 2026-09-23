import type { ComponentDocConfig } from '../component-docs'
import MarkerBasicExample from '../../components/examples/marker/MarkerBasicExample.vue'
import MarkerVariantsExample from '../../components/examples/marker/MarkerVariantsExample.vue'
import MarkerShimmerExample from '../../components/examples/marker/MarkerShimmerExample.vue'

const markerConfig: ComponentDocConfig = {
  slug: 'marker',
  title: 'Marker',
  language: 'en',
  description: 'Status indicator for displaying brief information about an operation or process.',
  importPath: '@nono-ui/components/ui/Marker',
  usage: [
    {
      title: 'Basic marker',
      description: 'Show a brief message with an optional decorative icon.',
      component: MarkerBasicExample,
    },
  ],
  examples: [
    {
      title: 'Variants',
      description: 'Choose from the default, border, and separator styles.',
      component: MarkerVariantsExample,
    },
    {
      title: 'Shimmer',
      description: 'Apply a pulse animation while content is being processed.',
      component: MarkerShimmerExample,
    },
  ],
  accessibility: [
    {
      title: 'Status messages',
      description:
        'Use status=true only for status updates that should be exposed as role="status", and keep visible text that explains the change. The component forwards HTML attributes, class, style, data-*, and ARIA to the root element. Configured icons are marked as decorative with aria-hidden="true", so they should not be the only source of information.',
    },
  ],
  api: {
    props: [
      {
        name: 'variant',
        type: "'default' | 'border' | 'separator'",
        default: "'default'",
        description: 'Visual style applied to the indicator.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Icon configuration displayed before the content.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Text displayed when no content is provided in the default slot.',
      },
      {
        name: 'status',
        type: 'boolean',
        default: 'false',
        description: 'When true, sets role="status" on the root element.',
      },
      {
        name: 'shimmer',
        type: 'boolean',
        default: 'false',
        description: 'Applies the pulse animation to the root element.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Main indicator content; overrides the label fallback.',
      },
      {
        name: 'icon',
        type: '-',
        description: 'Content displayed before the main content; overrides the icon fallback.',
      },
    ],
    expose: [],
  },
}

export default markerConfig
