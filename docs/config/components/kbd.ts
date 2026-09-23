import type { ComponentDocConfig } from '../component-docs'
import KbdColorExample from '../../components/examples/kbd/KbdColorExample.vue'
import KbdSeverityExample from '../../components/examples/kbd/KbdSeverityExample.vue'
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
      description: 'Compare the key’s visual variants.',
      component: KbdVariantExample,
    },
    {
      title: 'Severity',
      description: 'Compare the key’s severity levels.',
      component: KbdSeverityExample,
    },
    {
      title: 'Size',
      description: 'Adjust the key’s visual size.',
      component: KbdSizeExample,
    },
    {
      title: 'Color',
      description: 'Apply a custom CSS color.',
      component: KbdColorExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible content',
      description:
        'Kbd renders a semantic kbd element and forwards HTML and ARIA attributes, class, and style to the root element. Keep the shortcut visible and add text context when its pronunciation is unclear. Do not rely on color or visual styling alone to communicate an action.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Text displayed when no content is provided in the default slot.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Visual size of the key.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'soft' | 'subtle'",
        default: "'soft'",
        description: 'Visual style applied to the key.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'secondary'",
        description: 'Severity used to choose the colors for the visual style.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color applied to the key’s background, border, and text.',
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
