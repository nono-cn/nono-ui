import type { ComponentDocConfig } from '../component-docs'
import FieldDescriptionSlotExample from '../../components/examples/field/FieldDescriptionSlotExample.vue'
import FieldLabelSlotExample from '../../components/examples/field/FieldLabelSlotExample.vue'
import FieldRequiredExample from '../../components/examples/field/FieldRequiredExample.vue'
import FieldUiExample from '../../components/examples/field/FieldUiExample.vue'
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
      description: 'Use your Input inside Field and connect it to the label and description.',
      component: FieldUsageExample,
    },
  ],
  examples: [
    {
      title: 'Label slot',
      description: 'Replace the label text with custom content.',
      component: FieldLabelSlotExample,
    },
    {
      title: 'Description slot',
      description: 'Replace the description text with custom content.',
      component: FieldDescriptionSlotExample,
    },
    {
      title: 'Required control',
      description: 'Mark Field and your Input as required.',
      component: FieldRequiredExample,
    },
    {
      title: 'Label and description UI',
      description: 'Customize the label and description through ui resolvers.',
      component: FieldUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Label and control association',
      description:
        'The nono-ui Input does not register with Reka FieldRoot. Set native constraints such as required directly on Input. For an accessible name, associate the Input with a label in your form.',
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
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Visible label text. Omitted when empty unless the label slot is provided.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description:
          'Supporting text below the control. Omitted when empty unless the description slot is provided.',
      },
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
      {
        name: 'validationMode',
        type: "'onSubmit' | 'onBlur' | 'onChange'",
        default: 'undefined',
        description: 'Chooses when validation runs. Inherits the owning form’s mode when omitted.',
      },
      {
        name: 'validationDebounceTime',
        type: 'number',
        default: 'undefined',
        description: 'Delay in milliseconds between validation calls when validating on change.',
      },
      {
        name: 'ui',
        type: `{
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers for attributes, classes, and styles on FieldLabel and FieldDescription.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'label',
        type: '-',
        description: 'Custom content that replaces the label prop inside FieldLabel.',
      },
      {
        name: 'description',
        type: '-',
        description: 'Custom content that replaces the description prop inside FieldDescription.',
      },
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
