import type { ComponentDocConfig } from '../component-docs'
import { inputDefaults, inputSizes, inputVariantNames } from '@/components/ui/Input'
import InputUsageExample from '../../components/examples/input/InputUsageExample.vue'
import InputSizeExample from '../../components/examples/input/InputSizeExample.vue'
import InputAppearanceExample from '../../components/examples/input/InputAppearanceExample.vue'
import InputLoadingExample from '../../components/examples/input/InputLoadingExample.vue'
import InputSlotsExample from '../../components/examples/input/InputSlotsExample.vue'

const inputConfig: ComponentDocConfig = {
  slug: 'input',
  title: 'Input',
  language: 'en',
  description: 'A single-line text field with optional leading and trailing content.',
  importPath: '@nono-ui/components/ui/Input',
  usage: [
    {
      title: 'Basic usage',
      description: 'Bind a value and give the field a visible label.',
      component: InputUsageExample,
    },
  ],
  examples: [
    {
      title: 'Size',
      description: 'Choose the field height.',
      component: InputSizeExample,
    },
    {
      title: 'Appearance',
      description: 'Choose the variant, color, and highlighted border together.',
      component: InputAppearanceExample,
    },
    {
      title: 'Loading',
      description: 'Replace leading content with a loading indicator while loading.',
      component: InputLoadingExample,
    },
    {
      title: 'Leading and trailing',
      description: 'Place short supporting content beside the native input.',
      component: InputSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Label and description',
      description:
        'Associate a visible label with the native input using for and id. Use aria-describedby for helper text and aria-invalid when validation fails. The loading prop marks the native input with aria-busy. Attributes passed to Input, including class and style, apply to the native input; use ui.root to customize the outer container.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'string | number',
        default: `'${inputDefaults.modelValue}'`,
        description: 'String or numeric field value. Can also be bound with v-model.',
      },
      {
        name: 'size',
        type: inputSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${inputDefaults.size}'`,
        description: 'Controls the field height and text size.',
      },
      {
        name: 'variant',
        type: inputVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${inputDefaults.variant}'`,
        description:
          'Controls the border and background style. none removes the focus border and ring.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${inputDefaults.color}'`,
        description: 'Theme token or CSS color for the field and its focus state.',
      },
      {
        name: 'highlight',
        type: 'boolean',
        default: String(inputDefaults.highlight),
        description: 'Shows the semantic or custom border color before focus.',
      },
      {
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: 'undefined',
        description:
          'Icon shown in the leading addon; the leading slot or loading state takes precedence. Its size follows the Input size prop.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: String(inputDefaults.loading),
        description:
          'Replaces leading content with a loading indicator and sets aria-busy on the input.',
      },
      {
        name: 'loadingIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: `'${inputDefaults.loadingIcon}'`,
        description: 'Icon name for the loading indicator; its size follows the Input size prop.',
      },
      {
        name: 'trailingIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: 'undefined',
        description:
          'Icon shown in the trailing addon; the trailing slot takes precedence. Its size follows the Input size prop.',
      },
      {
        name: 'ui',
        type: `{
  root?: () => HTMLAttributes
  leading?: () => HTMLAttributes
  trailing?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers for customizing HTML attributes on the root container and leading and trailing InputGroupAddon containers, including class, style, and ARIA attributes.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: string | number]',
        description: 'Emitted when the native input value changes.',
      },
    ],
    slots: [
      {
        name: 'leading',
        type: '-',
        description: 'Content shown before the input inside an addon.',
      },
      {
        name: 'loading',
        type: '-',
        description: 'Custom content that overrides loadingIcon and the default indicator.',
      },
      {
        name: 'trailing',
        type: '-',
        description: 'Content shown after the input inside an addon.',
      },
    ],
    expose: [],
  },
}

export default inputConfig
