import type { ComponentDocConfig } from '../component-docs'
import IconColorExample from '../../components/examples/icon/IconColorExample.vue'
import IconNameExample from '../../components/examples/icon/IconNameExample.vue'
import IconSizeExample from '../../components/examples/icon/IconSizeExample.vue'
import IconUsageExample from '../../components/examples/icon/IconUsageExample.vue'

const iconConfig: ComponentDocConfig = {
  slug: 'icon',
  title: 'Icon',
  language: 'en',
  description: 'Renders a Lucide icon with a compact, consistent API.',
  importPath: '@nono-ui/components/ui/Icon',
  usage: [
    {
      title: 'Basic usage',
      description: 'Start by specifying the name of the icon to render.',
      component: IconUsageExample,
    },
  ],
  examples: [
    {
      title: 'Name',
      description: 'Select an icon by its registered library name.',
      component: IconNameExample,
    },
    {
      title: 'Size',
      description: 'Adjust the icon’s visual size.',
      component: IconSizeExample,
    },
    {
      title: 'Color',
      description: 'Apply a custom CSS color to the icon.',
      component: IconColorExample,
    },
  ],
  accessibility: [
    {
      title: 'Decorative and semantic icons',
      description:
        'Hide decorative icons with aria-hidden="true". Give informative icons an accessible name (aria-label / aria-labelledby) on their containing element, or provide visible text. Do not rely on the icon or color alone to communicate information.',
    },
  ],
  api: {
    props: [
      {
        name: 'name',
        type: 'IconName',
        required: true,
        description: 'Name of the icon to render.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Visual size of the icon.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'currentColor'",
        description: 'CSS color applied to the icon.',
      },
    ],
    configs: [
      {
        id: 'icon-config',
        title: 'IconConfig',
        description:
          'IconConfig combines IconProps and HTMLAttributes. HTML and ARIA attributes, along with native event listeners such as onClick and onFocus, are applied to the root SVG.',
        showDefault: false,
        rows: [
          {
            name: 'IconProps',
            type: 'IconProps',
            typeLink: '#props',
            description: 'Includes the Icon component’s name, size, and color props.',
          },
          {
            name: 'HTMLAttributes',
            type: 'HTMLAttributes',
            description:
              'Includes HTML and ARIA attributes, class, style, and DOM event listeners such as onClick and onFocus.',
          },
        ],
      },
    ],
    emits: [],
    slots: [],
    expose: [],
  },
}

export default iconConfig
