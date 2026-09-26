<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Person = {
  name: string
  role: string
  city: string
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'city', header: 'City' },
]

const data = ref<Person[]>([
  { name: 'Ada Lovelace', role: 'Mathematician', city: 'London' },
  { name: 'Grace Hopper', role: 'Computer scientist', city: 'New York' },
  { name: 'Katherine Johnson', role: 'Mathematician', city: 'White Sulphur Springs' },
  { name: 'Dorothy Vaughan', role: 'Mathematician', city: 'Kansas City' },
  { name: 'Mary Jackson', role: 'Engineer', city: 'Hampton' },
  { name: 'Annie Easley', role: 'Computer scientist', city: 'Birmingham' },
  { name: 'Evelyn Boyd Granville', role: 'Mathematician', city: 'Washington, D.C.' },
  { name: 'Radia Perlman', role: 'Computer scientist', city: 'Portsmouth' },
  { name: 'Margaret Hamilton', role: 'Computer scientist', city: 'Paoli' },
  { name: 'Frances Allen', role: 'Computer scientist', city: 'Peru' },
])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Person = {
  name: string
  role: string
  city: string
}

const columns: TableColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'city', header: 'City' },
]

const data = ref<Person[]>([
  { name: 'Ada Lovelace', role: 'Mathematician', city: 'London' },
  { name: 'Grace Hopper', role: 'Computer scientist', city: 'New York' },
  { name: 'Katherine Johnson', role: 'Mathematician', city: 'White Sulphur Springs' },
  { name: 'Dorothy Vaughan', role: 'Mathematician', city: 'Kansas City' },
  { name: 'Mary Jackson', role: 'Engineer', city: 'Hampton' },
  { name: 'Annie Easley', role: 'Computer scientist', city: 'Birmingham' },
  { name: 'Evelyn Boyd Granville', role: 'Mathematician', city: 'Washington, D.C.' },
  { name: 'Radia Perlman', role: 'Computer scientist', city: 'Portsmouth' },
  { name: 'Margaret Hamilton', role: 'Computer scientist', city: 'Paoli' },
  { name: 'Frances Allen', role: 'Computer scientist', city: 'Peru' },
])
${scriptEnd}

<template>
  <Table sticky class="max-h-64 overflow-auto" :columns="columns" :data="data" />
</template>`
</script>

<template>
  <ComponentExample
    title="Sticky header"
    description="Set sticky to keep the table header visible while scrolling inside a container with a bounded height."
    :code="code"
    :show-reset="false"
  >
    <Table sticky class="max-h-64 overflow-auto" :columns="columns" :data="data" />
  </ComponentExample>
</template>
