<script setup lang="ts">
import { ref } from 'vue'
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
  { accessorKey: 'name', header: 'Name', size: 220 },
  { accessorKey: 'email', header: 'Email', size: 340 },
  { accessorKey: 'department', header: 'Department', size: 180 },
]

const data = ref<Contact[]>([
  { name: 'Ada Lovelace', email: 'ada.lovelace@example.com', department: 'Engineering' },
  { name: 'Grace Hopper', email: 'grace.hopper@example.com', department: 'Research' },
])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Contact = {
  name: string
  email: string
  department: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', size: 220 },
  { accessorKey: 'email', header: 'Email', size: 340 },
  { accessorKey: 'department', header: 'Department', size: 180 },
]

const data = ref<Contact[]>([
  { name: 'Ada Lovelace', email: 'ada.lovelace@example.com', department: 'Engineering' },
  { name: 'Grace Hopper', email: 'grace.hopper@example.com', department: 'Research' },
])
${scriptEnd}

<template>
  <Table :columns="columns" :data="data" />
</template>`
</script>

<template>
  <ComponentExample
    title="Column sizing"
    description="Set size on each column to control its width in pixels. The table uses the combined column widths to determine whether horizontal scrolling is needed."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full min-w-0">
      <Table :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
