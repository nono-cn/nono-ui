<script setup lang="ts">
import type { ColumnVisibilityState } from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/Checkbox'

export type TableColumnVisibilityOption = {
  id: string
  label: string
  enableHiding?: boolean
}

const props = defineProps<{
  columns: TableColumnVisibilityOption[]
}>()

const columnVisibility = defineModel<ColumnVisibilityState>('columnVisibility', {
  default: () => ({}),
})

const setColumnVisibility = (id: string, visible: boolean) => {
  columnVisibility.value = { ...columnVisibility.value, [id]: visible }
}
</script>

<template>
  <fieldset class="grid gap-2">
    <legend class="text-sm font-medium">Visible columns</legend>
    <div class="flex flex-wrap gap-x-4 gap-y-2">
      <div v-for="column in props.columns" :key="column.id" class="inline-flex items-center gap-2">
        <Checkbox
          :value="columnVisibility[column.id] !== false"
          :disabled="column.enableHiding === false"
          :aria-label="`Show ${column.label} column`"
          @update:value="setColumnVisibility(column.id, $event === true)"
        />
        <span class="text-sm">{{ column.label }}</span>
      </div>
    </div>
  </fieldset>
</template>
