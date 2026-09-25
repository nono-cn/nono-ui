import type { ComponentDocConfig } from '../component-docs'
import TableBasicExample from '../../components/examples/table/TableBasicExample.vue'
import TableSortingExample from '../../components/examples/table/TableSortingExample.vue'
import TableCellSpanningExample from '../../components/examples/table/TableCellSpanningExample.vue'
import TableColumnSpanningExample from '../../components/examples/table/TableColumnSpanningExample.vue'
import TableColumnPinningExample from '../../components/examples/table/TableColumnPinningExample.vue'
import TableColumnSizingExample from '../../components/examples/table/TableColumnSizingExample.vue'
import TableColumnResizingExample from '../../components/examples/table/TableColumnResizingExample.vue'
import TableColumnVisibilityExample from '../../components/examples/table/TableColumnVisibilityExample.vue'

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
    {
      title: 'Cell spanning',
      description:
        'Set spanRows on a column and render the spans returned by TanStack to merge adjacent cells.',
      component: TableCellSpanningExample,
    },
    {
      title: 'Column spanning',
      description:
        'Use spanColumns to set a cell’s colspan per row. Return Infinity to span to the end of its pinned region.',
      component: TableColumnSpanningExample,
    },
    {
      title: 'Column pinning',
      description:
        'Pin a column to the start of the table with the header button, then scroll horizontally to see it stay in place.',
      component: TableColumnPinningExample,
    },
    {
      title: 'Column sizing',
      description:
        'Set size on column definitions to control pixel widths; the rendered table uses their combined width.',
      component: TableColumnSizingExample,
    },
    {
      title: 'Column resizing',
      description:
        'Enable resizing per column and drag its header handle to adjust the width within the configured bounds.',
      component: TableColumnResizingExample,
    },
    {
      title: 'Column visibility',
      description:
        'Share column visibility state between Table and an external TableColumnVisibility control.',
      component: TableColumnVisibilityExample,
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
      {
        name: 'columnVisibility',
        type: 'ColumnVisibilityState',
        default: '{}',
        description:
          'Visibility map by column ID. Use v-model:column-visibility to connect an external visibility control.',
      },
    ],
    configs: [
      {
        id: 'column',
        title: 'Column',
        description:
          'Column definitions follow TanStack Table’s ColumnDef API. These are the common accessor and display options supported by this table.',
        rows: [
          {
            name: 'accessorKey',
            type: 'keyof TData | string',
            description:
              'Reads a value from each row by property key. Use this for columns backed by a data field.',
          },
          {
            name: 'accessorFn',
            type: '(row: TData, index: number) => TValue',
            description:
              'Computes the column value from the original row when a property key is not sufficient.',
          },
          {
            name: 'header',
            type: 'string | (context) => unknown',
            description: 'Header text or a render function for custom header content.',
          },
          {
            name: 'cell',
            type: 'string | (context) => unknown',
            description:
              'Optional cell template. When omitted, the table renders the column value.',
          },
          {
            name: 'id',
            type: 'string',
            description:
              'Explicit stable column identifier. Useful with accessorFn or when the header is not a string.',
          },
          {
            name: 'size',
            type: 'number',
            default: '150',
            description: 'Sets the column width in pixels.',
          },
          {
            name: 'minSize',
            type: 'number',
            default: '20',
            description: 'Minimum width allowed when resizing the column.',
          },
          {
            name: 'maxSize',
            type: 'number',
            default: '9007199254740991',
            description: 'Maximum width allowed when resizing the column.',
          },
          {
            name: 'enableSorting',
            type: 'boolean',
            default: 'false',
            description:
              'Allows sorting this column. The Table component disables sorting by default; set this to true to enable its sortable header.',
          },
          {
            name: 'enablePinning',
            type: 'boolean',
            default: 'false',
            description:
              'Allows this column to be pinned. Set this to true to show its pin button.',
          },
          {
            name: 'enableHiding',
            type: 'boolean',
            default: 'true',
            description:
              'Allows this column to be hidden through a column visibility control. Set this to false to keep it always visible.',
          },
          {
            name: 'enableResizing',
            type: 'boolean',
            default: 'false',
            description:
              'Shows a resize handle on the column header. Drag it or focus it and use the arrow keys to adjust the width.',
          },
          {
            name: 'spanRows',
            type: 'boolean | (context) => boolean',
            description:
              'Merges adjacent body cells with equal values when true, or uses a predicate to decide whether a row joins the current span.',
          },
          {
            name: 'spanColumns',
            type: 'number | (context) => number',
            description:
              'Sets a cell’s horizontal span per row. Return Infinity to span to the end of the available pinned region.',
          },
          {
            name: 'enableCellSpanning',
            type: 'boolean',
            default: 'true',
            description: 'Opts this column out of cell spanning when set to false.',
          },
        ],
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
