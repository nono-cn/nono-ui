<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnVisibilityState } from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/Checkbox'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Contact = {
  name: string
  email: string
  department: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'department', header: 'Department', enableHiding: false },
]

const visibilityOptions = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'department', label: 'Department', enableHiding: false },
]

const columnVisibility = ref<ColumnVisibilityState>({})
const setColumnVisibility = (id: string, visible: boolean) => {
  columnVisibility.value = { ...columnVisibility.value, [id]: visible }
}
const data = ref<Contact[]>([
  { name: 'Ada Lovelace', email: 'ada.lovelace@example.com', department: 'Engineering' },
  { name: 'Grace Hopper', email: 'grace.hopper@example.com', department: 'Research' },
])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnVisibilityState } from '@tanstack/vue-table'
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Contact = {
  name: string
  email: string
  department: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'department', header: 'Department', enableHiding: false },
]

const visibilityOptions = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'department', label: 'Department', enableHiding: false },
]

const columnVisibility = ref<ColumnVisibilityState>({})
const setColumnVisibility = (id: string, visible: boolean) => {
  columnVisibility.value = { ...columnVisibility.value, [id]: visible }
}
const data = ref<Contact[]>([
  { name: 'Ada Lovelace', email: 'ada.lovelace@example.com', department: 'Engineering' },
  { name: 'Grace Hopper', email: 'grace.hopper@example.com', department: 'Research' },
])
${scriptEnd}

<template>
  <div class="grid w-full min-w-0 gap-4">
    <div role="group" aria-label="Visible columns" class="flex flex-wrap gap-x-4 gap-y-2">
      <div v-for="column in visibilityOptions" :key="column.id" class="inline-flex items-center gap-2">
        <Checkbox
          :value="columnVisibility[column.id] !== false"
          :disabled="column.enableHiding === false"
          :aria-label="column.label"
          @update:value="setColumnVisibility(column.id, $event === true)"
        />
        <span class="text-sm">{{ column.label }}</span>
      </div>
    </div>
    <Table v-model:column-visibility="columnVisibility" :columns="columns" :data="data" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Column visibility"
    description="Control column visibility outside the table with a shared v-model. Columns with enableHiding: false stay visible."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full min-w-0 gap-4">
      <div role="group" aria-label="Visible columns" class="flex flex-wrap gap-x-4 gap-y-2">
        <div
          v-for="column in visibilityOptions"
          :key="column.id"
          class="inline-flex items-center gap-2"
        >
          <Checkbox
            :value="columnVisibility[column.id] !== false"
            :disabled="column.enableHiding === false"
            :aria-label="column.label"
            @update:value="setColumnVisibility(column.id, $event === true)"
          />
          <span class="text-sm">{{ column.label }}</span>
        </div>
      </div>
      <Table v-model:column-visibility="columnVisibility" :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
