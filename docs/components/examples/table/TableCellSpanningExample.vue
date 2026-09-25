<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type City = {
  region: string
  city: string
  sales: number
}

const columns: TableColumnDef<City>[] = [
  { accessorKey: 'region', header: 'Region', spanRows: true },
  { accessorKey: 'city', header: 'City' },
  { accessorKey: 'sales', header: 'Sales' },
]

const data = ref<City[]>([
  { region: 'North', city: 'Bilbao', sales: 120 },
  { region: 'North', city: 'Santander', sales: 95 },
  { region: 'South', city: 'Seville', sales: 140 },
  { region: 'South', city: 'Málaga', sales: 110 },
])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type City = {
  region: string
  city: string
  sales: number
}

const columns: TableColumnDef<City>[] = [
  { accessorKey: 'region', header: 'Region', spanRows: true },
  { accessorKey: 'city', header: 'City' },
  { accessorKey: 'sales', header: 'Sales' },
]

const data = ref<City[]>([
  { region: 'North', city: 'Bilbao', sales: 120 },
  { region: 'North', city: 'Santander', sales: 95 },
  { region: 'South', city: 'Seville', sales: 140 },
  { region: 'South', city: 'Málaga', sales: 110 },
])
${scriptEnd}

<template>
  <Table :columns="columns" :data="data" />
</template>`
</script>

<template>
  <ComponentExample
    title="Cell spanning"
    description="Set spanRows to true to merge adjacent cells with the same value. TanStack recalculates the spans from the currently rendered rows."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full">
      <Table :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
