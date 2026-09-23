import type { ComponentDocConfig } from '../component-docs'
import FieldSetDescriptionExample from '../../components/examples/field-set/FieldSetDescriptionExample.vue'
import FieldSetLegendExample from '../../components/examples/field-set/FieldSetLegendExample.vue'
import FieldSetLegendVariantExample from '../../components/examples/field-set/FieldSetLegendVariantExample.vue'
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
      title: 'Legend',
      description: 'Set the accessible name for the group.',
      component: FieldSetLegendExample,
    },
    {
      title: 'Description',
      description: 'Add supporting context to the group.',
      component: FieldSetDescriptionExample,
    },
    {
      title: 'Legend variant',
      description: 'Adjust the visual size of the legend.',
      component: FieldSetLegendVariantExample,
    },
  ],
  accessibility: [
    {
      title: 'Group related controls',
      description:
        "Use legend to provide the group's accessible name and description to add supporting context. Keep a visible label associated with every control in the group.",
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
        default: "'legend'",
        description: 'Visual size of the legend: base for legend or small for label.',
      },
      {
        name: 'ui',
        type: `{\n  legend?: () => HTMLAttributes\n  description?: () => HTMLAttributes\n  group?: () => HTMLAttributes\n}`,
        typePre: true,
        default: 'undefined',
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
