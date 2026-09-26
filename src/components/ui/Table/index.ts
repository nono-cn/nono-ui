import {
  createSortedRowModel,
  createFilteredRowModel,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFacetedMinMaxValues,
  cellSpanningFeature,
  columnFacetingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  filterFn_arrHas,
  filterFn_arrIncludes,
  filterFn_arrIncludesAll,
  filterFn_arrIncludesSome,
  filterFn_between,
  filterFn_betweenInclusive,
  filterFn_empty,
  filterFn_endsWith,
  filterFn_equals,
  filterFn_equalsString,
  filterFn_equalsStringSensitive,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  filterFn_includesString,
  filterFn_includesStringSensitive,
  filterFn_notEmpty,
  filterFn_startsWith,
  filterFn_weakEquals,
  sortFns,
  tableFeatures,
} from '@tanstack/vue-table'
import { cva, type VariantProps } from 'class-variance-authority'
import type {
  Cell,
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFnOption,
  ColumnPinningState,
  ColumnVisibilityState,
  Header,
  RowData,
  Row,
  Table as TanStackTable,
  TableOptions,
} from '@tanstack/vue-table'

export const tableFeatureSet = tableFeatures({
  cellSpanningFeature,
  columnFacetingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  filterFns: {
    arrHas: filterFn_arrHas,
    arrIncludes: filterFn_arrIncludes,
    arrIncludesAll: filterFn_arrIncludesAll,
    arrIncludesSome: filterFn_arrIncludesSome,
    between: filterFn_between,
    betweenInclusive: filterFn_betweenInclusive,
    empty: filterFn_empty,
    endsWith: filterFn_endsWith,
    equals: filterFn_equals,
    equalsString: filterFn_equalsString,
    equalsStringSensitive: filterFn_equalsStringSensitive,
    inDateRange: filterFn_inDateRange,
    inNumberRange: filterFn_inNumberRange,
    includesString: filterFn_includesString,
    includesStringSensitive: filterFn_includesStringSensitive,
    notEmpty: filterFn_notEmpty,
    startsWith: filterFn_startsWith,
    weakEquals: filterFn_weakEquals,
  },
  columnSizingFeature,
  columnResizingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
})

export type TableFeatures = typeof tableFeatureSet

export const tableVariants = {
  root: cva('w-full min-w-0 rounded-md border border-border', {
    variants: {
      sticky: {
        true: 'max-h-64 overflow-auto',
        false: 'overflow-x-auto',
      },
    },
    defaultVariants: { sticky: false },
  }),
  table: cva('w-max min-w-full table-fixed caption-bottom text-sm'),
  top: cva('border-b border-border px-3 py-2'),
  bottom: cva('border-t border-border px-3 py-2'),
  trHead: cva('border-b'),
  trBody: cva('border-b'),
  th: cva('h-10 px-3 text-left align-middle font-bold relative bg-card', {
    variants: {
      sticky: {
        true: 'sticky top-0 z-20',
        false: '',
      },
      pinned: {
        true: 'sticky z-20',
        false: '',
      },
      severity: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        warning: 'bg-warning text-warning-foreground',
        success: 'bg-success text-success-foreground',
        error: 'bg-error text-error-foreground',
      },
      color: {
        true: 'bg-(--table-color) text-(--table-color-foreground)',
        false: '',
      },
    },
    defaultVariants: { sticky: false, pinned: false, severity: 'secondary', color: false },
  }),
  filterTh: cva('px-3 py-2 text-left align-middle font-normal bg-card', {
    variants: {
      sticky: {
        true: 'sticky top-10 z-20',
        false: '',
      },
      pinned: {
        true: 'sticky z-20',
        false: '',
      },
    },
    defaultVariants: { sticky: false, pinned: false },
  }),
  td: cva('p-3 align-middle', {
    variants: {
      pinned: {
        true: 'sticky z-10 bg-card',
        false: '',
      },
    },
    defaultVariants: { pinned: false },
  }),
  resize: cva(
    'absolute inset-y-0 right-0 z-30 w-1 cursor-col-resize touch-none select-none bg-transparent hover:bg-primary/50 focus-visible:bg-primary focus-visible:outline-none',
  ),
  pin: cva(
    'inline-flex size-6 shrink-0 items-center justify-center rounded hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
  ),
  sort: cva(
    'inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
  ),
}

export { default as Table } from './Table.vue'
export { default as TableColumnVisibility } from './TableColumnVisibility.vue'
export type { TableColumnVisibilityOption } from './TableColumnVisibility.vue'

export type TableColumnDef<TData extends RowData> = ColumnDef<typeof tableFeatureSet, TData>
export type TableSeverity = NonNullable<VariantProps<typeof tableVariants.th>['severity']>

export type TableProps<TData extends RowData> = {
  sticky?: boolean
  severity?: TableSeverity
  color?: string
  data?: TData[]
  columns?: TableOptions<typeof tableFeatureSet, TData>['columns']
  columnFilters?: ColumnFiltersState
  globalFilter?: unknown
  globalFilterFn?: FilterFnOption<typeof tableFeatureSet, TData>
  manualFiltering?: boolean
  columnPinning?: ColumnPinningState
  columnVisibility?: ColumnVisibilityState
}

export interface TableSlots<TData extends RowData> {
  top?(): unknown
  bottom?(): unknown
  sort?(props: { sorted: false | 'asc' | 'desc' }): unknown
  [name: `header-${string}`]:
    | ((props: {
        header: Header<typeof tableFeatureSet, TData>
        column: Column<typeof tableFeatureSet, TData, unknown>
        table: TanStackTable<typeof tableFeatureSet, TData>
      }) => unknown)
    | undefined
  [name: `cell-${string}`]:
    | ((props: {
        cell: Cell<typeof tableFeatureSet, TData, unknown>
        row: Row<typeof tableFeatureSet, TData>
        column: Column<typeof tableFeatureSet, TData, unknown>
        value: unknown
      }) => unknown)
    | undefined
  [name: `filter-${string}`]:
    | ((props: {
        column: Column<typeof tableFeatureSet, TData, unknown>
        value: unknown
        setValue: Column<typeof tableFeatureSet, TData, unknown>['setFilterValue']
        isFiltered: boolean
        facetedUniqueValues: Map<unknown, number>
        facetedMinMaxValues: [number, number] | undefined
      }) => unknown)
    | undefined
}
