<script setup lang="ts">
import { Trace, type TraceItem } from '@/components/ui/Trace'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TraceItem[] = [
  { value: 'pending', label: 'Pending', description: 'Waiting to start.', status: 'pending' },
  { value: 'running', label: 'Running', description: 'In progress.', status: 'running' },
  {
    value: 'success',
    label: 'Success',
    description: 'Finished without errors.',
    status: 'success',
  },
  { value: 'error', label: 'Error', description: 'Finished with an error.', status: 'error' },
  {
    value: 'custom',
    label: 'Custom icon',
    description: 'item.icon replaces the status icon.',
    status: 'success',
    icon: 'save',
  },
]
const code = `<script setup lang="ts">
import { Trace } from '__DOCS_PACKAGE__/components/ui/Trace'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Trace :items="items" />
</template>`
</script>

<template>
  <ComponentExample
    title="Status"
    description="Each status sets the icon and its color; item.icon overrides the icon."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-md">
      <Trace :items="items" />
    </div>
  </ComponentExample>
</template>
