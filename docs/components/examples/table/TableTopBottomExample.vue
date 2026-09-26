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
  { name: 'Mary Jackson', role: 'Engineer' },
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
  { name: 'Mary Jackson', role: 'Engineer' },
]
${scriptEnd}

<template>
  <Table :columns="columns" :data="data">
    <template #top>
      <div class="font-semibold">Team members</div>
    </template>
    <template #bottom>
      <div class="text-sm text-muted-foreground">{{ data.length }} members</div>
    </template>
  </Table>
</template>`
</script>

<template>
  <ComponentExample
    title="Top and bottom slots"
    description="Add content above and below the table with separated, padded areas."
    :code="code"
    :show-reset="false"
  >
    <Table :columns="columns" :data="data">
      <template #top>
        <div class="font-semibold">Team members</div>
      </template>
      <template #bottom>
        <div class="text-sm text-muted-foreground">{{ data.length }} members</div>
      </template>
    </Table>
  </ComponentExample>
</template>
