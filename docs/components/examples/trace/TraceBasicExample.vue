<script setup lang="ts">
import { computed, ref } from 'vue'
import { Trace, traceStatuses, type TraceItem, type TraceStatus } from '@/components/ui/Trace'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const status = ref<TraceStatus>('running')
const items = computed<TraceItem[]>(() => [
  { value: 'search', label: 'Searched the docs', status: 'success' },
  { value: 'read', label: 'Read 3 files', status: 'success' },
  { value: 'answer', label: 'Writing the answer', status: status.value },
])
const code = computed(
  () => `<script setup lang="ts">
import { Trace } from '__DOCS_PACKAGE__/components/ui/Trace'

const items = ${JSON.stringify(items.value, null, 2)}
${scriptEnd}

<template>
  <Trace :items="items" />
</template>`,
)

function reset() {
  status.value = 'running'
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="List the steps of a process with their status."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="status" label="Last step status" :options="traceStatuses" />
    </template>
    <div class="w-full max-w-md">
      <Trace :items="items" />
    </div>
  </ComponentExample>
</template>
