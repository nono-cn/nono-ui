import type { ComponentDocConfig } from '../component-docs'
import { buttonVariantNames } from '@/components/ui/Button'
import { paginationDefaults, paginationSizes } from '@/components/ui/Pagination'
import { formatValue } from '../format-default'
import PaginationBasicExample from '../../components/examples/pagination/PaginationBasicExample.vue'
import PaginationRangeExample from '../../components/examples/pagination/PaginationRangeExample.vue'
import PaginationControlsExample from '../../components/examples/pagination/PaginationControlsExample.vue'
import PaginationSizeExample from '../../components/examples/pagination/PaginationSizeExample.vue'
import PaginationVariantExample from '../../components/examples/pagination/PaginationVariantExample.vue'
import PaginationColorExample from '../../components/examples/pagination/PaginationColorExample.vue'
import PaginationDisabledExample from '../../components/examples/pagination/PaginationDisabledExample.vue'
import PaginationSlotsExample from '../../components/examples/pagination/PaginationSlotsExample.vue'
import PaginationUiExample from '../../components/examples/pagination/PaginationUiExample.vue'

const toUnion = (values: readonly string[]) => values.map((value) => `'${value}'`).join(' | ')

const paginationConfig: ComponentDocConfig = {
  slug: 'pagination',
  title: 'Pagination',
  language: 'en',
  description: 'Navigation between the pages of a long list or table.',
  importPath: '@nono-ui/components/ui/Pagination',
  usage: [
    {
      title: 'Basic usage',
      description:
        'Bind the current page with v-model:page and pass the total number of items and how many fit on a page.',
      component: PaginationBasicExample,
    },
  ],
  examples: [
    {
      title: 'Range',
      description:
        'Choose how many pages are shown around the current one, and whether the first and last pages stay visible.',
      component: PaginationRangeExample,
    },
    {
      title: 'Controls',
      description: 'Show or hide the first, previous, next, and last buttons.',
      component: PaginationControlsExample,
    },
    {
      title: 'Size',
      description: 'Change the size of the buttons, icons, and ellipsis.',
      component: PaginationSizeExample,
    },
    {
      title: 'Variant',
      description:
        'Use one Button variant for the pages and controls, and another for the current page.',
      component: PaginationVariantExample,
    },
    {
      title: 'Color',
      description:
        'Choose a theme token or a custom CSS color for the buttons, and optionally another one for the current page.',
      component: PaginationColorExample,
    },
    {
      title: 'Disabled',
      description: 'Disable every page and control, for example while the next page is loading.',
      component: PaginationDisabledExample,
    },
    {
      title: 'Slots',
      description:
        'Replace the controls with your own Button, and add content before or after the pages.',
      component: PaginationSlotsExample,
    },
    {
      title: 'UI',
      description:
        'Customize the list, each control, each page, and the ellipsis using the pagination context or the context of each item.',
      component: PaginationUiExample,
    },
  ],
  accessibility: [
    {
      title: 'Navigation landmark',
      description:
        'The root is a nav element with no name by default. When a page has more than one pagination, pass a distinct aria-label to each.',
    },
    {
      title: 'Current page',
      description:
        'Each page is a button named "Page N", and the current one has aria-current="page". The first, previous, next, and last buttons are named after their action, and are disabled on the first or last page.',
    },
    {
      title: 'Ellipsis',
      description:
        'The ellipsis is not focusable. Its icon is hidden from assistive technologies and a visually hidden "More pages" text is read instead.',
    },
    {
      title: 'Custom controls and pages',
      description:
        'The content of the first, previous, next, last, and item slots is rendered as the button itself, so it must be a single element, such as a Button. It receives the click handler, disabled, aria-label, and aria-current. Keep the visible text inside the accessible name.',
    },
  ],
  api: {
    props: [
      {
        name: 'page',
        type: 'number',
        default: '1',
        description: 'Current page, starting at 1; updated with v-model:page.',
      },
      {
        name: 'total',
        type: 'number',
        default: formatValue(paginationDefaults.total),
        description: 'Total number of items across all pages.',
      },
      {
        name: 'itemsPerPage',
        type: 'number',
        default: formatValue(paginationDefaults.itemsPerPage),
        description: 'Number of items on each page, used to work out the page count.',
      },
      {
        name: 'siblingCount',
        type: 'number',
        default: formatValue(paginationDefaults.siblingCount),
        description: 'Pages shown on each side of the current one before an ellipsis.',
      },
      {
        name: 'showEdges',
        type: 'boolean',
        default: formatValue(paginationDefaults.showEdges),
        description:
          'Always shows the first and last pages, with an ellipsis when pages are hidden.',
      },
      {
        name: 'showControls',
        type: 'boolean',
        default: formatValue(paginationDefaults.showControls),
        description: 'Shows the first, previous, next, and last buttons.',
      },
      {
        name: 'size',
        type: toUnion(paginationSizes),
        default: formatValue(paginationDefaults.size),
        description: 'Size of the buttons, icons, and ellipsis.',
      },
      {
        name: 'variant',
        type: toUnion(buttonVariantNames),
        typeLink: '/components/button#props',
        default: formatValue(paginationDefaults.variant),
        description: 'Button variant for the controls and the pages that are not current.',
      },
      {
        name: 'activeVariant',
        type: toUnion(buttonVariantNames),
        typeLink: '/components/button#props',
        default: formatValue(paginationDefaults.activeVariant),
        description: 'Button variant for the current page.',
      },
      {
        name: 'color',
        type: 'string',
        default: formatValue(paginationDefaults.color),
        description: 'Theme token or CSS color for the controls and pages.',
      },
      {
        name: 'activeColor',
        type: 'string',
        default: formatValue(paginationDefaults.activeColor),
        description: 'Theme token or CSS color for the current page. Falls back to color.',
      },
      {
        name: 'firstIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: formatValue(paginationDefaults.firstIcon),
        description: 'Icon of the first page button.',
      },
      {
        name: 'previousIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: formatValue(paginationDefaults.previousIcon),
        description: 'Icon of the previous page button.',
      },
      {
        name: 'nextIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: formatValue(paginationDefaults.nextIcon),
        description: 'Icon of the next page button.',
      },
      {
        name: 'lastIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: formatValue(paginationDefaults.lastIcon),
        description: 'Icon of the last page button.',
      },
      {
        name: 'ellipsisIcon',
        type: 'IconName',
        typeLink: '/components/icon#props',
        default: formatValue(paginationDefaults.ellipsisIcon),
        description: 'Icon shown where pages are hidden.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: formatValue(paginationDefaults.disabled),
        description: 'Disables every page and control.',
      },
      {
        name: 'ui',
        type: `{
  list?: (context: PaginationContext) => HTMLAttributes
  first?: (context: PaginationContext) => HTMLAttributes
  previous?: (context: PaginationContext) => HTMLAttributes
  next?: (context: PaginationContext) => HTMLAttributes
  last?: (context: PaginationContext) => HTMLAttributes
  item?: (context: PaginationItemContext) => HTMLAttributes
  ellipsis?: (context: PaginationItemContext) => HTMLAttributes
}`,
        typePre: true,
        typeParts: [
          { text: '{\n  list?: (context: ' },
          { text: 'PaginationContext', link: '#pagination-context' },
          { text: ') => HTMLAttributes\n  first?: (context: ' },
          { text: 'PaginationContext', link: '#pagination-context' },
          { text: ') => HTMLAttributes\n  previous?: (context: ' },
          { text: 'PaginationContext', link: '#pagination-context' },
          { text: ') => HTMLAttributes\n  next?: (context: ' },
          { text: 'PaginationContext', link: '#pagination-context' },
          { text: ') => HTMLAttributes\n  last?: (context: ' },
          { text: 'PaginationContext', link: '#pagination-context' },
          { text: ') => HTMLAttributes\n  item?: (context: ' },
          { text: 'PaginationItemContext', link: '#pagination-item-context' },
          { text: ') => HTMLAttributes\n  ellipsis?: (context: ' },
          { text: 'PaginationItemContext', link: '#pagination-item-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        default: formatValue(paginationDefaults.ui),
        description:
          'Resolvers for attributes and classes on the list, the first, previous, next, and last buttons, each page button, and each ellipsis.',
      },
    ],
    configs: [
      {
        id: 'pagination-context',
        title: 'PaginationContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description:
          'Context passed to the leading, trailing, first, previous, next, and last slots and the list and control resolvers.',
        rows: [
          { name: 'page', type: 'number', description: 'Current page, starting at 1.' },
          { name: 'pageCount', type: 'number', description: 'Number of pages, at least 1.' },
          { name: 'disabled', type: 'boolean', description: 'Whether the pagination is disabled.' },
        ],
      },
      {
        id: 'pagination-item-context',
        title: 'PaginationItemContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Context passed to the item and ellipsis slots and resolvers.',
        rows: [
          {
            name: 'item',
            type: "{ type: 'page'; value: number } | { type: 'ellipsis' }",
            description: 'A page with its number, or an ellipsis.',
          },
          {
            name: 'index',
            type: 'number',
            description: 'Zero-based position among the pages and ellipses.',
          },
          { name: 'active', type: 'boolean', description: 'Whether this is the current page.' },
          { name: 'disabled', type: 'boolean', description: 'Whether the pagination is disabled.' },
        ],
      },
    ],
    emits: [
      {
        name: 'update:page',
        type: '[value: number]',
        description: 'Emitted when a page or control changes the current page.',
      },
    ],
    slots: [
      {
        name: 'leading',
        type: 'PaginationContext',
        typeLink: '#pagination-context',
        description: 'Content before the first control.',
      },
      {
        name: 'trailing',
        type: 'PaginationContext',
        typeLink: '#pagination-context',
        description: 'Content after the last control.',
      },
      {
        name: 'first',
        type: 'PaginationContext',
        typeLink: '#pagination-context',
        description: 'Replaces the first page button. Must be a single element.',
      },
      {
        name: 'previous',
        type: 'PaginationContext',
        typeLink: '#pagination-context',
        description: 'Replaces the previous page button. Must be a single element.',
      },
      {
        name: 'next',
        type: 'PaginationContext',
        typeLink: '#pagination-context',
        description: 'Replaces the next page button. Must be a single element.',
      },
      {
        name: 'last',
        type: 'PaginationContext',
        typeLink: '#pagination-context',
        description: 'Replaces the last page button. Must be a single element.',
      },
      {
        name: 'item',
        type: 'PaginationItemContext',
        typeLink: '#pagination-item-context',
        description: 'Replaces every page button. Must be a single element.',
      },
      {
        name: 'ellipsis',
        type: 'PaginationItemContext',
        typeLink: '#pagination-item-context',
        description: 'Replaces the icon and hidden text of every ellipsis.',
      },
    ],
    expose: [],
  },
}

export default paginationConfig
