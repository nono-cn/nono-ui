import type { ComponentDocConfig } from '../component-docs'
import {
  tabsActivationModes,
  tabsDefaults,
  tabsOrientations,
  tabsVariantNames,
} from '@/components/ui/Tabs'
import TabsBasicExample from '../../components/examples/tabs/TabsBasicExample.vue'
import TabsVariantExample from '../../components/examples/tabs/TabsVariantExample.vue'
import TabsColorExample from '../../components/examples/tabs/TabsColorExample.vue'
import TabsOrientationExample from '../../components/examples/tabs/TabsOrientationExample.vue'
import TabsKeyboardExample from '../../components/examples/tabs/TabsKeyboardExample.vue'
import TabsItemsExample from '../../components/examples/tabs/TabsItemsExample.vue'
import TabsSlotsExample from '../../components/examples/tabs/TabsSlotsExample.vue'
import TabsUiExample from '../../components/examples/tabs/TabsUiExample.vue'

const tabsConfig: ComponentDocConfig = {
  slug: 'tabs',
  title: 'Tabs',
  language: 'en',
  description: 'Organize related content into accessible tab panels.',
  importPath: '@nono-ui/components/ui/Tabs',
  usage: [
    {
      title: 'Basic usage',
      description: 'Switch between two content panels.',
      component: TabsBasicExample,
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Choose the default or line tab style.',
      component: TabsVariantExample,
    },
    {
      title: 'Color',
      description: 'Choose a theme color or custom CSS color for the active tab.',
      component: TabsColorExample,
    },
    {
      title: 'Orientation',
      description: 'Place triggers above or beside their panels.',
      component: TabsOrientationExample,
    },
    {
      title: 'Keyboard behavior',
      description: 'Choose automatic or manual activation and whether arrow navigation wraps.',
      component: TabsKeyboardExample,
    },
    {
      title: 'Items',
      description: 'Configure labels, icons, and disabled tabs.',
      component: TabsItemsExample,
    },
    {
      title: 'Slots',
      description: 'Customize a specific trigger or panel using its slot key.',
      component: TabsSlotsExample,
    },
    {
      title: 'UI',
      description: 'Customize the list, active trigger, panel wrapper, and content attributes.',
      component: TabsUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Names and keyboard navigation',
      description:
        'Give the tab list an accessible name through ui.list, for example with aria-label or aria-labelledby. Arrow keys move focus between triggers; automatic activation opens the focused tab, while manual activation requires Enter or Space.',
    },
    {
      title: 'Panel content',
      description:
        'Use concise trigger labels and keep each panel associated with its matching tab value. Disabled tabs cannot be selected.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'string | number',
        default: 'undefined',
        description: 'Selected tab value, updated with v-model.',
      },
      {
        name: 'tabs',
        type: 'TabItem[]',
        typeLink: '/components/tabs#tab-item',
        default: '[]',
        description: 'Tabs to render in the trigger list and content area.',
      },
      {
        name: 'variant',
        type: tabsVariantNames.map((value) => `'${value}'`).join(' | '),
        default: `'${tabsDefaults.variant}'`,
        description: 'Visual style of the tab list and triggers.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${tabsDefaults.color}'`,
        description: 'Theme token or CSS color for the active tab.',
      },
      {
        name: 'orientation',
        type: tabsOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${tabsDefaults.orientation}'`,
        description: 'Horizontal or vertical trigger layout and keyboard direction.',
      },
      {
        name: 'activationMode',
        type: tabsActivationModes.map((value) => `'${value}'`).join(' | '),
        default: `'${tabsDefaults.activationMode}'`,
        description:
          'Whether focusing a trigger selects it automatically or requires confirmation.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: String(tabsDefaults.loop),
        description: 'Wrap keyboard focus from the last trigger to the first and vice versa.',
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: String(tabsDefaults.unmountOnHide),
        description: 'Unmount panel content when its tab is inactive.',
      },
      {
        name: 'ui',
        type: `{
  list?: () => HTMLAttributes
  contentWrapper?: () => HTMLAttributes
  trigger?: (context: TabsItemContext) => HTMLAttributes
  label?: (context: TabsItemContext) => HTMLAttributes
  content?: (context: TabsItemContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          {
            text: '{\n  list?: () => HTMLAttributes\n  contentWrapper?: () => HTMLAttributes\n  trigger?: (context: ',
          },
          { text: 'TabsItemContext', link: '/components/tabs#tabs-item-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'TabsItemContext', link: '/components/tabs#tabs-item-context' },
          { text: ') => HTMLAttributes\n  content?: (context: ' },
          { text: 'TabsItemContext', link: '/components/tabs#tabs-item-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: 'undefined',
        description: 'Resolvers for list, wrapper, trigger, label, and content attributes.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '[value: string | number | undefined]',
        description: 'Emitted when the selected tab changes.',
      },
    ],
    slots: [
      {
        name: 'trigger',
        type: 'TabsContext',
        typeLink: '/components/tabs#tabs-context',
        description:
          'Shared replacement for trigger content. Replaces the default leading, label, and trailing content.',
      },
      {
        name: 'leading',
        type: 'TabsContext',
        typeLink: '/components/tabs#tabs-context',
        description: 'Shared leading content, replacing the item icon.',
      },
      {
        name: 'label',
        type: 'TabsContext',
        typeLink: '/components/tabs#tabs-context',
        description: 'Shared label content, replacing item labels.',
      },
      {
        name: 'trailing',
        type: 'TabsContext',
        typeLink: '/components/tabs#tabs-context',
        description: 'Shared trailing content, replacing trailing icons.',
      },
      {
        name: 'content',
        type: 'TabsContext',
        typeLink: '/components/tabs#tabs-context',
        description: 'Shared panel content.',
      },
      {
        name: 'trigger-[slot]',
        type: 'TabsItemContext',
        typeLink: '/components/tabs#tabs-item-context',
        description: 'Trigger content for one item; replaces its entire trigger body.',
      },
      {
        name: 'leading-[slot]',
        type: 'TabsItemContext',
        typeLink: '/components/tabs#tabs-item-context',
        description: 'Leading content for one item.',
      },
      {
        name: 'label-[slot]',
        type: 'TabsItemContext',
        typeLink: '/components/tabs#tabs-item-context',
        description: 'Label content for one item.',
      },
      {
        name: 'trailing-[slot]',
        type: 'TabsItemContext',
        typeLink: '/components/tabs#tabs-item-context',
        description: 'Trailing content for one item.',
      },
      {
        name: 'content-[slot]',
        type: 'TabsItemContext',
        typeLink: '/components/tabs#tabs-item-context',
        description: 'Panel content for one item.',
      },
    ],
    configs: [
      {
        id: 'tab-item',
        title: 'TabItem',
        showDefault: false,
        rows: [
          {
            name: 'slot',
            type: 'string',
            required: true,
            description: 'Key used in targeted slot names, such as content-profile.',
          },
          {
            name: 'value',
            type: 'string | number',
            required: true,
            description: 'Unique value used for selection.',
          },
          { name: 'label', type: 'string', description: 'Default trigger text.' },
          {
            name: 'icon',
            type: 'IconName',
            typeLink: '/components/icon#props',
            description: 'Leading icon name.',
          },
          {
            name: 'trailingIcon',
            type: 'IconName',
            typeLink: '/components/icon#props',
            description: 'Trailing icon name.',
          },
          { name: 'disabled', type: 'boolean', description: 'Prevents selecting this tab.' },
          {
            name: 'forceMount',
            type: 'boolean',
            description: 'Keeps this panel mounted even when inactive.',
          },
        ],
      },
      {
        id: 'tabs-context',
        title: 'TabsContext',
        showDefault: false,
        rows: [
          {
            name: 'tabs',
            type: 'TabItem[]',
            typeLink: '/components/tabs#tab-item',
            description: 'The full tab configuration array.',
          },
        ],
      },
      {
        id: 'tabs-item-context',
        title: 'TabsItemContext',
        showDefault: false,
        rows: [
          {
            name: 'tab',
            type: 'TabItem',
            typeLink: '/components/tabs#tab-item',
            description: 'Configuration for this tab.',
          },
          { name: 'index', type: 'number', description: 'Zero-based position in the tabs array.' },
          {
            name: 'active',
            type: 'boolean',
            description: 'Whether this tab matches the selected value.',
          },
          { name: 'first', type: 'boolean', description: 'Whether this is the first tab.' },
          { name: 'last', type: 'boolean', description: 'Whether this is the last tab.' },
        ],
      },
    ],
    expose: [],
  },
}

export default tabsConfig
