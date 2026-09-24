<script setup lang="ts" generic="TData extends RowData">
import { FlexRender, tableFeatures, useTable } from '@tanstack/vue-table'
import type { RowData } from '@tanstack/vue-table'
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { TableProps } from '.'
import { tableDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableProps<TData>>(), tableDefaults)

const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  class: cn('w-full overflow-x-auto', attrs.class),
}))

const tableProps = computed(() => ({
  class: cn('w-full caption-bottom text-sm'),
}))
const trHeadProps = computed(() => ({
  class: cn('border-b'),
}))
const thProps = computed(() => ({
  class: cn('h-10 px-3 text-left align-middle font-medium'),
}))
const trBodyProps = computed(() => ({
  class: cn('border-b'),
}))
const tdProps = computed(() => ({
  class: cn('p-3 align-middle'),
}))

const table = useTable(
  computed(() => ({
    features: tableFeatures({}),
    data: props.data,
    columns: props.columns,
  })),
)
</script>

<template>
  <div v-bind="rootProps">
    <table v-bind="tableProps">
      <thead>
        <tr v-for="group in table.getHeaderGroups()" :key="group.id" v-bind="trHeadProps">
          <th v-for="header in group.headers" :key="header.id" v-bind="thProps">
            <FlexRender v-if="!header.isPlaceholder" :header="header" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id" v-bind="trBodyProps">
          <td v-for="cell in row.getAllCells()" :key="cell.id" v-bind="tdProps">
            <FlexRender :cell="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
