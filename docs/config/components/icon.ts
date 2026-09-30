import type { ComponentDocConfig } from '../component-docs'
import { iconSizes } from '@/components/ui/Icon'
import IconColorExample from '../../components/examples/icon/IconColorExample.vue'
import IconNameExample from '../../components/examples/icon/IconNameExample.vue'
import IconSizeExample from '../../components/examples/icon/IconSizeExample.vue'
import IconStrokeExample from '../../components/examples/icon/IconStrokeExample.vue'
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
      description: 'Choose a palette token, inherit currentColor, or use a hexadecimal color.',
      component: IconColorExample,
    },
    {
      title: 'Stroke',
      description: 'Set the width of the icon’s lines.',
      component: IconStrokeExample,
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
        type: iconSizes.map((size) => `'${size}'`).join(' | '),
        default: "'md'",
        description: 'Visual size of the icon.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'currentColor'",
        description:
          'Theme token such as primary or success, a custom token, or a CSS color such as #6366f1. Named tokens fall back to primary. currentColor inherits the surrounding text color.',
      },
      {
        name: 'stroke',
        type: 'number',
        default: '2',
        description: 'SVG stroke width. The line scales with the rendered icon size.',
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
            description: 'Includes the Icon component’s name, size, color, and stroke props.',
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
