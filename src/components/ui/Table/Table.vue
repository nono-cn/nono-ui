<script setup lang="ts" generic="TData extends RowData">
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import type { RowData, TableOptions } from '@tanstack/vue-table'
import { computed, useAttrs } from 'vue'
import { tableDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    data?: TData[]
    columns?: TableOptions<TData>['columns']
  }>(),
  tableDefaults,
)

const attrs = useAttrs()
const table = useVueTable(
  computed(() => ({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  })),
)
</script>

<template>
  <div v-bind="attrs" class="w-full overflow-x-auto">
    <table class="w-full caption-bottom text-sm">
      <thead>
        <tr v-for="group in table.getHeaderGroups()" :key="group.id" class="border-b">
          <th
            v-for="header in group.headers"
            :key="header.id"
            class="h-10 px-3 text-left align-middle font-medium"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id" class="border-b">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-3 align-middle">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
