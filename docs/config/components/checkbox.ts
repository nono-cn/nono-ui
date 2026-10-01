import type { ComponentDocConfig } from '../component-docs'
import { checkboxDefaults, checkboxSizes } from '@/components/ui/Checkbox'
import CheckboxBasicExample from '../../components/examples/checkbox/CheckboxBasicExample.vue'
import CheckboxValuesExample from '../../components/examples/checkbox/CheckboxValuesExample.vue'
import CheckboxIndeterminateExample from '../../components/examples/checkbox/CheckboxIndeterminateExample.vue'
import CheckboxSizeExample from '../../components/examples/checkbox/CheckboxSizeExample.vue'
import CheckboxColorExample from '../../components/examples/checkbox/CheckboxColorExample.vue'
import CheckboxIconsExample from '../../components/examples/checkbox/CheckboxIconsExample.vue'
import CheckboxUiExample from '../../components/examples/checkbox/CheckboxUiExample.vue'

const checkboxConfig: ComponentDocConfig = {
  slug: 'checkbox',
  title: 'Checkbox',
  language: 'en',
  description: 'Accessible control for selecting an option or representing a partial selection.',
  importPath: '@nono-ui/components/ui/Checkbox',
  usage: [
    {
      title: 'Basic usage',
      description: 'Bind a boolean value to an accessible checkbox.',
      component: CheckboxBasicExample,
    },
  ],
  examples: [
    {
      title: 'Custom values',
      description: 'Use custom values for selected and unselected states.',
      component: CheckboxValuesExample,
    },
    {
      title: 'Indeterminate',
      description: 'Switch among unchecked, checked, and indeterminate states.',
      component: CheckboxIndeterminateExample,
    },
    {
      title: 'Size',
      description: 'Set the checkbox’s visual size.',
      component: CheckboxSizeExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme token or a custom CSS color.',
      component: CheckboxColorExample,
    },
    {
      title: 'Icons',
      description:
        'Choose icon names or pass a full IconConfig for checked and indeterminate states.',
      component: CheckboxIconsExample,
    },
    {
      title: 'UI',
      description: 'Customize the indicator using the current state.',
      component: CheckboxUiExample,
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
        default: String(checkboxDefaults.falseValue),
        description: 'Current value; updated with v-model:value.',
      },
      {
        name: 'trueValue',
        type: 'boolean | number | string',
        default: String(checkboxDefaults.trueValue),
        description: 'Value representing the selected state.',
      },
      {
        name: 'falseValue',
        type: 'boolean | number | string',
        default: String(checkboxDefaults.falseValue),
        description: 'Value representing the unselected state.',
      },
      {
        name: 'size',
        type: checkboxSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${checkboxDefaults.size}'`,
        description: 'Visual size of the checkbox and its icon.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${checkboxDefaults.color}'`,
        description: 'Theme token or CSS color for checked, indeterminate, and focus states.',
      },
      {
        name: 'icon',
        type: 'IconName | IconConfig',
        typeParts: [
          { text: 'IconName', link: '/components/icon#props' },
          { text: ' | ' },
          { text: 'IconConfig', link: '/components/icon#icon-config' },
        ],
        default: `'${checkboxDefaults.icon}'`,
        description: 'Checked-state icon; a name or an icon configuration.',
      },
      {
        name: 'indeterminateIcon',
        type: 'IconName | IconConfig',
        typeParts: [
          { text: 'IconName', link: '/components/icon#props' },
          { text: ' | ' },
          { text: 'IconConfig', link: '/components/icon#icon-config' },
        ],
        default: `'${checkboxDefaults.indeterminateIcon}'`,
        description: 'Indeterminate-state icon; a name or an icon configuration.',
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
        default: String(checkboxDefaults.ui),
        description: 'Resolver for indicator attributes, classes, styles, and ARIA.',
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
