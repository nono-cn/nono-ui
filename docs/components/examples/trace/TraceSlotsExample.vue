<script setup lang="ts">
import { Trace, type TraceItem } from '@/components/ui/Trace'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TraceItem[] = [
  { value: 'fetch', slot: 'fetch', label: 'Fetched 12 records', status: 'success' },
  { value: 'save', label: 'Saved the records', status: 'running' },
]
const code = `<script setup lang="ts">
import { Trace } from '__DOCS_PACKAGE__/components/ui/Trace'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Trace :items="items">
    <template #label-fetch="{ item }">
      <strong>{{ item.label }}</strong> · 120 ms
    </template>
    <template #content-fetch>
      GET /api/records → 200 OK
    </template>
  </Trace>
</template>`
</script>

<template>
  <ComponentExample
    title="Item slots"
    description="Use item.slot to customize one item without changing the others."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-md">
      <Trace :items="items">
        <template #label-fetch="{ item }">
          <strong>{{ item.label }}</strong> · 120 ms
        </template>
        <template #content-fetch> GET /api/records → 200 OK </template>
      </Trace>
    </div>
  </ComponentExample>
</template>
