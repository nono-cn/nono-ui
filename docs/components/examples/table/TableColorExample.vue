<script setup lang="ts">
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Person = {
  name: string
  role: string
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
]

const data: Person[] = [
  { name: 'Ada Lovelace', role: 'Mathematician' },
  { name: 'Grace Hopper', role: 'Computer scientist' },
]

const code = `<script setup lang="ts">
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Person = {
  name: string
  role: string
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
]

const data: Person[] = [
  { name: 'Ada Lovelace', role: 'Mathematician' },
  { name: 'Grace Hopper', role: 'Computer scientist' },
]
${scriptEnd}

<template>
  <div class="grid w-full gap-4">
    <Table severity="success" :columns="columns" :data="data" />
    <Table color="#7c3aed" :columns="columns" :data="data" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Header color"
    description="Use severity for a theme color or color for a custom header color. The text uses a contrasting color."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4">
      <Table severity="success" :columns="columns" :data="data" />
      <Table color="#7c3aed" :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
