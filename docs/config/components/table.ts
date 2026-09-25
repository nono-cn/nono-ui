import type { ComponentDocConfig } from '../component-docs'
import TableBasicExample from '../../components/examples/table/TableBasicExample.vue'
import TableSortingExample from '../../components/examples/table/TableSortingExample.vue'
import TableCellSpanningExample from '../../components/examples/table/TableCellSpanningExample.vue'
import TableColumnSpanningExample from '../../components/examples/table/TableColumnSpanningExample.vue'
import TableColumnPinningExample from '../../components/examples/table/TableColumnPinningExample.vue'
import TableColumnSizingExample from '../../components/examples/table/TableColumnSizingExample.vue'
import TableColumnResizingExample from '../../components/examples/table/TableColumnResizingExample.vue'
import TableColumnVisibilityExample from '../../components/examples/table/TableColumnVisibilityExample.vue'
import TableColumnFilteringExample from '../../components/examples/table/TableColumnFilteringExample.vue'
import TableGlobalFilteringExample from '../../components/examples/table/TableGlobalFilteringExample.vue'
import TableCustomGlobalFilterExample from '../../components/examples/table/TableCustomGlobalFilterExample.vue'
import TableServerGlobalFilterExample from '../../components/examples/table/TableServerGlobalFilterExample.vue'

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
      title: 'Column filtering',
      description:
        'Enable filtering per column and provide controls through a dedicated filter row using filter-{column.id} slots.',
      component: TableColumnFilteringExample,
    },
    {
      title: 'Global filtering',
      description:
        'Bind an external search input with v-model:global-filter to filter across columns enabled with enableGlobalFilter: true.',
      component: TableGlobalFilteringExample,
    },
    {
      title: 'Custom global filter',
      description:
        'Pass a custom comparison function to globalFilterFn to search by prefix across enabled columns.',
      component: TableCustomGlobalFilterExample,
    },
    {
      title: 'Server global filtering',
      description:
        'Set manualFiltering when data comes from a filtered API response. The search value drives the request and Table renders the returned rows.',
      component: TableServerGlobalFilterExample,
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
        name: 'columnFilters',
        type: 'ColumnFiltersState',
        default: '[]',
        description:
          'Active filters by column ID and value. Use v-model:column-filters to initialize, inspect, update, or clear filters from the parent.',
      },
      {
        name: 'globalFilter',
        type: 'unknown',
        default: "''",
        description:
          'Current global search value. Use v-model:global-filter to control the search from a parent input; only columns with enableGlobalFilter: true are searched.',
      },
      {
        name: 'globalFilterFn',
        type: "'auto' | registered filter name | FilterFn<TData>",
        default: "'includesString'",
        description:
          'Selects how the global search compares values. It accepts a registered filter name or a custom TanStack filter function.',
      },
      {
        name: 'manualFiltering',
        type: 'boolean',
        default: 'false',
        description:
          'Skips client-side filtering when true. Pass rows already filtered by an API and use the globalFilter model to request updated results.',
      },
      {
        name: 'columnPinning',
        type: 'ColumnPinningState',
        default: '{ start: [], end: [] }',
        description:
          'Pinned column IDs by side. Use v-model:column-pinning to initialize or control pinning from the parent.',
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
            name: 'filterFn',
            type: "'arrHas' | 'arrIncludes' | 'arrIncludesAll' | 'arrIncludesSome' | 'between' | 'betweenInclusive' | 'empty' | 'endsWith' | 'equals' | 'equalsString' | 'equalsStringSensitive' | 'inDateRange' | 'inNumberRange' | 'includesString' | 'includesStringSensitive' | 'notEmpty' | 'startsWith' | 'weakEquals' | FilterFn",
            description:
              'Selects the comparison used by this column when filtering. It accepts any registered built-in name or a custom filter function.',
          },
          {
            name: 'enableColumnFilter',
            type: 'boolean',
            default: 'false',
            description:
              'Allows this column to be filtered. The Table component disables filtering by default; set this to true to enable its filter APIs and controls.',
          },
          {
            name: 'enableGlobalFilter',
            type: 'boolean',
            default: 'false',
            description:
              'Includes this column in global searches. The Table component excludes columns by default; set this to true on columns that should be searched.',
          },
          {
            name: 'id',
            type: 'string',
            description:
              'Explicit stable column identifier. TanStack resolves column.id from explicit id first, then accessorKey, then a string header.',
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
        name: 'header-{column.id}',
        type: '{ header, column, table }',
        description:
          'Overrides a column header’s content. Its name uses the column.id resolved by TanStack, and the default header is rendered when omitted.',
      },
      {
        name: 'cell-{column.id}',
        type: '{ cell, row, column, value }',
        description:
          'Overrides a column’s body cell content. Its name uses the column.id resolved by TanStack, and the default cell is rendered when omitted.',
      },
      {
        name: 'filter-{column.id}',
        type: '{ column, value, setValue, isFiltered }',
        description:
          'Renders a custom control in the dedicated filter row. Its name uses the column.id resolved by TanStack, and its cell remains empty when omitted.',
      },
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
