<script setup lang="ts">
import { Timeline } from '@/components/ui/Timeline'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 'created',
    slot: 'created',
    label: 'Created',
    description: 'The request was opened.',
    icon: 'fileText' as const,
  },
  {
    value: 'approved',
    label: 'Approved',
    description: 'The request was approved.',
    icon: 'check' as const,
  },
]
const code = `<script setup lang="ts">
import { Timeline } from '__DOCS_PACKAGE__/components/ui/Timeline'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Timeline :items="items" model-value="approved">
    <template #label-created="{ item }">
      <strong>{{ item.label }} · today</strong>
    </template>
    <template #indicator-created>
      <span aria-hidden="true">✓</span>
    </template>
  </Timeline>
</template>`
</script>

<template>
  <ComponentExample
    title="Item slots"
    description="Use item.slot to customize one item without changing the others."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-xl">
      <Timeline :items="items" model-value="approved">
        <template #label-created="{ item }">
          <strong>{{ item.label }} · today</strong>
        </template>
        <template #indicator-created>
          <span aria-hidden="true">✓</span>
        </template>
      </Timeline>
    </div>
  </ComponentExample>
</template>
