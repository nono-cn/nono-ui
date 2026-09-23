import type { ComponentDocConfig } from '../component-docs'
import AspectRatioBasicExample from '../../components/examples/aspect-ratio/AspectRatioBasicExample.vue'
import AspectRatioVideoExample from '../../components/examples/aspect-ratio/AspectRatioVideoExample.vue'
import AspectRatioRatiosExample from '../../components/examples/aspect-ratio/AspectRatioRatiosExample.vue'

const aspectRatioConfig: ComponentDocConfig = {
  slug: 'aspect-ratio',
  title: 'AspectRatio',
  language: 'en',
  description: 'Maintains a consistent aspect ratio for images, videos, and responsive content.',
  importPath: '@nono-ui/components/ui/AspectRatio',
  usage: [
    {
      title: 'Responsive content',
      description: 'Keep a square ratio for visual content.',
      component: AspectRatioBasicExample,
    },
  ],
  examples: [
    {
      title: 'Widescreen format',
      description: 'Use a 16:9 ratio for videos and audiovisual content.',
      component: AspectRatioVideoExample,
    },
    {
      title: 'Different aspect ratios',
      description: 'Compare several aspect ratios to choose the best fit.',
      component: AspectRatioRatiosExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible content',
      description:
        'AspectRatio only controls the container’s proportions; it does not add a name or an interactive role. Provide descriptive alt text for informative images, captions and accessible controls for videos, and an appropriate name for any interactive content placed in the default slot. The aspect ratio is a visual choice and should not be the only way to convey information.',
    },
  ],
  api: {
    props: [
      {
        name: 'ratio',
        type: 'number',
        default: '1',
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
