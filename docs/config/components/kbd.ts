import type { ComponentDocConfig } from '../component-docs'
import { kbdDefaults, kbdSizes, kbdVariantNames } from '@/components/ui/Kbd'
import KbdColorExample from '../../components/examples/kbd/KbdColorExample.vue'
import KbdRadiusExample from '../../components/examples/kbd/KbdRadiusExample.vue'
import KbdGroupExample from '../../components/examples/kbd/KbdGroupExample.vue'
import KbdSizeExample from '../../components/examples/kbd/KbdSizeExample.vue'
import KbdUsageExample from '../../components/examples/kbd/KbdUsageExample.vue'
import KbdVariantExample from '../../components/examples/kbd/KbdVariantExample.vue'

const kbdConfig: ComponentDocConfig = {
  slug: 'kbd',
  title: 'Kbd',
  language: 'en',
  description: 'Displays a key or keyboard shortcut with consistent semantic styling.',
  importPath: '@nono-ui/components/ui/Kbd',
  usage: [
    {
      title: 'Basic usage',
      description: 'Start by displaying a key with its visible label.',
      component: KbdUsageExample,
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Choose the visual style applied to the key.',
      component: KbdVariantExample,
    },
    {
      title: 'Size',
      description: 'Adjust the key’s visual size.',
      component: KbdSizeExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or custom color.',
      component: KbdColorExample,
    },
    {
      title: 'Radius',
      description: 'Choose the corner radius of the key.',
      component: KbdRadiusExample,
    },
    {
      title: 'Keyboard shortcuts',
      description: 'Combine keys with KbdGroup.',
      component: KbdGroupExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible content',
      description:
        'Kbd and KbdGroup render semantic kbd elements and forward HTML and ARIA attributes, class, and style to their roots. Keep the shortcut visible and give combined keys a readable name or nearby text context. Do not rely on color alone to communicate an action.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: String(kbdDefaults.label),
        description: 'Text displayed when no content is provided in the default slot.',
      },
      {
        name: 'size',
        type: kbdSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${kbdDefaults.size}'`,
        description: 'Visual size of the key.',
      },
      {
        name: 'variant',
        type: kbdVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${kbdDefaults.variant}'`,
        description: 'Visual style applied to the key.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${kbdDefaults.color}'`,
        description: 'Theme token or CSS color used by the key variants.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${kbdDefaults.radius}'`,
        description: 'Tailwind radius token, CSS border-radius value, or a number of pixels.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Custom content that overrides the label value.',
      },
    ],
    expose: [],
  },
}

export default kbdConfig
