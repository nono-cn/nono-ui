import type { ComponentDocConfig } from '../component-docs'
import FormErrorsExample from '../../components/examples/form/FormErrorsExample.vue'
import FormUsageExample from '../../components/examples/form/FormUsageExample.vue'
import FormValidationExample from '../../components/examples/form/FormValidationExample.vue'

const formConfig: ComponentDocConfig = {
  slug: 'form',
  title: 'Form',
  language: 'en',
  description: 'A native form backed by Reka UI for field validation and server errors.',
  importPath: '@nono-ui/components/ui/Form',
  usage: [
    {
      title: 'Basic usage',
      description: 'Use existing native controls and read their values in a submit handler.',
      component: FormUsageExample,
    },
  ],
  examples: [
    {
      title: 'Validation and field values',
      description: 'Registered Reka fields validate and provide their named values on formSubmit.',
      component: FormValidationExample,
    },
    {
      title: 'Server errors',
      description: 'Pass errors keyed by field name to display a server response.',
      component: FormErrorsExample,
    },
  ],
  accessibility: [
    {
      title: 'Validation and focus',
      description:
        'Form renders a native form with novalidate. Registered Reka fields are validated on submit; if a field is invalid, submission stops and focus moves to its control. Give every control a visible label. Plain native controls such as nono-ui Input still participate in native form submission, but do not register with Reka validation or formSubmit values.',
      links: [
        {
          label: 'Read the Reka UI Form guide',
          href: 'https://reka-ui.com/docs/components/form',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'errors',
        type: '{ [key: string]: string | string[] }',
        default: 'undefined',
        description:
          'Server errors keyed by the name of a registered Reka field. They clear when that field changes or when a new value for its key arrives.',
      },
      {
        name: 'validationMode',
        type: "'onSubmit' | 'onBlur' | 'onChange'",
        default: "'onSubmit'",
        description:
          'Default validation timing for registered Reka fields. A field may override it.',
      },
    ],
    emits: [
      {
        name: 'submit',
        type: '(event: SubmitEvent) => void',
        description:
          'Fires after registered fields pass synchronous validation. Call preventDefault on the event to handle native controls in JavaScript; otherwise the form submits natively.',
      },
      {
        name: 'formSubmit',
        type: '(values: { [key: string]: unknown }, event: SubmitEvent) => void',
        description:
          'Fires with values of named registered Reka fields. Listening to it prevents native submission.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'The form controls and actions.',
      },
    ],
    expose: [
      {
        name: 'validate',
        type: '(name?: string) => boolean',
        description:
          'Validates every registered Reka field, or only the field with the given name.',
      },
    ],
  },
}

export default formConfig
