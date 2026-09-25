<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/Input'
import { Table } from '@/components/ui/Table'
import type { TableColumnDef } from '@/components/ui/Table'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type Contact = {
  name: string
  email: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', enableGlobalFilter: true },
  { accessorKey: 'email', header: 'Email', enableGlobalFilter: true },
]

const contacts: Contact[] = [
  { name: 'Ada Lovelace', email: 'ada@example.com' },
  { name: 'Grace Hopper', email: 'grace@example.com' },
  { name: 'Margaret Hamilton', email: 'margaret@example.com' },
]

// Replace this function with a request to your API.
async function fetchContacts(query: string): Promise<Contact[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const term = query.trim().toLowerCase()
  return contacts.filter((contact) =>
    [contact.name, contact.email].some((value) => value.toLowerCase().includes(term)),
  )
}

const globalFilter = ref('')
const rows = ref<Contact[]>([])
const loading = ref(false)

watch(
  globalFilter,
  async (query, _previous, onCleanup) => {
    let stale = false
    onCleanup(() => {
      stale = true
    })
    loading.value = true
    const result = await fetchContacts(query)
    if (stale) return
    rows.value = result
    loading.value = false
  },
  { immediate: true },
)

const code = `<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Table } from '__DOCS_PACKAGE__/components/ui/Table'
import type { TableColumnDef } from '__DOCS_PACKAGE__/components/ui/Table'

type Contact = {
  name: string
  email: string
}

const columns: TableColumnDef<Contact>[] = [
  { accessorKey: 'name', header: 'Name', enableGlobalFilter: true },
  { accessorKey: 'email', header: 'Email', enableGlobalFilter: true },
]

const contacts: Contact[] = [
  { name: 'Ada Lovelace', email: 'ada@example.com' },
  { name: 'Grace Hopper', email: 'grace@example.com' },
  { name: 'Margaret Hamilton', email: 'margaret@example.com' },
]

// Replace this function with a request to your API.
async function fetchContacts(query: string): Promise<Contact[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const term = query.trim().toLowerCase()
  return contacts.filter((contact) =>
    [contact.name, contact.email].some((value) => value.toLowerCase().includes(term)),
  )
}

const globalFilter = ref('')
const rows = ref<Contact[]>([])
const loading = ref(false)

watch(
  globalFilter,
  async (query, _previous, onCleanup) => {
    let stale = false
    onCleanup(() => { stale = true })
    loading.value = true
    const result = await fetchContacts(query)
    if (stale) return
    rows.value = result
    loading.value = false
  },
  { immediate: true },
)
${scriptEnd}

<template>
  <div class="grid gap-3">
    <Input
      v-model:value="globalFilter"
      placeholder="Search contacts from API..."
      aria-label="Search contacts from API"
    />
    <p role="status">{{ loading ? 'Loading...' : rows.length + ' results' }}</p>
    <Table
      v-model:global-filter="globalFilter"
      :columns="columns"
      :data="rows"
      manual-filtering
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Server global filtering"
    description="The search triggers a simulated API request. Table receives the returned rows and manualFiltering prevents local filtering."
    :code="code"
    @reset="globalFilter = ''"
  >
    <template #controls>
      <Input
        v-model:value="globalFilter"
        placeholder="Search contacts from API..."
        aria-label="Search contacts from API"
      />
    </template>
    <div class="grid w-full gap-3">
      <p role="status">{{ loading ? 'Loading...' : rows.length + ' results' }}</p>
      <Table
        v-model:global-filter="globalFilter"
        :columns="columns"
        :data="rows"
        manual-filtering
      />
    </div>
  </ComponentExample>
</template>
