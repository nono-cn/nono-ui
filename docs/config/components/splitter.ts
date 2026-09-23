import type { ComponentDocConfig } from '../component-docs'
import SplitterBasicExample from '../../components/examples/splitter/SplitterBasicExample.vue'
import SplitterDirectionExample from '../../components/examples/splitter/SplitterDirectionExample.vue'
import SplitterNestedExample from '../../components/examples/splitter/SplitterNestedExample.vue'
import SplitterDefaultSizeExample from '../../components/examples/splitter/SplitterDefaultSizeExample.vue'
import SplitterDisabledExample from '../../components/examples/splitter/SplitterDisabledExample.vue'
import SplitterSlotsExample from '../../components/examples/splitter/SplitterSlotsExample.vue'

const splitterConfig: ComponentDocConfig = {
  slug: 'splitter',
  title: 'Splitter',
  language: 'en',
  description: 'Divide an area into resizable panels with accessible handles.',
  importPath: '@nono-ui/components/ui/Splitter',
  usage: [
    {
      title: 'Basic usage',
      description: 'Define multiple panels, their initial sizes, and their content.',
      component: SplitterBasicExample,
    },
  ],
  examples: [
    {
      title: 'Direction',
      description: 'Arrange panels vertically.',
      component: SplitterDirectionExample,
    },
    {
      title: 'Nested',
      description: 'Combine panel groups to create a layout with multiple resizable areas.',
      component: SplitterNestedExample,
    },
    {
      title: 'Default size',
      description: "Set each panel's initial size and constrain its dimensions.",
      component: SplitterDefaultSizeExample,
    },
    {
      title: 'Disabled',
      description: 'Disable the resize handles.',
      component: SplitterDisabledExample,
    },
    {
      title: 'Slots',
      description: 'Customize panels and handles with default and targeted slots.',
      component: SplitterSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Keyboard resizing',
      description:
        'Resize handles are focusable and let users adjust panel sizes with the keyboard. Keep focus visible, and do not rely on color alone to distinguish the divider.',
    },
  ],
  api: {
    props: [
      { name: 'id', type: 'string', default: 'undefined', description: 'Group identifier.' },
      {
        name: 'autoSaveId',
        type: 'string | null',
        default: 'null',
        description: 'Identifier used to save and restore the layout in storage.',
      },
      {
        name: 'direction',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Panel orientation.',
      },
      {
        name: 'keyboardResizeBy',
        type: 'number',
        default: '10',
        description: 'Percentage to adjust a panel by at each keyboard step.',
      },
      {
        name: 'storage',
        type: 'Storage',
        default: 'undefined',
        description: 'Custom storage for the persisted layout.',
      },
      {
        name: 'hitAreaMargins',
        type: '{ mouse: number; touch: number }',
        default: 'undefined',
        description: 'Expands the interactive area of the resize handles.',
      },
      {
        name: 'tabindex',
        type: 'number',
        default: 'undefined',
        description: 'Tab index for the resize handles.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'undefined',
        description: 'Disables the resize handles.',
      },
      {
        name: 'nonce',
        type: 'string',
        default: 'undefined',
        description: 'Nonce applied to the resize handles.',
      },
      {
        name: 'items',
        type: 'SplitterItem[]',
        typeLink: '#splitter-item',
        default: '[]',
        description: 'Panels to render and their sizing options.',
      },
      {
        name: 'ui',
        type: `{
  panel?: (context: SplitterItemContext) => HTMLAttributes
  resizeHandle?: (context: SplitterItemContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  panel?: (context: ' },
          { text: 'SplitterItemContext', link: '#splitter-item-context' },
          { text: ') => HTMLAttributes\n  resizeHandle?: (context: ' },
          { text: 'SplitterItemContext', link: '#splitter-item-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description: 'Resolvers for adding attributes and classes to panels and resize handles.',
      },
    ],
    configs: [
      {
        id: 'splitter-item',
        title: 'SplitterItem',
        typeLabel: 'SplitterItem',
        rows: [
          {
            name: 'slot',
            type: 'string',
            default: 'undefined',
            description: 'Name used to resolve targeted slots.',
          },
          {
            name: 'id',
            type: 'string',
            default: 'undefined',
            description: 'Panel identifier.',
          },
          {
            name: 'collapsedSize',
            type: 'number',
            default: 'undefined',
            description: 'Size of the collapsed panel.',
          },
          {
            name: 'collapsible',
            type: 'boolean',
            default: 'undefined',
            description: 'Whether the panel can collapse.',
          },
          {
            name: 'defaultSize',
            type: 'number',
            default: 'undefined',
            description: 'Initial panel size.',
          },
          {
            name: 'maxSize',
            type: 'number',
            default: 'undefined',
            description: 'Maximum panel size.',
          },
          {
            name: 'minSize',
            type: 'number',
            default: 'undefined',
            description: 'Minimum panel size.',
          },
          { name: 'order', type: 'number', default: 'undefined', description: 'Panel order.' },
          {
            name: 'sizeUnit',
            type: "'%' | 'px'",
            default: 'undefined',
            description: 'Panel size unit.',
          },
          {
            name: 'class',
            type: 'string',
            default: 'undefined',
            description: 'Additional class for the panel.',
          },
          {
            name: 'style',
            type: 'StyleValue',
            default: 'undefined',
            description: 'Additional styles for the panel.',
          },
        ],
      },
      {
        id: 'splitter-item-context',
        title: 'SplitterItemContext',
        description: 'Context available in slots and ui resolvers.',
        rows: [
          { name: 'layout', type: 'number[]', description: 'Current panel sizes.' },
          {
            name: 'item',
            type: 'SplitterItem',
            typeLink: '#splitter-item',
            description: 'Configuration for the current panel.',
          },
          { name: 'index', type: 'number', description: 'Index of the current panel.' },
          { name: 'first', type: 'boolean', description: 'Whether this is the first panel.' },
          { name: 'last', type: 'boolean', description: 'Whether this is the last panel.' },
          {
            name: 'nextItem',
            type: 'SplitterItem | undefined',
            typeLink: '#splitter-item',
            description: 'Configuration for the next panel, if one exists.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'layout',
        type: '[layout: number[]]',
        description: 'Emitted when the layout changes.',
      },
      { name: 'collapse', type: '[]', description: 'Emitted when a panel collapses.' },
      { name: 'expand', type: '[]', description: 'Emitted when a panel expands.' },
      {
        name: 'resize',
        type: '[size: number, previousSize: number | undefined]',
        description: 'Emitted when a panel changes size.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: 'SplitterItemContext',
        typeLink: '#splitter-item-context',
        description: 'Content for panels without a named slot.',
      },
      {
        name: 'handle',
        type: 'SplitterItemContext',
        typeLink: '#splitter-item-context',
        description: 'Content for handles without a named slot.',
      },
      {
        name: 'panel-{slot}',
        type: 'SplitterItemContext',
        typeLink: '#splitter-item-context',
        description: 'Content for the panel whose item.slot matches the slot name.',
      },
      {
        name: 'handle-{slot}',
        type: 'SplitterItemContext',
        typeLink: '#splitter-item-context',
        description: 'Content for the handle whose item.slot matches the slot name.',
      },
    ],
    expose: [],
  },
}

export default splitterConfig
