<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnFiltersState } from '@tanstack/vue-table'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Contact = {
  name: string
  region: string
  department: string
  age: number
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'region', header: 'Region', enableColumnFilter: true, filterFn: 'equalsString' },
  {
    accessorKey: 'department',
    header: 'Department',
    enableColumnFilter: true,
    filterFn: 'equalsString',
  },
  { accessorKey: 'age', header: 'Age', enableColumnFilter: true, filterFn: 'inNumberRange' },
]

const data = ref<Contact[]>([
  { name: 'Ada Lovelace', region: 'Europe', department: 'Engineering', age: 36 },
  { name: 'Grace Hopper', region: 'America', department: 'Research', age: 85 },
  { name: 'Margaret Hamilton', region: 'America', department: 'Engineering', age: 32 },
  { name: 'Linus Torvalds', region: 'Europe', department: 'Research', age: 55 },
])

const columnFilters = ref<ColumnFiltersState>([])
const options = (values: Map<unknown, number>) =>
  [...values.entries()].sort(([a], [b]) => String(a).localeCompare(String(b)))

const code = `<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnFiltersState } from '@tanstack/vue-table'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Contact = {
  name: string
  region: string
  department: string
  age: number
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'region', header: 'Region', enableColumnFilter: true, filterFn: 'equalsString' },
  {
    accessorKey: 'department',
    header: 'Department',
    enableColumnFilter: true,
    filterFn: 'equalsString',
  },
  { accessorKey: 'age', header: 'Age', enableColumnFilter: true, filterFn: 'inNumberRange' },
]

const data = ref<Contact[]>([
  { name: 'Ada Lovelace', region: 'Europe', department: 'Engineering', age: 36 },
  { name: 'Grace Hopper', region: 'America', department: 'Research', age: 85 },
  { name: 'Margaret Hamilton', region: 'America', department: 'Engineering', age: 32 },
  { name: 'Linus Torvalds', region: 'Europe', department: 'Research', age: 55 },
])

const columnFilters = ref<ColumnFiltersState>([])
const options = (values: Map<unknown, number>) =>
  [...values.entries()].sort(([a], [b]) => String(a).localeCompare(String(b)))
${scriptEnd}

<template>
  <Table v-model:column-filters="columnFilters" :columns="columns" :data="data">
    <template #filter-region="{ value, setValue, facetedUniqueValues }">
      <select
        aria-label="Filter by region"
        class="w-full rounded-md border bg-background p-2 text-sm"
        :value="value ?? ''"
        @change="setValue(($event.target as HTMLSelectElement).value || undefined)"
      >
        <option value="">All regions</option>
        <option v-for="[region, count] in options(facetedUniqueValues)" :key="String(region)" :value="String(region)">
          {{ region }} ({{ count }})
        </option>
      </select>
    </template>
    <template #filter-department="{ value, setValue, facetedUniqueValues }">
      <select
        aria-label="Filter by department"
        class="w-full rounded-md border bg-background p-2 text-sm"
        :value="value ?? ''"
        @change="setValue(($event.target as HTMLSelectElement).value || undefined)"
      >
        <option value="">All departments</option>
        <option v-for="[department, count] in options(facetedUniqueValues)" :key="String(department)" :value="String(department)">
          {{ department }} ({{ count }})
        </option>
      </select>
    </template>
    <template #filter-age="{ facetedMinMaxValues }">
      <span class="text-xs text-muted-foreground">
        Available: {{ facetedMinMaxValues?.join('–') ?? 'none' }}
      </span>
    </template>
  </Table>
</template>`
</script>

<template>
  <ComponentExample
    title="Column faceting"
    description="Choose a region or department. Each selector shows counts after the other filters, and the available age range updates with the visible choices."
    :code="code"
    @reset="columnFilters = []"
  >
    <div class="w-full">
      <Table v-model:column-filters="columnFilters" :columns="columns" :data="data">
        <template #filter-region="{ value, setValue, facetedUniqueValues }">
          <select
            aria-label="Filter by region"
            class="w-full rounded-md border bg-background p-2 text-sm"
            :value="value ?? ''"
            @change="setValue(($event.target as HTMLSelectElement).value || undefined)"
          >
            <option value="">All regions</option>
            <option
              v-for="[region, count] in options(facetedUniqueValues)"
              :key="String(region)"
              :value="String(region)"
            >
              {{ region }} ({{ count }})
            </option>
          </select>
        </template>
        <template #filter-department="{ value, setValue, facetedUniqueValues }">
          <select
            aria-label="Filter by department"
            class="w-full rounded-md border bg-background p-2 text-sm"
            :value="value ?? ''"
            @change="setValue(($event.target as HTMLSelectElement).value || undefined)"
          >
            <option value="">All departments</option>
            <option
              v-for="[department, count] in options(facetedUniqueValues)"
              :key="String(department)"
              :value="String(department)"
            >
              {{ department }} ({{ count }})
            </option>
          </select>
        </template>
        <template #filter-age="{ facetedMinMaxValues }">
          <span class="text-xs text-muted-foreground">
            Available: {{ facetedMinMaxValues?.join('–') ?? 'none' }}
          </span>
        </template>
      </Table>
    </div>
  </ComponentExample>
</template>
