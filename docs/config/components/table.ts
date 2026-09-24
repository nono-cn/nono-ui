import type { ComponentDocConfig } from '../component-docs'
import TableBasicExample from '../../components/examples/table/TableBasicExample.vue'
import TableSortingExample from '../../components/examples/table/TableSortingExample.vue'

const tableConfig: ComponentDocConfig = {
  slug: 'table',
  title: 'Table',
  language: 'en',
  description: 'Displays and sorts tabular data using TanStack Table for Vue.',
  importPath: '@nono-ui/components/ui/Table',
  usage: [
    {
      title: 'Basic usage',
      description:
        'Define typed columns and reactive data. Sorting is disabled by default; set enableSorting to true on columns that should be sortable.',
      component: TableBasicExample,
    },
  ],
  examples: [
    {
      title: 'Sorting',
      description:
        'Set enableSorting: true on each sortable column. The sorting state is managed internally; activate a sortable header to change its order, or use the sort slot to customize the indicator.',
      component: TableSortingExample,
    },
  ],
  accessibility: [],
  api: {
    props: [
      {
        name: 'columns',
        type: 'TableColumnDef<TData>[]',
        default: '[]',
        description:
          'Column definitions used to render table headers and cells. Set enableSorting: true on columns that should support sorting; it is false by default.',
      },
      {
        name: 'data',
        type: 'TData[]',
        default: '[]',
        description: 'Reactive row data passed to the TanStack table instance.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'sort',
        type: "{ sorted: false | 'asc' | 'desc' }",
        description:
          'Replaces the default sort indicator in sortable headers. Receives the current sorting state for that column.',
      },
    ],
    expose: [],
  },
}

export default tableConfig
