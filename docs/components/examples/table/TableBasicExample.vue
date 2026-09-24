<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Person = {
  firstName: string
  lastName: string
  age: number
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'age', header: 'Age' },
]
const data = ref<Person[]>([
  { firstName: 'Tanner', lastName: 'Linsley', age: 24 },
  { firstName: 'Tandy', lastName: 'Miller', age: 40 },
  { firstName: 'Joe', lastName: 'Dirte', age: 45 },
])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Person = {
  firstName: string
  lastName: string
  age: number
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'age', header: 'Age' },
]
const data = ref<Person[]>([
  { firstName: 'Tanner', lastName: 'Linsley', age: 24 },
  { firstName: 'Tandy', lastName: 'Miller', age: 40 },
  { firstName: 'Joe', lastName: 'Dirte', age: 45 },
])
${scriptEnd}

<template>
  <Table :columns="columns" :data="data" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Render typed rows and columns with the core TanStack Table features."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full">
      <Table :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
