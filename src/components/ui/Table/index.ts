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
import type {
  Cell,
  Column,
  ColumnDef,
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
}
