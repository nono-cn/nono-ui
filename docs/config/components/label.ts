import type { ComponentDocConfig } from '../component-docs'
import { labelDefaults } from '@/components/ui/Label'
import LabelForExample from '../../components/examples/label/LabelForExample.vue'
import LabelUsageExample from '../../components/examples/label/LabelUsageExample.vue'

const labelConfig: ComponentDocConfig = {
  slug: 'label',
  title: 'Label',
  language: 'en',
  description: 'Accessible label for identifying form controls.',
  importPath: '@nono-ui/components/ui/Label',
  usage: [
    {
      title: 'Basic usage',
      description: 'Associate a visible label with a form control.',
      component: LabelUsageExample,
    },
  ],
  examples: [
    {
      title: 'For',
      description: 'Associate the label with a control’s id.',
      component: LabelForExample,
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Set for to the id of the control so assistive technology announces the label with it, and clicking the label focuses the control. Keep the text visible and descriptive.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          [
            'label',
            'Root',
            'Native label, which forwards HTML and ARIA attributes, class, and style.',
          ],
          ['for', 'Root', 'Id of the control the label names.'],
        ],
      },
    },
  ],
  api: {
    props: [
      {
        name: 'for',
        type: 'string',
        default: String(labelDefaults.for),
        description: 'Id of the associated form control.',
      },
    ],
    emits: [],
    slots: [{ name: 'default', type: '-', description: 'Label text or content.' }],
    expose: [],
  },
}

export default labelConfig
