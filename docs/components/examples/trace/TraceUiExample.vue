<script setup lang="ts">
import { computed, ref } from 'vue'
import { Trace, type TraceItem, type TraceUI } from '@/components/ui/Trace'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TraceItem[] = [
  { value: 'lint', label: 'Lint', status: 'success' },
  { value: 'test', label: 'Test', status: 'error', content: '2 tests failed.' },
  { value: 'deploy', label: 'Deploy', status: 'pending' },
]
const highlight = ref(true)
const ui = computed<TraceUI>(() => ({
  trigger: ({ status }) => ({
    class: highlight.value && status === 'error' ? 'bg-error/10 hover:bg-error/15' : '',
  }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { Trace, type TraceUI } from '__DOCS_PACKAGE__/components/ui/Trace'

const items = ${JSON.stringify(items, null, 2)}
const ui: TraceUI = {
  trigger: ({ status }) => ({
    class: ${highlight.value ? "status === 'error' ? 'bg-error/10 hover:bg-error/15' : ''" : "''"},
  }),
}
${scriptEnd}

<template>
  <Trace :items="items" :ui="ui" />
</template>`,
)

function reset() {
  highlight.value = true
}
</script>

<template>
  <ComponentExample
    title="UI resolver"
    description="Style an item using its status."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="highlight" label="Highlight errors" />
    </template>
    <div class="w-full max-w-md">
      <Trace :items="items" :ui="ui" />
    </div>
  </ComponentExample>
</template>
