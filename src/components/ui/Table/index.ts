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

export { default as Table } from './Table.vue'
export { default as TableColumnVisibility } from './TableColumnVisibility.vue'
export type { TableColumnVisibilityOption } from './TableColumnVisibility.vue'

export type TableColumnDef<TData extends RowData> = ColumnDef<typeof tableFeatureSet, TData>

export type TableProps<TData extends RowData> = {
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
