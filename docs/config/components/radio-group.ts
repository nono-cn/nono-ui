import type { ComponentDocConfig } from '../component-docs'
import {
  radioGroupDefaults,
  radioGroupIndicators,
  radioGroupOrientations,
  radioGroupSizes,
  radioGroupVariantNames,
} from '@/components/ui/RadioGroup'
import { formatValue } from '../format-default'
import RadioGroupBasicExample from '../../components/examples/radio-group/RadioGroupBasicExample.vue'
import RadioGroupDescriptionExample from '../../components/examples/radio-group/RadioGroupDescriptionExample.vue'
import RadioGroupLegendExample from '../../components/examples/radio-group/RadioGroupLegendExample.vue'
import RadioGroupVariantExample from '../../components/examples/radio-group/RadioGroupVariantExample.vue'
import RadioGroupOrientationExample from '../../components/examples/radio-group/RadioGroupOrientationExample.vue'
import RadioGroupIndicatorExample from '../../components/examples/radio-group/RadioGroupIndicatorExample.vue'
import RadioGroupSizeExample from '../../components/examples/radio-group/RadioGroupSizeExample.vue'
import RadioGroupColorExample from '../../components/examples/radio-group/RadioGroupColorExample.vue'
import RadioGroupDisabledExample from '../../components/examples/radio-group/RadioGroupDisabledExample.vue'
import RadioGroupSlotsExample from '../../components/examples/radio-group/RadioGroupSlotsExample.vue'
import RadioGroupUiExample from '../../components/examples/radio-group/RadioGroupUiExample.vue'

const toUnion = (values: readonly string[]) => values.map((value) => `'${value}'`).join(' | ')

