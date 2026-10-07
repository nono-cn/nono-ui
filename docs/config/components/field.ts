import type { ComponentDocConfig } from '../component-docs'
import FieldRequiredExample from '../../components/examples/field/FieldRequiredExample.vue'
import FieldUsageExample from '../../components/examples/field/FieldUsageExample.vue'

const fieldConfig: ComponentDocConfig = {
  slug: 'field',
  title: 'Field',
  language: 'en',
  description: 'Groups a form control with its accessible label and supporting content.',
  importPath: '@nono-ui/components/ui/Field',
  usage: [
    {
      title: 'Basic usage',
      description: 'Connect a label and description to a control inside Field.',
      component: FieldUsageExample,
    },
  ],
  examples: [
    {
      title: 'Required control',
      description: 'Mark the field as required and pass that state to its control.',
      component: FieldRequiredExample,
    },
  ],
  accessibility: [
    {
      title: 'Label and control association',
      description:
        'Place Reka UI FieldLabel and FieldControl inside Field so their ids and accessible description are connected automatically. Field renders a div and forwards HTML and ARIA attributes to that root element.',
      links: [
        {
          label: 'Read the Reka UI Field accessibility guide',
          href: 'https://reka-ui.com/docs/components/field#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Name used by the owning form when collecting this field’s value.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the field’s control and skips validation.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Marks the field’s control as required.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '{ invalid: boolean; errors: string[] }',
        description: 'Field content and the current invalid state and error messages.',
      },
    ],
    expose: [],
  },
}

export default fieldConfig
