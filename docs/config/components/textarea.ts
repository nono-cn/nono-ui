import type { ComponentDocConfig } from '../component-docs'
import TextareaBasicExample from '../../components/examples/textarea/TextareaBasicExample.vue'
import TextareaSizesExample from '../../components/examples/textarea/TextareaSizesExample.vue'
import TextareaSeverityExample from '../../components/examples/textarea/TextareaSeverityExample.vue'
import TextareaVariantsExample from '../../components/examples/textarea/TextareaVariantsExample.vue'
import TextareaAutoresizeExample from '../../components/examples/textarea/TextareaAutoresizeExample.vue'
import TextareaHighlightExample from '../../components/examples/textarea/TextareaHighlightExample.vue'
import TextareaColorExample from '../../components/examples/textarea/TextareaColorExample.vue'

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
      description: 'Compare the five available sizes.',
      component: TextareaSizesExample,
    },
    {
      title: 'Severity',
      description: 'Focus a field to see its semantic focus color.',
      component: TextareaSeverityExample,
    },
    {
      title: 'Variant',
      description: 'Compare the available border and background styles.',
      component: TextareaVariantsExample,
    },
    {
      title: 'Autoresize',
      description: 'Let the field grow to fit its content.',
      component: TextareaAutoresizeExample,
    },
    {
      title: 'Highlight',
      description: 'Show the semantic border color when the field is not focused.',
      component: TextareaHighlightExample,
    },
    {
      title: 'Custom color',
      description: 'Use a custom color that takes precedence over severity.',
      component: TextareaColorExample,
    },
  ],
  accessibility: [
    {
      title: 'Label and description',
      description:
        'Associate a visible label using for and id. Use aria-describedby to associate helper text or an additional description with the field.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'Field value. Can also be bound with v-model:value.',
      },
      {
        name: 'autoresize',
        type: 'boolean',
        default: 'false',
        description: 'Automatically adjusts the height to fit the content when true.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Controls the minimum height, spacing, and text size.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'error' | 'warning' | 'success'",
        default: "'primary'",
        description: 'Sets the semantic focus color for the field.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Sets a custom color that takes precedence over severity.',
      },
      {
        name: 'highlight',
        type: 'boolean',
        default: 'false',
        description:
          'Shows the border in the severity or custom color, even when the field is not focused.',
      },
      {
        name: 'variant',
        type: "'outline' | 'subtle' | 'soft' | 'plain' | 'none'",
        default: "'outline'",
        description:
          'Defines the border and background style. none also removes the border on focus.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: string]',
        description: 'Emitted when the field content changes.',
      },
    ],
    slots: [],
    expose: [],
  },
}

export default textareaConfig
