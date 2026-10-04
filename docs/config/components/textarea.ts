import type { ComponentDocConfig } from '../component-docs'
import { textareaDefaults, textareaSizes, textareaVariantNames } from '@/components/ui/Textarea'
import TextareaBasicExample from '../../components/examples/textarea/TextareaBasicExample.vue'
import TextareaSizesExample from '../../components/examples/textarea/TextareaSizesExample.vue'
import TextareaVariantsExample from '../../components/examples/textarea/TextareaVariantsExample.vue'
import TextareaAutoresizeExample from '../../components/examples/textarea/TextareaAutoresizeExample.vue'
import TextareaAppearanceExample from '../../components/examples/textarea/TextareaAppearanceExample.vue'

const textareaConfig: ComponentDocConfig = {
  slug: 'textarea',
  title: 'Textarea',
  language: 'en',
  description: 'A multiline text field for entering longer content.',
  importPath: '@nono-ui/components/ui/Textarea',
  usage: [
    {
      title: 'Basic usage',
      description: 'Bind the field value and associate it with a visible label.',
      component: TextareaBasicExample,
    },
  ],
  examples: [
    {
      title: 'Size',
      description: 'Choose the minimum height and text size.',
      component: TextareaSizesExample,
    },
    {
      title: 'Variant',
      description: 'Choose the border and background style.',
      component: TextareaVariantsExample,
    },
    {
      title: 'Autoresize',
      description: 'Let the field grow to fit its content.',
      component: TextareaAutoresizeExample,
    },
    {
      title: 'Appearance',
      description: 'Choose the variant, color, and highlighted border together.',
      component: TextareaAppearanceExample,
    },
  ],
  accessibility: [
    {
      title: 'Label and description',
      description:
        'Associate a visible label using for and id. Use aria-describedby for helper text and aria-invalid when validation fails. HTML and ARIA attributes, class, and style apply to the native textarea.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'string',
        default: `'${textareaDefaults.modelValue}'`,
        description: 'Field value. Can also be bound with v-model.',
      },
      {
        name: 'autoresize',
        type: 'boolean',
        default: String(textareaDefaults.autoresize),
        description: 'Automatically adjusts the height to fit the content when true.',
      },
      {
        name: 'size',
        type: textareaSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${textareaDefaults.size}'`,
        description: 'Controls the minimum height, spacing, and text size.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${textareaDefaults.color}'`,
        description: 'Theme token or CSS color for the field and its focus state.',
      },
      {
        name: 'highlight',
        type: 'boolean',
        default: String(textareaDefaults.highlight),
        description: 'Shows the theme or custom border color before focus.',
      },
      {
        name: 'variant',
        type: textareaVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${textareaDefaults.variant}'`,
        description:
          'Defines the border and background style. none also removes the border on focus.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: string]',
        description: 'Emitted when the field content changes.',
      },
    ],
    slots: [],
    expose: [],
  },
}

export default textareaConfig
