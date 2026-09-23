import type { ComponentDocConfig } from '../component-docs'
import CheckboxValuesExample from '../../components/examples/checkbox/CheckboxValuesExample.vue'
import CheckboxIndeterminateExample from '../../components/examples/checkbox/CheckboxIndeterminateExample.vue'
import CheckboxSizeExample from '../../components/examples/checkbox/CheckboxSizeExample.vue'
import CheckboxSeverityExample from '../../components/examples/checkbox/CheckboxSeverityExample.vue'
import CheckboxColorExample from '../../components/examples/checkbox/CheckboxColorExample.vue'
import CheckboxIconsExample from '../../components/examples/checkbox/CheckboxIconsExample.vue'

const checkboxConfig: ComponentDocConfig = {
  slug: 'checkbox',
  title: 'Checkbox',
  language: 'en',
  description: 'Accessible control for selecting an option or representing a partial selection.',
  importPath: '@nono-ui/components/ui/Checkbox',
  usage: [
    {
      title: 'trueValue and falseValue',
      description: 'Use custom values for selected and unselected states.',
      component: CheckboxValuesExample,
    },
  ],
  examples: [
    {
      title: 'Indeterminate',
      description: 'Represent a partial selection with the indeterminate value.',
      component: CheckboxIndeterminateExample,
    },
    {
      title: 'Size',
      description: 'Set the checkbox’s visual size.',
      component: CheckboxSizeExample,
    },
    {
      title: 'Severity',
      description: 'Apply a semantic color to the selected state.',
      component: CheckboxSeverityExample,
    },
    {
      title: 'Color',
      description: 'Use a custom CSS color.',
      component: CheckboxColorExample,
    },
    {
      title: 'Icon and indeterminateIcon',
      description: 'Customize the icons for selected and indeterminate states.',
      component: CheckboxIconsExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible name',
      description:
        'Associate the checkbox with a visible label or provide an accessible name (aria-label / aria-labelledby) when no text is available. HTML and ARIA attributes are forwarded to the root button.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: "boolean | number | string | 'indeterminate'",
        default: 'false',
        description: 'Current value; updated with v-model:value.',
      },
      {
        name: 'trueValue',
        type: 'boolean | number | string',
        default: 'true',
        description: 'Value representing the selected state.',
      },
      {
        name: 'falseValue',
        type: 'boolean | number | string',
        default: 'false',
        description: 'Value representing the unselected state.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Visual size of the checkbox and its icon.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Semantic color of the selected state.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS color. Takes precedence over severity.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: "{ name: 'check' }",
        description: 'Configuration for the icon displayed inside the indicator.',
      },
      {
        name: 'indeterminateIcon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: "{ name: 'minus' }",
        description: 'Configuration for the icon displayed when value is indeterminate.',
      },
      {
        name: 'ui',
        type: '{ indicator?: (context: CheckboxContext) => HTMLAttributes }',
        typeParts: [
          { text: '{ indicator?: (context: ' },
          { text: 'CheckboxContext', link: '/components/checkbox#checkbox-context' },
          { text: ') => HTMLAttributes }' },
        ],
        typePre: true,
        default: 'undefined',
        description: 'Resolver for customizing the indicator’s attributes and classes.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: "[value: boolean | number | string | 'indeterminate']",
        description: 'Emitted when the value changes.',
      },
    ],
    slots: [],
    configs: [
      {
        id: 'checkbox-context',
        title: 'CheckboxContext',
        showDefault: false,
        rows: [
          {
            name: 'state',
            type: "boolean | 'indeterminate'",
            description: 'Current checkbox state.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default checkboxConfig
