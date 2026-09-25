<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Contact = {
  name: string
  email: string
  department: string
  age: number
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', enableGlobalFilter: true },
  { accessorKey: 'email', header: 'Email', enableGlobalFilter: true },
  { accessorKey: 'department', header: 'Department', enableGlobalFilter: true },
  { accessorKey: 'age', header: 'Age', enableGlobalFilter: false },
]

const data = ref<Contact[]>([
  { name: 'Ada Lovelace', email: 'ada@example.com', department: 'Engineering', age: 36 },
  { name: 'Grace Hopper', email: 'grace@example.com', department: 'Research', age: 85 },
  {
    name: 'Margaret Hamilton',
    email: 'margaret@example.com',
    department: 'Engineering',
    age: 32,
  },
])

const globalFilter = ref('')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Contact = {
  name: string
  email: string
  department: string
  age: number
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', enableGlobalFilter: true },
  { accessorKey: 'email', header: 'Email', enableGlobalFilter: true },
  { accessorKey: 'department', header: 'Department', enableGlobalFilter: true },
  { accessorKey: 'age', header: 'Age', enableGlobalFilter: false },
]

const data = ref<Contact[]>([
  { name: 'Ada Lovelace', email: 'ada@example.com', department: 'Engineering', age: 36 },
  { name: 'Grace Hopper', email: 'grace@example.com', department: 'Research', age: 85 },
  {
    name: 'Margaret Hamilton',
    email: 'margaret@example.com',
    department: 'Engineering',
    age: 32,
  },
])

const globalFilter = ref('')
${scriptEnd}

<template>
  <div class="grid gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <Input
        v-model:value="globalFilter"
        placeholder="Search contacts..."
        aria-label="Search contacts across name, email, and department"
      />
      <Button
        label="Clear search"
        variant="outline"
        :disabled="!globalFilter"
        @click="globalFilter = ''"
      />
    </div>
    <Table v-model:global-filter="globalFilter" :columns="columns" :data="data" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Global filtering"
    description="Control the table's global search from an external input with v-model:global-filter. Search name, email, and department, then clear the query to show every row again."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3">
      <div class="flex flex-wrap items-center gap-2">
        <Input
          v-model:value="globalFilter"
          placeholder="Search contacts..."
          aria-label="Search contacts across name, email, and department"
        />
        <Button
          label="Clear search"
          variant="outline"
          :disabled="!globalFilter"
          @click="globalFilter = ''"
        />
      </div>
      <Table v-model:global-filter="globalFilter" :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
