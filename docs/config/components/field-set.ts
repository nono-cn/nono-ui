import type { ComponentDocConfig } from '../component-docs'
import { fieldSetDefaults } from '@/components/ui/FieldSet'
import FieldSetDetailsExample from '../../components/examples/field-set/FieldSetDetailsExample.vue'
import FieldSetSlotsExample from '../../components/examples/field-set/FieldSetSlotsExample.vue'
import FieldSetUiExample from '../../components/examples/field-set/FieldSetUiExample.vue'
import FieldSetUsageExample from '../../components/examples/field-set/FieldSetUsageExample.vue'

const fieldSetConfig: ComponentDocConfig = {
  slug: 'field-set',
  title: 'FieldSet',
  language: 'en',
  description: 'Groups related form controls under a legend and description.',
  importPath: '@nono-ui/components/ui/FieldSet',
  usage: [
    {
      title: 'Basic usage',
      description: 'Group related controls under a legend and description.',
      component: FieldSetUsageExample,
    },
  ],
  examples: [
    {
      title: 'Legend, description & variant',
      description: 'Edit the group name and supporting text, and choose the legend size.',
      component: FieldSetDetailsExample,
    },
    {
      title: 'Slots',
      description: 'Replace the legend and description while keeping fieldset semantics.',
      component: FieldSetSlotsExample,
    },
    {
      title: 'UI',
      description: 'Customize attributes on the legend, description, and control group.',
      component: FieldSetUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Group related controls',
      description:
        "Use legend to provide the group's accessible name. Description adds visible context; if it should be announced with the group, give it an id through ui.description and reference that id with aria-describedby on FieldSet. Keep each control labeled.",
    },
  ],
  api: {
    props: [
      {
        name: 'legend',
        type: 'string',
        default: 'undefined',
        description: 'Legend text for the group. Hidden when empty unless the legend slot is used.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Descriptive text displayed below the legend.',
      },
      {
        name: 'legendVariant',
        type: "'legend' | 'label'",
        default: `'${fieldSetDefaults.legendVariant}'`,
        description: 'Visual size of the legend: base for legend or small for label.',
      },
      {
        name: 'ui',
        type: `{
  legend?: () => HTMLAttributes
  description?: () => HTMLAttributes
  group?: () => HTMLAttributes
}`,
        typePre: true,
        default: String(fieldSetDefaults.ui),
        description:
          'Resolvers for customizing attributes and classes of the legend, description, and control group.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Controls and content in the group.' },
      { name: 'legend', type: '-', description: 'Custom legend content.' },
      { name: 'description', type: '-', description: 'Custom description content.' },
    ],
    expose: [],
  },
}

export default fieldSetConfig
