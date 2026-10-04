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
      title: 'Associating labels with controls',
      description:
        'Set for to the same id as the control so assistive technologies associate the label with the field. Keep the text visible and descriptive. HTML and ARIA attributes, class, and style are forwarded to the root label.',
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
