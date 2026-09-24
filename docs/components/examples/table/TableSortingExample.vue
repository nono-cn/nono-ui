<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Person = {
  name: string
  age: number
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name', enableSorting: true },
  { accessorKey: 'age', header: 'Age', enableSorting: true },
]
const data = ref<Person[]>([
  { name: 'Charlie', age: 32 },
  { name: 'Ada', age: 36 },
  { name: 'Grace', age: 29 },
])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Person = {
  name: string
  age: number
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name', enableSorting: true },
  { accessorKey: 'age', header: 'Age', enableSorting: true },
]
const data = ref<Person[]>([
  { name: 'Charlie', age: 32 },
  { name: 'Ada', age: 36 },
  { name: 'Grace', age: 29 },
])
${scriptEnd}

<template>
  <Table :columns="columns" :data="data" />
</template>`
</script>

<template>
  <ComponentExample
    title="Sorting"
    description="Enable sorting per column with enableSorting: true. Activate that column header to switch between ascending and descending order; sorting state stays internal, and the sort slot customizes its indicator."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full">
      <Table :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
