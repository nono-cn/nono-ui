import type { ComponentDocConfig } from '../component-docs'
import { toggleDefaults, toggleSizes, toggleVariantNames } from '@/components/ui/Toggle'
import ToggleBasicExample from '../../components/examples/toggle/ToggleBasicExample.vue'
import ToggleVariantExample from '../../components/examples/toggle/ToggleVariantExample.vue'
import ToggleSizeExample from '../../components/examples/toggle/ToggleSizeExample.vue'
import ToggleColorExample from '../../components/examples/toggle/ToggleColorExample.vue'
import ToggleIconsExample from '../../components/examples/toggle/ToggleIconsExample.vue'
import ToggleSlotsExample from '../../components/examples/toggle/ToggleSlotsExample.vue'
import ToggleDisabledExample from '../../components/examples/toggle/ToggleDisabledExample.vue'

const toggleConfig: ComponentDocConfig = {
  slug: 'toggle',
  title: 'Toggle',
  language: 'en',
  description: 'A button that switches between pressed and unpressed states.',
  importPath: '@nono-ui/components/ui/Toggle',
  usage: [
    { title: 'Basic usage', description: 'Toggle a pressed state.', component: ToggleBasicExample },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Choose an outline or plain surface.',
      component: ToggleVariantExample,
    },
    {
      title: 'Size',
      description: 'Choose a text size or an icon-only square size.',
      component: ToggleSizeExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme or custom color with either variant.',
      component: ToggleColorExample,
    },
    {
      title: 'Icons',
      description: 'Choose icon names to show before and after the label.',
      component: ToggleIconsExample,
    },
    {
      title: 'Slots',
      description: 'Use slot context to customize content for each state.',
      component: ToggleSlotsExample,
    },
    {
      title: 'Disabled',
      description: 'Prevent interaction when unavailable.',
      component: ToggleDisabledExample,
    },
  ],
  accessibility: [
    {
      title: 'Accessible name and pressed state',
      description:
        'Provide a visible label or an accessible name with aria-label or aria-labelledby. The root button exposes its pressed state and forwards HTML and ARIA attributes.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'boolean',
        default: String(toggleDefaults.modelValue),
        description: 'Pressed state; updated with v-model.',
      },
      {
        name: 'label',
        type: 'string',
        default: String(toggleDefaults.label),
        description: 'Fallback content of the default slot.',
      },
      {
        name: 'icon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: String(toggleDefaults.icon),
        description: 'Leading icon name, replaced by the leading slot.',
      },
      {
        name: 'trailingIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: String(toggleDefaults.trailingIcon),
        description: 'Trailing icon name, replaced by the trailing slot.',
      },
      {
        name: 'variant',
        type: toggleVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${toggleDefaults.variant}'`,
        description: 'Border and background treatment.',
      },
      {
        name: 'size',
        type: toggleSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${toggleDefaults.size}'`,
        description: 'Text sizes and square icon-only sizes.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${toggleDefaults.color}'`,
        description: 'Theme token or CSS color applied to the toggle and focus state.',
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Field name submitted with the owning form.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction when true.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: boolean]',
        description: 'Emitted when the pressed state changes.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: 'ToggleContext',
        typeLink: '/components/toggle#toggle-context',
        description: 'Main content; replaces label.',
      },
      {
        name: 'leading',
        type: 'ToggleContext',
        typeLink: '/components/toggle#toggle-context',
        description: 'Leading content; replaces icon.',
      },
      {
        name: 'trailing',
        type: 'ToggleContext',
        typeLink: '/components/toggle#toggle-context',
        description: 'Trailing content; replaces trailingIcon.',
      },
    ],
    configs: [
      {
        id: 'toggle-context',
        title: 'ToggleContext',
        showDefault: false,
        rows: [{ name: 'pressed', type: 'boolean', description: 'Whether the toggle is pressed.' }],
      },
    ],
    expose: [],
  },
}

export default toggleConfig
