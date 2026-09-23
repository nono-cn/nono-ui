import type { ComponentDocConfig } from '../component-docs'
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
        'Set for to the same id as the control so assistive technologies associate the label with the field. Keep the label text visible and descriptive.',
    },
  ],
  api: {
    props: [
      {
        name: 'for',
        type: 'string',
        default: 'undefined',
        description: 'Id of the associated form control.',
      },
    ],
    emits: [],
    slots: [{ name: 'default', type: '-', description: 'Label text or content.' }],
    expose: [],
  },
}

export default labelConfig
