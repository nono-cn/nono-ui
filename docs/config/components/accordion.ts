import type { ComponentDocConfig } from '../component-docs'
import AccordionBasicExample from '../../components/examples/accordion/AccordionBasicExample.vue'
import AccordionTypeExample from '../../components/examples/accordion/AccordionTypeExample.vue'
import AccordionValueExample from '../../components/examples/accordion/AccordionValueExample.vue'
import AccordionCollapsibleExample from '../../components/examples/accordion/AccordionCollapsibleExample.vue'
import AccordionDisabledExample from '../../components/examples/accordion/AccordionDisabledExample.vue'
import AccordionItemsExample from '../../components/examples/accordion/AccordionItemsExample.vue'
import AccordionIconDropDownExample from '../../components/examples/accordion/AccordionIconDropDownExample.vue'
import AccordionSlotsExample from '../../components/examples/accordion/AccordionSlotsExample.vue'

const accordionConfig: ComponentDocConfig = {
  slug: 'accordion',
  title: 'Accordion',
  language: 'en',
  description: 'Show and hide related content sections with accessible triggers.',
  importPath: '@nono-ui/components/ui/Accordion',
  usage: [
    {
      title: 'Basic usage',
      description: 'Define each section with a value, title, and description.',
      component: AccordionBasicExample,
    },
  ],
  examples: [
    {
      title: 'Type',
      description: 'Allow one or multiple sections to stay open at the same time.',
      component: AccordionTypeExample,
    },
    {
      title: 'Value',
      description: 'Control the open section with v-model:value.',
      component: AccordionValueExample,
    },
    {
      title: 'Collapsible',
      description: 'Allow the open section to be closed in single mode.',
      component: AccordionCollapsibleExample,
    },
    {
      title: 'Disabled',
      description: 'Disable the entire accordion.',
      component: AccordionDisabledExample,
    },
    {
      title: 'Items',
      description: 'Configure each section’s content, icon, and state.',
      component: AccordionItemsExample,
    },
    {
      title: 'Dropdown icon',
      description: 'Customize the trigger icons for the open and closed states.',
      component: AccordionIconDropDownExample,
    },
    {
      title: 'Slots example',
      description: 'Customize an item’s content with targeted slots.',
      component: AccordionSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Triggers and content',
      description:
        'The component renders triggers and content with the semantics and accessible states provided by Reka UI. Use descriptive labels and preserve keyboard access to open and close each section.',
      links: [
        {
          label: 'Read the Reka UI Accordion accessibility guide',
          href: 'https://www.reka-ui.com/docs/components/accordion#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'type',
        type: "'single' | 'multiple'",
        default: "'single'",
        description: 'Whether one or multiple sections can stay open.',
      },
      {
        name: 'value',
        type: 'string | string[] | undefined',
        description: 'Open section value in single mode or open section values in multiple mode.',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description: 'In single mode, allows the open section to be closed.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables all accordion items.',
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: 'true',
        description:
          'Unmounts content when a section is closed, unless the item sets a different value.',
      },
      {
        name: 'items',
        type: 'AccordionItem[]',
        typeLink: '#accordion-item',
        default: '[]',
        description: 'Items to render, with value, label, description, icon, and per-item options.',
      },
      {
        name: 'iconDropDownOpen',
        type: 'IconConfig',
        default: "{ name: 'chevronUp' }",
        description: 'Configuration for the icon shown when an item is open.',
      },
      {
        name: 'iconDropDownClose',
        type: 'IconConfig',
        default: "{ name: 'chevronDown' }",
        description: 'Configuration for the icon shown when an item is closed.',
      },
      {
        name: 'ui',
        type: `{
  item?: (context: AccordionItemContext) => HTMLAttributes
  trigger?: (context: AccordionItemContext) => HTMLAttributes
  content?: (context: AccordionItemContext) => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers for adding attributes and classes to item, trigger, and content based on the item context.',
      },
    ],
    configs: [
      {
        id: 'accordion-item',
        title: 'AccordionItem',
        typeLabel: 'AccordionItem',
        rows: [
          {
            name: 'value',
            type: 'string',
            description: 'Unique identifier and value for the item.',
            required: true,
          },
          {
            name: 'label',
            type: 'string',
            default: 'undefined',
            description: 'Text shown in the default trigger.',
          },
          {
            name: 'description',
            type: 'string',
            default: 'undefined',
            description: 'Text shown in the default content.',
          },
          {
            name: 'icon',
            type: 'IconConfig',
            typeLink: '/components/icon#icon-config',
            default: 'undefined',
            description: 'Icon shown before the label.',
          },
          {
            name: 'slot',
            type: 'string',
            default: 'undefined',
            description: 'Name used to resolve targeted slots for this item.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables this item.',
          },
          {
            name: 'unmountOnHide',
            type: 'boolean',
            default: 'undefined',
            description:
              'Whether to unmount this item’s content when closed; inherits the accordion value when unset.',
          },
        ],
      },
      {
        id: 'accordion-item-context',
        title: 'AccordionItemContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to slots and UI resolvers for each item.',
        rows: [
          {
            name: 'item',
            type: 'AccordionItem',
            typeLink: '#accordion-item',
            description: 'Data and options for the current item.',
          },
          {
            name: 'index',
            type: 'number',
            description: 'Zero-based index of the item.',
          },
          {
            name: 'open',
            type: 'boolean',
            description: 'Whether the item is open.',
          },
          {
            name: 'first',
            type: 'boolean',
            description: 'Whether this is the first item in the accordion.',
          },
          {
            name: 'last',
            type: 'boolean',
            description: 'Whether this is the last item in the accordion.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: 'string | string[] | undefined',
        description: 'Emitted when the open value changes.',
      },
    ],
    slots: [
      {
        name: 'trigger',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Replaces the entire trigger.',
      },
      {
        name: 'leading',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Content placed before the label.',
      },
      {
        name: 'label',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Replaces the trigger label.',
      },
      {
        name: 'content',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Replaces the content description.',
      },
      {
        name: 'iconDropdown',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Replaces the trigger state icon.',
      },
      {
        name: 'trigger-{slot}',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Replaces the trigger for the item whose item.slot matches {slot}.',
      },
      {
        name: 'leading-{slot}',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Content before the label for the item whose item.slot matches {slot}.',
      },
      {
        name: 'label-{slot}',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Replaces the label for the item whose item.slot matches {slot}.',
      },
      {
        name: 'content-{slot}',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Replaces the content for the item whose item.slot matches {slot}.',
      },
    ],
    expose: [],
  },
}

export default accordionConfig
