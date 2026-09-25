<script setup lang="ts" generic="TData extends RowData">
import { FlexRender, functionalUpdate, useTable } from '@tanstack/vue-table'
import type {
  Column,
  ColumnPinningState,
  Cell,
  Header,
  Row,
  RowData,
  SortingState,
} from '@tanstack/vue-table'
import { computed, ref, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import type { TableProps } from '.'
import type { TableSlots } from '.'
import { tableFeatureSet } from '.'
import { tableDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableProps<TData>>(), tableDefaults)
defineSlots<TableSlots>()

const attrs = useAttrs()
const sorting = ref<SortingState>([])
const columnPinning = ref<ColumnPinningState>({ start: [], end: [] })

const rootProps = computed(() => ({
  ...attrs,
  class: cn('w-full overflow-x-auto rounded-md border border-border', attrs.class),
}))

const tableProps = computed(() => ({
  class: cn('w-full min-w-max caption-bottom text-sm'),
}))
const trHeadProps = computed(() => ({
  class: cn('border-b'),
}))
const thProps = (header: Header<typeof tableFeatureSet, TData>) => {
  const sorted = header.column.getIsSorted()

  return {
    class: cn('h-10 px-3 text-left align-middle font-medium'),
    'aria-sort': sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined,
  }
}
const trBodyProps = computed(() => ({
  class: cn('border-b'),
}))
const getPinningOffset = (column: Column<typeof tableFeatureSet, TData, unknown>) => {
  const pinnedColumns =
    column.getIsPinned() === 'start'
      ? table.getStartVisibleLeafColumns()
      : table.getEndVisibleLeafColumns()
  const index = pinnedColumns.findIndex((pinnedColumn) => pinnedColumn.id === column.id)
  const offset = pinnedColumns
    .slice(0, index)
    .reduce((total, pinnedColumn) => total + pinnedColumn.getSize(), 0)

  return {
    position: 'sticky',
    insetInlineStart: column.getIsPinned() === 'start' ? `${offset}px` : undefined,
    insetInlineEnd: column.getIsPinned() === 'end' ? `${offset}px` : undefined,
    zIndex: 1,
    width: `${column.getSize()}px`,
    minWidth: `${column.getSize()}px`,
    maxWidth: `${column.getSize()}px`,
  }
}

const getColumnWidth = (column: Column<typeof tableFeatureSet, TData, unknown>) => ({
  width: `${column.getSize()}px`,
  minWidth: `${column.getSize()}px`,
  maxWidth: `${column.getSize()}px`,
})

const tdProps = (cell: Cell<typeof tableFeatureSet, TData, unknown>) => {
  const column = cell.column
  const pinned = Boolean(column.getIsPinned())

  return {
    class: cn('p-3 align-middle', pinned && 'sticky z-10 bg-card'),
    style: pinned ? getPinningOffset(column) : getColumnWidth(column),
    rowspan: cell.getRowSpan(),
    colspan: cell.getColSpan(),
  }
}

const pinColumn = (column: Column<typeof tableFeatureSet, TData, unknown>) => {
  column.pin(column.getIsPinned() ? false : 'start')
}

const toggleColumnSorting = (column: Column<typeof tableFeatureSet, TData, unknown>) => {
  column.toggleSorting()
}

const buttonPinProps = (column: Column<typeof tableFeatureSet, TData, unknown>) => ({
  type: 'button' as const,
  class:
    'inline-flex size-6 shrink-0 items-center justify-center rounded hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
  'aria-label': column.getIsPinned()
    ? `Unpin ${column.id} column`
    : `Pin ${column.id} column to start`,
  'aria-pressed': Boolean(column.getIsPinned()),
  onClick: (event: MouseEvent) => {
    event.stopPropagation()
    pinColumn(column)
  },
  onKeydown: (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') event.stopPropagation()
  },
})

const buttonSortProps = (column: Column<typeof tableFeatureSet, TData, unknown>) => ({
  type: 'button' as const,
  class:
    'inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
  onClick: () => toggleColumnSorting(column),
})

const getRowCells = (row: Row<typeof tableFeatureSet, TData>) => [
  ...row.getStartVisibleCells(),
  ...row.getCenterVisibleCells(),
  ...row.getEndVisibleCells(),
]

const table = useTable({
  features: tableFeatureSet,
  defaultColumn: { enableSorting: false, enablePinning: false },
  data: computed(() => props.data ?? []),
  columns: computed(() => props.columns ?? []),
  state: computed(() => ({ sorting: sorting.value, columnPinning: columnPinning.value })),
  onSortingChange: (updater) => {
    sorting.value = functionalUpdate(updater, sorting.value)
  },
  onColumnPinningChange: (updater) => {
    columnPinning.value = functionalUpdate(updater, columnPinning.value)
  },
})
</script>

<template>
  <div v-bind="rootProps">
    <table v-bind="tableProps">
      <thead>
        <tr v-for="group in table.getHeaderGroups()" :key="group.id" v-bind="trHeadProps">
          <th
            v-for="header in group.headers"
            :key="header.id"
            v-bind="thProps(header)"
            :class="header.column.getIsPinned() && 'sticky z-20 bg-card'"
            :style="
              header.column.getIsPinned()
                ? getPinningOffset(header.column)
                : getColumnWidth(header.column)
            "
          >
            <span class="inline-flex items-center gap-2">
              <button v-if="header.column.getCanPin()" v-bind="buttonPinProps(header.column)">
                <Icon :name="header.column.getIsPinned() ? 'pinOff' : 'pin'" size="sm" />
              </button>
              <button v-if="header.column.getCanSort()" v-bind="buttonSortProps(header.column)">
                <FlexRender v-if="!header.isPlaceholder" :header="header" />
                <span aria-hidden="true">
                  <slot name="sort" :sorted="header.column.getIsSorted()">
                    <Icon v-if="header.column.getIsSorted() === 'asc'" name="chevronUp" size="sm" />
                    <Icon
                      v-else-if="header.column.getIsSorted() === 'desc'"
                      name="chevronDown"
                      size="sm"
                    />
                  </slot>
                </span>
              </button>
              <div v-else class="inline-flex min-w-0 flex-1 items-center gap-2 text-left">
                <FlexRender v-if="!header.isPlaceholder" :header="header" />
              </div>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id" v-bind="trBodyProps">
          <template v-for="cell in getRowCells(row)" :key="cell.id">
            <td v-if="!cell.getIsCovered()" v-bind="tdProps(cell)">
              <FlexRender :cell="cell" />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
