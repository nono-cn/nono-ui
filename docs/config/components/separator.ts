import type { ComponentDocConfig } from '../component-docs'
import SeparatorHorizontalExample from '../../components/examples/separator/SeparatorHorizontalExample.vue'
import SeparatorVerticalExample from '../../components/examples/separator/SeparatorVerticalExample.vue'

const separatorConfig: ComponentDocConfig = {
  slug: 'separator',
  title: 'Separator',
  language: 'en',
  description: 'Visually separates content and communicates semantic divisions when needed.',
  importPath: '@nono-ui/components/ui/Separator',
  usage: [
    {
      title: 'Basic usage',
      description: 'Separate sections using the default horizontal orientation.',
      component: SeparatorHorizontalExample,
    },
  ],
  examples: [
    {
      title: 'Vertical separation',
      description: 'Divide items arranged in a row and spans the height of the container.',
      component: SeparatorVerticalExample,
    },
  ],
  accessibility: [
    {
      title: 'Decorative and semantic separators',
      description:
        'HTML attributes, class, style, data-*, and ARIA attributes are forwarded to the root element. Use decorative=false to expose a semantic separator, and use aria-label only when additional context is needed. Do not rely on color or thickness alone to communicate information.',
      links: [
        {
          label: 'See the Separator accessibility guide in Reka UI',
          href: 'https://www.reka-ui.com/docs/components/separator#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Determines whether the line divides content horizontally or vertically.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: 'true',
        description:
          'When true, the separator is treated as purely visual content and excluded from the accessibility tree.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Optional content rendered inside the separator root element.',
      },
    ],
    expose: [],
  },
}

export default separatorConfig
