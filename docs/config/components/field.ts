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
      {
        name: 'invalid',
        type: 'boolean',
        default: 'undefined',
        description: 'Overrides the field’s validity state when controlled externally.',
      },
      {
        name: 'dirty',
        type: 'boolean',
        default: 'undefined',
        description: 'Overrides whether the field value differs from its initial value.',
      },
      {
        name: 'touched',
        type: 'boolean',
        default: 'undefined',
        description: 'Overrides whether the field control has been blurred.',
      },
      {
        name: 'validate',
        type: '(value: unknown, formValues: Record<string, unknown>) => string | string[] | null | undefined | void | Promise<string | string[] | null | undefined | void>',
        default: 'undefined',
        description: 'Returns an error message, messages, or no error for the control value.',
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
