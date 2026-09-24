import type { RowData, TableFeatures, TableOptions } from '@tanstack/vue-table'
import type { ColumnDef } from '@tanstack/vue-table'

export { default as Table } from './Table.vue'

export type TableColumnDef<TData extends RowData> = ColumnDef<TableFeatures, TData>

export type TableProps<TData extends RowData> = {
  data?: TData[]
  columns?: TableColumnDef<TData>[]
}
