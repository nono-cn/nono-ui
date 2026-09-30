import type { ComponentDocConfig } from '../component-docs'
import { breadcrumbVariantNames } from '@/components/ui/Breadcrumb'
import BreadcrumbUsageExample from '../../components/examples/breadcrumb/BreadcrumbUsageExample.vue'
import BreadcrumbEllipsisExample from '../../components/examples/breadcrumb/BreadcrumbEllipsisExample.vue'
import BreadcrumbSeparatorIconExample from '../../components/examples/breadcrumb/BreadcrumbSeparatorIconExample.vue'
import BreadcrumbOnlyIconsExample from '../../components/examples/breadcrumb/BreadcrumbOnlyIconsExample.vue'
import BreadcrumbVariantExample from '../../components/examples/breadcrumb/BreadcrumbVariantExample.vue'
import BreadcrumbUiExample from '../../components/examples/breadcrumb/BreadcrumbUiExample.vue'
import BreadcrumbSlotsExample from '../../components/examples/breadcrumb/BreadcrumbSlotsExample.vue'

const breadcrumbConfig: ComponentDocConfig = {
  slug: 'breadcrumb',
  title: 'Breadcrumb',
  language: 'en',
  description: 'Shows the current page within a navigable hierarchy.',
  importPath: '@nono-ui/components/ui/Breadcrumb',
  usage: [
    {
      title: 'Basic usage',
      description: 'Navigate a hierarchy with a current-page item.',
      component: BreadcrumbUsageExample,
    },
  ],
  examples: [
    {
      title: 'Ellipsis range',
      description: 'Choose the collapsed range and the icon displayed in its place.',
      component: BreadcrumbEllipsisExample,
    },
    {
      title: 'Separator icon',
      description: 'Choose the icon displayed between breadcrumb items.',
      component: BreadcrumbSeparatorIconExample,
    },
    {
      title: 'Icon-only items',
      description: 'Show only item icons with accessible names.',
      component: BreadcrumbOnlyIconsExample,
    },
    {
      title: 'Variant',
      description: 'Choose an unframed, outlined, or double-bordered breadcrumb.',
      component: BreadcrumbVariantExample,
    },
    {
      title: 'UI',
      description: 'Create a full-width muted breadcrumb bar with a slash separator.',
      component: BreadcrumbUiExample,
    },
    {
      title: 'Custom slots',
      description: 'Replace the content of the ellipsis, separators, and items.',
      component: BreadcrumbSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Navigation landmark',
      description:
        'Breadcrumb renders a nav with an ordered list. Give the nav a descriptive aria-label so it can be distinguished from other navigation landmarks.',
    },
    {
      title: 'Current page and collapsed levels',
      description:
        'The current page receives aria-current="page" on its default Link. If you replace an item with a custom slot, apply aria-current="page" to its current-page element. Keep its label meaningful and describe hidden levels in custom ellipsis content.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'BreadcrumbItem[]',
        typeLink: '#breadcrumb-item',
        default: '[]',
        description: 'Ordered items in the navigation hierarchy.',
      },
      {
        name: 'ellipsisIndex',
        type: '[start: number, end: number]',
        default: 'undefined',
        description:
          'Replaces the item at start with an ellipsis and hides items from start + 1 through end (inclusive). The range must hide at least one item and leave the current page visible.',
      },
      {
        name: 'ellipsisIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: "'moreHorizontal'",
        description: 'Icon name used by the ellipsis fallback.',
      },
      {
        name: 'separatorIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: "'chevronRight'",
        description: 'Icon name used by the separator fallback.',
      },
      {
        name: 'variant',
        type: breadcrumbVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: "'plain'",
        description:
          'Layout of the breadcrumb container: unframed, outlined, or framed with two subtle borders.',
      },
      {
        name: 'ui',
        type: `{
  list?: () => HTMLAttributes
  ellipsisContainer?: () => HTMLAttributes
  separatorContainer?: () => HTMLAttributes
  item?: (context: BreadcrumbItemContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          {
            text: '{\n  list?: () => HTMLAttributes\n  ellipsisContainer?: () => HTMLAttributes\n  separatorContainer?: () => HTMLAttributes\n  item?: (context: ',
          },
          { text: 'BreadcrumbItemContext', link: '#breadcrumb-item-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: 'undefined',
        description:
          'Attribute resolvers for the list, ellipsis container, separator container, and each visible item. Only item receives a context.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'ellipsis',
        type: 'BreadcrumbEllipsisContext',
        typeLink: '#breadcrumb-ellipsis-context',
        description: 'Replaces the ellipsis icon and receives the hidden items.',
      },
      {
        name: 'separator',
        type: '-',
        description: 'Replaces each separator icon.',
      },
      {
        name: 'item',
        type: 'BreadcrumbItemContext',
        typeLink: '#breadcrumb-item-context',
        description: 'Custom content for every visible item without a matching item-specific slot.',
      },
      {
        name: 'item-{slot}',
        type: 'BreadcrumbItemContext',
        typeLink: '#breadcrumb-item-context',
        description:
          'Custom content for the item with the matching slot key; takes precedence over item.',
      },
    ],
    configs: [
      {
        id: 'breadcrumb-item',
        title: 'BreadcrumbItem',
        typeLabel: 'Item',
        showDefault: false,
        description:
          'Each item is a slot key plus LinkProps except variant and color. Links use muted text that becomes foreground on hover, while items without a destination use foreground text.',
        rows: [
          {
            name: 'slot',
            type: 'string',
            required: true,
            description: 'Unique key used for rendering and the item-specific slot name.',
          },
          {
            name: '...LinkProps',
            type: "Omit<LinkProps, 'variant' | 'color'>",
            description:
              'Passed to Link, including label, icon, trailingIcon, to, replace, size, and radius. Every item uses the plain Link variant and neutral color; without to, Link renders a non-navigating div.',
          },
        ],
      },
      {
        id: 'breadcrumb-item-context',
        title: 'BreadcrumbItemContext',
        typeLabel: 'Context',
        showDefault: false,
        description: 'Passed to the item UI resolver and item slots.',
        rows: [
          {
            name: 'item',
            type: 'BreadcrumbItem',
            typeLink: '#breadcrumb-item',
            description: 'The source item.',
          },
          { name: 'index', type: 'number', description: 'Index in the original items array.' },
          { name: 'first', type: 'boolean', description: 'Whether this is the first item.' },
          {
            name: 'last',
            type: 'boolean',
            description:
              'Whether this is the last visible item; its default Link uses foreground text without extra weight.',
          },
          {
            name: 'linked',
            type: 'boolean',
            description: 'Whether the item has a destination and is not the ellipsis placeholder.',
          },
          {
            name: 'ellipsis',
            type: 'boolean',
            description: 'Whether the item is replaced by the ellipsis.',
          },
        ],
      },
      {
        id: 'breadcrumb-ellipsis-context',
        title: 'BreadcrumbEllipsisContext',
        typeLabel: 'Context',
        showDefault: false,
        description: 'Passed to the ellipsis slot.',
        rows: [
          {
            name: 'items',
            type: 'BreadcrumbItem[]',
            typeLink: '#breadcrumb-item',
            description: 'Items hidden after the ellipsis placeholder through the end index.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default breadcrumbConfig
