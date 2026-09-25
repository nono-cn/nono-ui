<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnFiltersState } from '@tanstack/vue-table'
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
  {
    accessorKey: 'name',
    header: 'Name',
    enableColumnFilter: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableColumnFilter: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'department',
    header: 'Department',
    enableColumnFilter: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'age',
    header: 'Age',
    enableColumnFilter: true,
    filterFn: 'inNumberRange',
  },
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

const columnFilters = ref<ColumnFiltersState>([])
const clearFilters = () => {
  columnFilters.value = []
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnFiltersState } from '@tanstack/vue-table'
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
  {
    accessorKey: 'name',
    header: 'Name',
    enableColumnFilter: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableColumnFilter: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'department',
    header: 'Department',
    enableColumnFilter: true,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'age',
    header: 'Age',
    enableColumnFilter: true,
    filterFn: 'inNumberRange',
  },
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

const columnFilters = ref<ColumnFiltersState>([])
const clearFilters = () => {
  columnFilters.value = []
}
${scriptEnd}

<template>
  <div class="grid gap-3">
    <Button
      label="Clear filters"
      variant="outline"
      :disabled="columnFilters.length === 0"
      @click="clearFilters"
    />
    <Table v-model:column-filters="columnFilters" :columns="columns" :data="data">
      <template #filter-name="{ value, setValue, isFiltered }">
        <Input
          :value="String(value ?? '')"
          size="sm"
          placeholder="Filter by name"
          aria-label="Filter by name"
          :highlight="isFiltered"
          @update:value="setValue"
        />
      </template>
      <template #filter-email="{ value, setValue, isFiltered }">
        <Input
          :value="String(value ?? '')"
          size="sm"
          placeholder="Filter by email"
          aria-label="Filter by email"
          :highlight="isFiltered"
          @update:value="setValue"
        />
      </template>
      <template #filter-department="{ value, setValue, isFiltered }">
        <Input
          :value="String(value ?? '')"
          size="sm"
          placeholder="Filter by department"
          aria-label="Filter by department"
          :highlight="isFiltered"
          @update:value="setValue"
        />
      </template>
      <template #filter-age="{ value, setValue, isFiltered }">
        <div class="grid grid-cols-2 gap-1">
          <Input
            type="number"
            :value="Array.isArray(value) ? String(value[0] ?? '') : ''"
            size="sm"
            placeholder="Min"
            aria-label="Minimum age"
            :highlight="isFiltered"
            @update:value="setValue([$event, Array.isArray(value) ? value[1] : ''])"
          />
          <Input
            type="number"
            :value="Array.isArray(value) ? String(value[1] ?? '') : ''"
            size="sm"
            placeholder="Max"
            aria-label="Maximum age"
            :highlight="isFiltered"
            @update:value="setValue([Array.isArray(value) ? value[0] : '', $event])"
          />
        </div>
      </template>
    </Table>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Column filtering"
    description="Control filters with v-model:column-filters, use text filters for strings and an inNumberRange filter for age, and clear everything from an external button."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3">
      <Button
        label="Clear filters"
        variant="outline"
        :disabled="columnFilters.length === 0"
        @click="clearFilters"
      />
      <Table v-model:column-filters="columnFilters" :columns="columns" :data="data">
        <template #filter-name="{ value, setValue, isFiltered }">
          <Input
            :value="String(value ?? '')"
            size="sm"
            placeholder="Filter by name"
            aria-label="Filter by name"
            :highlight="isFiltered"
            @update:value="setValue"
          />
        </template>
        <template #filter-email="{ value, setValue, isFiltered }">
          <Input
            :value="String(value ?? '')"
            size="sm"
            placeholder="Filter by email"
            aria-label="Filter by email"
            :highlight="isFiltered"
            @update:value="setValue"
          />
        </template>
        <template #filter-department="{ value, setValue, isFiltered }">
          <Input
            :value="String(value ?? '')"
            size="sm"
            placeholder="Filter by department"
            aria-label="Filter by department"
            :highlight="isFiltered"
            @update:value="setValue"
          />
        </template>
        <template #filter-age="{ value, setValue, isFiltered }">
          <div class="grid grid-cols-2 gap-1">
            <Input
              type="number"
              :value="Array.isArray(value) ? String(value[0] ?? '') : ''"
              size="sm"
              placeholder="Min"
              aria-label="Minimum age"
              :highlight="isFiltered"
              @update:value="setValue([$event, Array.isArray(value) ? value[1] : ''])"
            />
            <Input
              type="number"
              :value="Array.isArray(value) ? String(value[1] ?? '') : ''"
              size="sm"
              placeholder="Max"
              aria-label="Maximum age"
              :highlight="isFiltered"
              @update:value="setValue([Array.isArray(value) ? value[0] : '', $event])"
            />
          </div>
        </template>
      </Table>
    </div>
  </ComponentExample>
</template>
