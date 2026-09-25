<script setup lang="ts" generic="TData extends RowData">
import { FlexRender, functionalUpdate, useTable } from '@tanstack/vue-table'
import type {
  Column,
  ColumnFiltersState,
  ColumnPinningState,
  ColumnVisibilityState,
  Cell,
  Header,
  Row,
  RowData,
  SortingState,
} from '@tanstack/vue-table'
import { computed, ref, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { useI18n } from '@/i18n'
import type { TableProps } from '.'
import type { TableSlots } from '.'
import { tableFeatureSet } from '.'
import { tableDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableProps<TData>>(), tableDefaults)
defineSlots<TableSlots<TData>>()

const attrs = useAttrs()
const { t } = useI18n()
const sorting = ref<SortingState>([])
const columnFilters = defineModel<ColumnFiltersState>('columnFilters', {
  default: () => [],
})
const globalFilter = defineModel<unknown>('globalFilter', {
  default: '',
})
const columnPinning = defineModel<ColumnPinningState>('columnPinning', {
  default: () => ({ start: [], end: [] }),
})
const columnVisibility = defineModel<ColumnVisibilityState>('columnVisibility', {
  default: () => ({}),
})

const rootProps = computed(() => ({
  ...attrs,
  class: cn('w-full min-w-0 overflow-x-auto rounded-md border border-border', attrs.class),
}))

const tableProps = computed(() => ({
  class: cn('w-max min-w-full table-fixed caption-bottom text-sm'),
  style: { width: `${table.getTotalSize()}px` },
}))
const trHeadProps = computed(() => ({
  class: cn('border-b'),
}))
const thProps = (header: Header<typeof tableFeatureSet, TData>) => {
  const sorted = header.column.getIsSorted()
  const pinned = Boolean(header.column.getIsPinned())

  return {
    class: cn(
      'h-10 px-3 text-left align-middle font-medium relative',
      pinned && 'sticky z-20 bg-card',
    ),
    style: pinned ? getPinningOffset(header.column) : getColumnWidth(header.column),
    'aria-sort': sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined,
  }
}
const filterThProps = (header: Header<typeof tableFeatureSet, TData>) => {
  const pinned = Boolean(header.column.getIsPinned())

  return {
    class: cn('px-3 py-2 text-left align-middle font-normal', pinned && 'sticky z-20 bg-card'),
    style: pinned ? getPinningOffset(header.column) : getColumnWidth(header.column),
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

const resizeColumnByKeyboard = (
  column: Column<typeof tableFeatureSet, TData, unknown>,
  direction: -1 | 1,
) => {
  const minSize = column.columnDef.minSize ?? 20
  const maxSize = column.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER
  const size = Math.min(maxSize, Math.max(minSize, column.getSize() + direction * 10))

  table.setColumnSizing((old) => ({ ...old, [column.id]: size }))
}

const resizeHandleProps = (header: Header<typeof tableFeatureSet, TData>) => ({
  role: 'separator',
  tabindex: 0,
  'aria-orientation': 'vertical',
  'aria-label': `Resize ${header.column.id} column`,
  'aria-valuenow': header.getSize(),
  'aria-valuemin': header.column.columnDef.minSize ?? 20,
  'aria-valuemax': header.column.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER,
  class:
    'absolute inset-y-0 right-0 z-30 w-1 cursor-col-resize touch-none select-none bg-transparent hover:bg-primary/50 focus-visible:bg-primary focus-visible:outline-none',
  onMousedown: (event: MouseEvent) => {
    event.stopPropagation()
    header.getResizeHandler()?.(event)
  },
  onTouchstart: (event: TouchEvent) => {
    event.stopPropagation()
    header.getResizeHandler()?.(event)
  },
  onClick: (event: MouseEvent) => event.stopPropagation(),
  onKeydown: (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      event.stopPropagation()
      resizeColumnByKeyboard(header.column, event.key === 'ArrowRight' ? 1 : -1)
    }
  },
})

const pinColumn = (column: Column<typeof tableFeatureSet, TData, unknown>) => {
  column.pin(column.getIsPinned() ? false : 'start')
}

const toggleColumnSorting = (column: Column<typeof tableFeatureSet, TData, unknown>) => {
  column.toggleSorting()
}

const buttonPinProps = (header: Header<typeof tableFeatureSet, TData>) => ({
  type: 'button' as const,
  class:
    'inline-flex size-6 shrink-0 items-center justify-center rounded hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
  'aria-labelledby': `${header.id}-pin-action ${header.id}-header-label`,
  'aria-pressed': Boolean(header.column.getIsPinned()),
  onClick: (event: MouseEvent) => {
    event.stopPropagation()
    pinColumn(header.column)
  },
  onKeydown: (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') event.stopPropagation()
  },
})

const pinActionLabel = (column: Column<typeof tableFeatureSet, TData, unknown>) =>
  column.getIsPinned() ? t('tableUnpinColumn') : t('tablePinColumn')

const buttonSortProps = (column: Column<typeof tableFeatureSet, TData, unknown>) => ({
  type: 'button' as const,
  class:
    'inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
  onClick: () => toggleColumnSorting(column),
})

const filterSlotProps = (column: Column<typeof tableFeatureSet, TData, unknown>) => ({
  column,
  value: column.getFilterValue(),
  setValue: (value: Parameters<typeof column.setFilterValue>[0]) => column.setFilterValue(value),
  isFiltered: column.getIsFiltered(),
  facetedUniqueValues: column.getFacetedUniqueValues(),
  facetedMinMaxValues: column.getFacetedMinMaxValues(),
})

const getColumnSlotName = (
  slot: 'header' | 'cell' | 'filter',
  column: Column<typeof tableFeatureSet, TData, unknown>,
) => `${slot}-${column.id}` as const

const getRowCells = (row: Row<typeof tableFeatureSet, TData>) => [
  ...row.getStartVisibleCells(),
  ...row.getCenterVisibleCells(),
  ...row.getEndVisibleCells(),
]

const table = useTable({
  features: tableFeatureSet,
  defaultColumn: {
    enableSorting: false,
    enablePinning: false,
    enableResizing: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
  },
  data: computed(() => props.data ?? []),
  columns: computed(() => props.columns ?? []),
  state: computed(() => ({
    sorting: sorting.value,
    columnFilters: columnFilters.value,
    globalFilter: globalFilter.value,
    columnPinning: columnPinning.value,
    columnVisibility: columnVisibility.value,
  })),
  onSortingChange: (updater) => {
    sorting.value = functionalUpdate(updater, sorting.value)
  },
  onColumnFiltersChange: (updater) => {
    columnFilters.value = functionalUpdate(updater, columnFilters.value)
  },
  onGlobalFilterChange: (updater) => {
    globalFilter.value = functionalUpdate(updater, globalFilter.value)
  },
  globalFilterFn: props.globalFilterFn ?? 'includesString',
  manualFiltering: props.manualFiltering ?? false,
  onColumnPinningChange: (updater) => {
    columnPinning.value = functionalUpdate(updater, columnPinning.value)
  },
  onColumnVisibilityChange: (updater) => {
    columnVisibility.value = functionalUpdate(updater, columnVisibility.value)
  },
})
</script>

<template>
  <div v-bind="rootProps">
    <table v-bind="tableProps">
      <thead>
        <template v-for="(group, groupIndex) in table.getHeaderGroups()" :key="group.id">
          <tr v-bind="trHeadProps">
            <th v-for="header in group.headers" :key="header.id" v-bind="thProps(header)">
              <span class="inline-flex items-center gap-2">
                <button v-if="header.column.getCanPin()" v-bind="buttonPinProps(header)">
                  <Icon :name="header.column.getIsPinned() ? 'pinOff' : 'pin'" size="sm" />
                  <span :id="`${header.id}-pin-action`" class="sr-only">
                    {{ pinActionLabel(header.column) }}
                  </span>
                </button>
                <button v-if="header.column.getCanSort()" v-bind="buttonSortProps(header.column)">
                  <span :id="`${header.id}-header-label`">
                    <slot
                      :name="getColumnSlotName('header', header.column)"
                      :header="header"
                      :column="header.column"
                      :table="table"
                    >
                      <FlexRender v-if="!header.isPlaceholder" :header="header" />
                    </slot>
                  </span>
                  <span aria-hidden="true">
                    <slot name="sort" :sorted="header.column.getIsSorted()">
                      <Icon
                        v-if="header.column.getIsSorted() === 'asc'"
                        name="chevronUp"
                        size="sm"
                      />
                      <Icon
                        v-else-if="header.column.getIsSorted() === 'desc'"
                        name="chevronDown"
                        size="sm"
                      />
                    </slot>
                  </span>
                </button>
                <div v-else class="inline-flex min-w-0 flex-1 items-center gap-2 text-left">
                  <span :id="`${header.id}-header-label`">
                    <slot
                      :name="getColumnSlotName('header', header.column)"
                      :header="header"
                      :column="header.column"
                      :table="table"
                    >
                      <FlexRender v-if="!header.isPlaceholder" :header="header" />
                    </slot>
                  </span>
                </div>
              </span>
              <div
                v-if="header.column.getCanResize() && !header.isPlaceholder"
                v-bind="resizeHandleProps(header)"
              />
            </th>
          </tr>
          <tr
            v-if="
              groupIndex === table.getHeaderGroups().length - 1 &&
              group.headers.some((header) => header.column.getCanFilter())
            "
            v-bind="trHeadProps"
          >
            <th
              v-for="header in group.headers"
              :key="`filter-${header.id}`"
              v-bind="filterThProps(header)"
            >
              <slot
                v-if="header.column.getCanFilter() && !header.isPlaceholder"
                :name="getColumnSlotName('filter', header.column)"
                v-bind="filterSlotProps(header.column)"
              />
            </th>
          </tr>
        </template>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id" v-bind="trBodyProps">
          <template v-for="cell in getRowCells(row)" :key="cell.id">
            <td v-if="!cell.getIsCovered()" v-bind="tdProps(cell)">
              <slot
                :name="getColumnSlotName('cell', cell.column)"
                :cell="cell"
                :row="row"
                :column="cell.column"
                :value="cell.getValue()"
              >
                <FlexRender :cell="cell" />
              </slot>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
