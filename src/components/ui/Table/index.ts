import {
  createSortedRowModel,
  cellSpanningFeature,
  columnSizingFeature,
  columnPinningFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
} from '@tanstack/vue-table'
import type { ColumnDef, RowData, TableOptions } from '@tanstack/vue-table'

export const tableFeatureSet = tableFeatures({
  cellSpanningFeature,
  columnSizingFeature,
  columnPinningFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
})

export type TableFeatures = typeof tableFeatureSet

export { default as Table } from './Table.vue'

export type TableColumnDef<TData extends RowData> = ColumnDef<typeof tableFeatureSet, TData>

export type TableProps<TData extends RowData> = {
  data?: TData[]
  columns?: TableOptions<typeof tableFeatureSet, TData>['columns']
}

export interface TableSlots {
  sort?(props: { sorted: false | 'asc' | 'desc' }): unknown
}
