import type { RowData, TableOptions } from '@tanstack/vue-table'

export { default as Table } from './Table.vue'

export type TableProps<TData extends RowData> = Pick<TableOptions<TData>, 'data' | 'columns'>
