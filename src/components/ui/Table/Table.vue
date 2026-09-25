<script setup lang="ts" generic="TData extends RowData">
import { FlexRender, useTable } from '@tanstack/vue-table'
import type { Header, RowData } from '@tanstack/vue-table'
import { computed, useAttrs } from 'vue'
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

const rootProps = computed(() => ({
  ...attrs,
  class: cn('w-full overflow-hidden rounded-md border border-border', attrs.class),
}))

const tableProps = computed(() => ({
  class: cn('w-full caption-bottom text-sm'),
}))
const trHeadProps = computed(() => ({
  class: cn('border-b'),
}))
const thProps = (header: Header<typeof tableFeatureSet, TData>) => {
  const sorted = header.column.getIsSorted()
  const sortable = !header.isPlaceholder && header.column.getCanSort()

  return {
    class: cn(
      'h-10 px-3 text-left align-middle font-medium',
      sortable &&
        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    ),
    role: sortable ? 'button' : undefined,
    tabindex: sortable ? 0 : undefined,
    'aria-sort': sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined,
  }
}
const trBodyProps = computed(() => ({
  class: cn('border-b'),
}))
const tdProps = computed(() => ({
  class: cn('p-3 align-middle'),
}))

const table = useTable({
  features: tableFeatureSet,
  defaultColumn: { enableSorting: false },
  data: computed(() => props.data ?? []),
  columns: computed(() => props.columns ?? []),
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
            @click="header.column.getCanSort() && header.column.getToggleSortingHandler()?.($event)"
            @keydown.enter.prevent="
              header.column.getCanSort() && header.column.getToggleSortingHandler()?.($event)
            "
            @keydown.space.prevent="
              header.column.getCanSort() && header.column.getToggleSortingHandler()?.($event)
            "
          >
            <span class="inline-flex items-center gap-2">
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
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id" v-bind="trBodyProps">
          <template v-for="cell in row.getAllCells()" :key="cell.id">
            <td
              v-if="!cell.getIsCovered()"
              v-bind="tdProps"
              :rowspan="cell.getRowSpan()"
              :colspan="cell.getColSpan()"
            >
              <FlexRender :cell="cell" />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
