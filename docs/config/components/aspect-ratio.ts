import type { ComponentDocConfig } from '../component-docs'
import { aspectRatioDefaults } from '@/components/ui/AspectRatio'
import AspectRatioBasicExample from '../../components/examples/aspect-ratio/AspectRatioBasicExample.vue'
import AspectRatioRatiosExample from '../../components/examples/aspect-ratio/AspectRatioRatiosExample.vue'

const aspectRatioConfig: ComponentDocConfig = {
  slug: 'aspect-ratio',
  title: 'AspectRatio',
  language: 'en',
  description: 'Maintains a consistent aspect ratio for images, videos, and other content.',
  importPath: '@nono-ui/components/ui/AspectRatio',
  usage: [
    {
      title: 'Basic usage',
      description: 'Set a ratio to keep content within consistent proportions.',
      component: AspectRatioBasicExample,
    },
  ],
  examples: [
    {
      title: 'Aspect ratio',
      description: 'Choose a common ratio and see how it shapes the content area.',
      component: AspectRatioRatiosExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'AspectRatio only controls the proportions of its container. It adds no role or name, and the content keeps its own semantics.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [['div', 'Root', 'Generic container with no role.']],
      },
    },
    {
      title: 'Content',
      description:
        'Provide descriptive alt text for informative images, captions and accessible controls for videos, and a name for any interactive content in the default slot. The ratio is a visual choice and should not be the only way to convey information.',
    },
  ],
  api: {
    props: [
      {
        name: 'ratio',
        type: 'number',
        default: String(aspectRatioDefaults.ratio),
        description: 'Ratio between the container’s width and height.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content rendered inside the aspect ratio container.',
      },
    ],
    expose: [],
  },
}

export default aspectRatioConfig
