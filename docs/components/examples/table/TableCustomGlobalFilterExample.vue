<script setup lang="ts">
import { ref } from 'vue'
import type { FilterFn } from '@tanstack/vue-table'
import { Input } from '@/components/ui/Input'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef, TableFeatures } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Contact = {
  name: string
  department: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', enableGlobalFilter: true },
  { accessorKey: 'department', header: 'Department', enableGlobalFilter: true },
]

const data = ref<Contact[]>([
  { name: 'Ada Lovelace', department: 'Engineering' },
  { name: 'Grace Hopper', department: 'Research' },
  { name: 'Margaret Hamilton', department: 'Engineering' },
])

const startsWithFilter: FilterFn<TableFeatures, Contact> = (row, columnId, value) =>
  String(row.getValue(columnId) ?? '')
    .toLowerCase()
    .startsWith(String(value).toLowerCase())

const globalFilter = ref('')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import type { FilterFn } from '@tanstack/vue-table'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef, TableFeatures } from '__DOCS_PACKAGE__/components/ui/Table'

type Contact = {
  name: string
  department: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', enableGlobalFilter: true },
  { accessorKey: 'department', header: 'Department', enableGlobalFilter: true },
]

const data = ref<Contact[]>([
  { name: 'Ada Lovelace', department: 'Engineering' },
  { name: 'Grace Hopper', department: 'Research' },
  { name: 'Margaret Hamilton', department: 'Engineering' },
])

const startsWithFilter: FilterFn<TableFeatures, Contact> = (row, columnId, value) =>
  String(row.getValue(columnId) ?? '')
    .toLowerCase()
    .startsWith(String(value).toLowerCase())

const globalFilter = ref('')
${scriptEnd}

<template>
  <div class="grid gap-3">
    <Input
      v-model:value="globalFilter"
      placeholder="Search by prefix..."
      aria-label="Search name or department by prefix"
    />
    <Table
      v-model:global-filter="globalFilter"
      :global-filter-fn="startsWithFilter"
      :columns="columns"
      :data="data"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom global filter"
    description="Pass a function to globalFilterFn to match the start of a name or department, ignoring letter case. For example, 'eng' matches Engineering, while 'neer' does not."
    :code="code"
    @reset="globalFilter = ''"
  >
    <template #controls>
      <Input
        v-model:value="globalFilter"
        placeholder="Search by prefix..."
        aria-label="Search name or department by prefix"
      />
    </template>
    <div class="w-full">
      <Table
        v-model:global-filter="globalFilter"
        :global-filter-fn="startsWithFilter"
        :columns="columns"
        :data="data"
      />
    </div>
  </ComponentExample>
</template>
