<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type ReportRow = {
  label: string
  amount: string
  isSummary?: boolean
}

const columns: TableColumnDef<ReportRow>[] = [
  {
    accessorKey: 'label',
    header: 'Item',
    spanColumns: ({ row }) => (row.original.isSummary ? Infinity : 1),
  },
  { accessorKey: 'amount', header: 'Amount' },
]

const data = ref<ReportRow[]>([
  { label: 'Products', amount: '€ 1,240' },
  { label: 'Services', amount: '€ 860' },
  { label: 'Total revenue', amount: '', isSummary: true },
])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type ReportRow = {
  label: string
  amount: string
  isSummary?: boolean
}

const columns: TableColumnDef<ReportRow>[] = [
  {
    accessorKey: 'label',
    header: 'Item',
    spanColumns: ({ row }) => (row.original.isSummary ? Infinity : 1),
  },
  { accessorKey: 'amount', header: 'Amount' },
]

const data = ref<ReportRow[]>([
  { label: 'Products', amount: '€ 1,240' },
  { label: 'Services', amount: '€ 860' },
  { label: 'Total revenue', amount: '', isSummary: true },
])
${scriptEnd}

<template>
  <Table :columns="columns" :data="data" />
</template>`
</script>

<template>
  <ComponentExample
    title="Column spanning"
    description="Use spanColumns to merge cells horizontally. Infinity extends the summary cell through the remaining columns in its pinned region."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full">
      <Table :columns="columns" :data="data" />
    </div>
  </ComponentExample>
</template>
