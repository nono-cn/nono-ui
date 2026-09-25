import {
  createSortedRowModel,
  cellSpanningFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
} from '@tanstack/vue-table'
import type { ColumnDef, ColumnVisibilityState, RowData, TableOptions } from '@tanstack/vue-table'

export const tableFeatureSet = tableFeatures({
  cellSpanningFeature,
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
  columnVisibility?: ColumnVisibilityState
}

export interface TableSlots {
  sort?(props: { sorted: false | 'asc' | 'desc' }): unknown
}