const radioGroupConfig: ComponentDocConfig = {
  slug: 'radio-group',
  title: 'RadioGroup',
  language: 'en',
  description: 'Set of options where only one can be selected at a time.',
  importPath: '@nono-ui/components/ui/RadioGroup',
  usage: [
    {
      title: 'Basic usage',
      description: 'Bind the selected value with v-model and pass the options as items.',
      component: RadioGroupBasicExample,
    },
  ],
  examples: [
    {
      title: 'Description',
      description:
        'Add a description under each label; it becomes the radio’s accessible description.',
      component: RadioGroupDescriptionExample,
    },
    {
      title: 'Legend',
      description:
        'Name the group with a legend; it labels the radio group for assistive technologies.',
      component: RadioGroupLegendExample,
    },
    {
      title: 'Variant',
      description: 'Show the options as a plain list, as separate cards, or as a joined table.',
      component: RadioGroupVariantExample,
    },
    {
      title: 'Orientation',
      description:
        'Lay the options out vertically or horizontally; arrow keys follow the orientation.',
      component: RadioGroupOrientationExample,
    },
    {
      title: 'Indicator',
      description:
        'Place the radio at the start or end, or hide it; item icons only show when it is hidden.',
      component: RadioGroupIndicatorExample,
    },
    {
      title: 'Size',
      description: 'Change the radio, dot, icon, legend, and text size.',
      component: RadioGroupSizeExample,
    },
    {
      title: 'Color',
      description:
        'Choose a theme token or a custom CSS color for the checked radio, focus ring, and selected card.',
      component: RadioGroupColorExample,
    },
    {
      title: 'Disabled',
      description: 'Disable the whole group, or a single option with its disabled field.',
      component: RadioGroupDisabledExample,
    },
    {
      title: 'Slots',
      description: 'Customize the legend, and the label and description of every item.',
      component: RadioGroupSlotsExample,
    },
    {
      title: 'UI',
      description: 'Customize each part using the group context or the context of each item.',
      component: RadioGroupUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Radio group pattern',
      description:
        'The root has role="radiogroup" and each option is a button with role="radio" and aria-checked. Focus uses a roving tabindex: Tab moves into the group on the checked option, arrow keys move and check the next or previous option, and Space checks the focused one.',
      links: [
        {
          label: 'WAI-ARIA radio group pattern',
          href: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/',
        },
      ],
    },
    {
      title: 'Accessible names',
      description:
        'The legend names the group through aria-labelledby. Each radio is named by its label and described by its description, so the whole row or card can be clicked without repeating the description in the name. Without a legend, give the group a name with aria-label.',
    },
    {
      title: 'Hidden indicator',
      description:
        'With indicator="hidden" the radio stays in the page, visually hidden, so it is still announced and focusable; focus and selection are shown on the item. Icons are decorative.',
    },
    {
      title: 'Forms',
      description:
        'When the group is inside a form and has a name, a hidden native radio is rendered for each option so the selected value is submitted.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'string | number',
        default: 'undefined',
        description: 'Value of the checked item; updated with v-model.',
      },
      {
        name: 'items',
        type: 'RadioGroupItem[]',
        typeLink: '#radio-group-item',
        default: '[]',
        description: 'Options to render, in order.',
      },
      {
        name: 'legend',
        type: 'string',
        default: formatValue(radioGroupDefaults.legend),
        description: 'Text that names the group. The legend slot replaces it.',
      },
      {
        name: 'orientation',
        type: toUnion(radioGroupOrientations),
        default: formatValue(radioGroupDefaults.orientation),
        description: 'Layout direction, also used for arrow key navigation.',
      },
      {
        name: 'variant',
        type: toUnion(radioGroupVariantNames),
        default: formatValue(radioGroupDefaults.variant),
        description: 'Plain list, separate cards, or a joined table.',
      },
      {
        name: 'indicator',
        type: toUnion(radioGroupIndicators),
        default: formatValue(radioGroupDefaults.indicator),
        description:
          'Position of the radio, or hidden to keep it only for assistive technologies and show item icons.',
      },
      {
        name: 'size',
        type: toUnion(radioGroupSizes),
        default: formatValue(radioGroupDefaults.size),
        description: 'Size of the radio, dot, icon, legend, text, and card padding.',
      },
      {
        name: 'color',
        type: 'string',
        default: formatValue(radioGroupDefaults.color),
        description:
          'Theme token or CSS color for the checked radio, focus ring, and selected card or cell.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: formatValue(radioGroupDefaults.disabled),
        description: 'Disables every option.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: formatValue(radioGroupDefaults.required),
        description: 'Requires a value before the owning form can be submitted.',
      },
      {
        name: 'name',
        type: 'string',
        default: formatValue(radioGroupDefaults.name),
        description: 'Field name submitted with the owning form.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: formatValue(radioGroupDefaults.loop),
        description: 'Keyboard navigation wraps from the last option to the first and back.',
      },
      {
        name: 'ui',
        type: `{
  legend?: (context: RadioGroupContext) => HTMLAttributes
  list?: (context: RadioGroupContext) => HTMLAttributes
  item?: (context: RadioGroupItemContext) => HTMLAttributes
  container?: (context: RadioGroupItemContext) => HTMLAttributes
  base?: (context: RadioGroupItemContext) => HTMLAttributes
  indicator?: (context: RadioGroupItemContext) => HTMLAttributes
  wrapper?: (context: RadioGroupItemContext) => HTMLAttributes
  icon?: (context: RadioGroupItemContext) => HTMLAttributes
  label?: (context: RadioGroupItemContext) => HTMLAttributes
  description?: (context: RadioGroupItemContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  legend?: (context: ' },
          { text: 'RadioGroupContext', link: '#radio-group-context' },
          { text: ') => HTMLAttributes\n  list?: (context: ' },
          { text: 'RadioGroupContext', link: '#radio-group-context' },
          { text: ') => HTMLAttributes\n  item?: (context: ' },
          { text: 'RadioGroupItemContext', link: '#radio-group-item-context' },
          { text: ') => HTMLAttributes\n  container?: (context: ' },
          { text: 'RadioGroupItemContext', link: '#radio-group-item-context' },
          { text: ') => HTMLAttributes\n  base?: (context: ' },
          { text: 'RadioGroupItemContext', link: '#radio-group-item-context' },
          { text: ') => HTMLAttributes\n  indicator?: (context: ' },
          { text: 'RadioGroupItemContext', link: '#radio-group-item-context' },
          { text: ') => HTMLAttributes\n  wrapper?: (context: ' },
          { text: 'RadioGroupItemContext', link: '#radio-group-item-context' },
          { text: ') => HTMLAttributes\n  icon?: (context: ' },
          { text: 'RadioGroupItemContext', link: '#radio-group-item-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'RadioGroupItemContext', link: '#radio-group-item-context' },
          { text: ') => HTMLAttributes\n  description?: (context: ' },
          { text: 'RadioGroupItemContext', link: '#radio-group-item-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: formatValue(radioGroupDefaults.ui),
        description:
          'Resolvers for attributes and classes on the legend, the list, and each part of an item: the row or card, the radio container, the radio, its dot, the text wrapper, the icon, the label, and the description.',
      },
    ],
    configs: [
      {
        id: 'radio-group-item',
        title: 'RadioGroupItem',
        typeLabel: 'RadioGroupItem',
        rows: [
          {
            name: 'value',
            type: 'string | number',
            required: true,
            description: 'Value set on v-model when the item is checked.',
          },
          {
            name: 'label',
            type: 'string',
            default: 'undefined',
            description: 'Text that names the radio.',
          },
          {
            name: 'description',
            type: 'string',
            default: 'undefined',
            description: 'Text under the label, linked to the radio with aria-describedby.',
          },
          {
            name: 'icon',
            type: 'IconName',
            typeLink: '/components/icon#props',
            default: 'undefined',
            description: 'Icon shown above the label when indicator is hidden.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables this option only.',
          },
        ],
      },
      {
        id: 'radio-group-context',
        title: 'RadioGroupContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the legend slot and the legend and list resolvers.',
        rows: [
          {
            name: 'value',
            type: 'string | number | undefined',
            description: 'Value of the checked item.',
          },
          { name: 'disabled', type: 'boolean', description: 'Whether the group is disabled.' },
        ],
      },
      {
        id: 'radio-group-item-context',
        title: 'RadioGroupItemContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the label and description slots and the item resolvers.',
        rows: [
          {
            name: 'item',
            type: 'RadioGroupItem',
            typeLink: '#radio-group-item',
            description: 'Configuration for this item.',
          },
          { name: 'index', type: 'number', description: 'Zero-based position in items.' },
          { name: 'checked', type: 'boolean', description: 'Whether this item is checked.' },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Whether this item is disabled, by itself or by the group.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: string | number]',
        description: 'Emitted when another item is checked.',
      },
      {
        name: 'change',
        type: '[value: string | number]',
        description:
          'Emitted when the user checks another item. It is not emitted when modelValue changes from outside.',
      },
    ],
    slots: [
      {
        name: 'legend',
        type: 'RadioGroupContext',
        typeLink: '#radio-group-context',
        description:
          'Replaces the legend text. It also renders the legend when no legend prop is set.',
      },
      {
        name: 'label',
        type: 'RadioGroupItemContext',
        typeLink: '#radio-group-item-context',
        description: 'Shared label, replacing the label of every item.',
      },
      {
        name: 'description',
        type: 'RadioGroupItemContext',
        typeLink: '#radio-group-item-context',
        description: 'Shared description, replacing the description of every item.',
      },
    ],
    expose: [],
  },
}

export default radioGroupConfig
