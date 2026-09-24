import type { ComponentDocConfig } from '../component-docs'
import TableBasicExample from '../../components/examples/table/TableBasicExample.vue'

const tableConfig: ComponentDocConfig = {
  slug: 'table',
  title: 'Table',
  language: 'en',
  description: 'Displays tabular data using TanStack Table for Vue.',
  importPath: '@nono-ui/components/ui/Table',
  usage: [
    {
      title: 'Basic usage',
      description: 'Define typed columns and reactive data, then render them with Table.',
      component: TableBasicExample,
    },
  ],
  examples: [],
  accessibility: [],
  api: {
    props: [
      {
        name: 'columns',
        type: 'TableColumnDef<TData>[]',
        default: '[]',
        description: 'Column definitions used to render table headers and cells.',
      },
      {
        name: 'data',
        type: 'TData[]',
        default: '[]',
        description: 'Reactive row data passed to the TanStack table instance.',
      },
    ],
    emits: [],
    slots: [],
    expose: [],
  },
}

export default tableConfig
