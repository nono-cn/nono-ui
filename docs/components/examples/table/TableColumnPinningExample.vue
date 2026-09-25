<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnPinningState } from '@tanstack/vue-table'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Contact = {
  name: string
  company: string
  email: string
  city: string
  status: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', enablePinning: true },
  { accessorKey: 'company', header: 'Company' },
  { accessorKey: 'email', header: 'Email', enablePinning: true },
  { accessorKey: 'city', header: 'City' },
  { accessorKey: 'status', header: 'Status' },
]

const data = ref<Contact[]>([
  {
    name: 'Ada Lovelace',
    company: 'Analytical Engines',
    email: 'ada@example.com',
    city: 'London',
    status: 'Active',
  },
  {
    name: 'Grace Hopper',
    company: 'Navy Research',
    email: 'grace@example.com',
    city: 'Arlington',
    status: 'Active',
  },
])

const columnPinning = ref<ColumnPinningState>({ start: ['name'], end: [] })

const code = `<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnPinningState } from '@tanstack/vue-table'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Contact = {
  name: string
  company: string
  email: string
  city: string
  status: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', enablePinning: true },
  { accessorKey: 'company', header: 'Company' },
  { accessorKey: 'email', header: 'Email', enablePinning: true },
  { accessorKey: 'city', header: 'City' },
  { accessorKey: 'status', header: 'Status' },
]

const data = ref<Contact[]>([
  {
    name: 'Ada Lovelace',
    company: 'Analytical Engines',
    email: 'ada@example.com',
    city: 'London',
    status: 'Active',
  },
  {
    name: 'Grace Hopper',
    company: 'Navy Research',
    email: 'grace@example.com',
    city: 'Arlington',
    status: 'Active',
  },
])

const columnPinning = ref<ColumnPinningState>({ start: ['name'], end: [] })
${scriptEnd}

<template>
  <Table v-model:column-pinning="columnPinning" :columns="columns" :data="data" />
</template>`
</script>

<template>
  <ComponentExample
    title="Column pinning"
    description="Initialize pinning from the parent with v-model:column-pinning. The Name column starts pinned, and the header buttons can pin or unpin eligible columns."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full">
      <Table v-model:column-pinning="columnPinning" :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
