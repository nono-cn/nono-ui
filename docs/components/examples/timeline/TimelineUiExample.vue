<script setup lang="ts">
import { computed, ref } from 'vue'
import { Timeline, type TimelineUI } from '@/components/ui/Timeline'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { value: 1, label: 'Start', description: 'The process begins.', icon: 'plus' as const },
  { value: 2, label: 'Finish', description: 'The process ends.', icon: 'check' as const },
]
const highlight = ref(true)
const ui = computed<TimelineUI>(() => ({
  label: ({ active }) => ({ class: highlight.value && active ? 'underline decoration-2' : '' }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { Timeline, type TimelineUI } from '__DOCS_PACKAGE__/components/ui/Timeline'

const items = ${JSON.stringify(items, null, 2)}
const ui: TimelineUI = {
  label: ({ active }) => ({ class: ${highlight.value ? "active ? 'underline decoration-2' : ''" : "''"} }),
}
${scriptEnd}

<template>
  <Timeline :items="items" :model-value="2" :ui="ui" />
</template>`,
)

function reset() {
  highlight.value = true
}
</script>

<template>
  <ComponentExample
    title="UI resolver"
    description="Style an item using its active state."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="highlight" label="Highlight active label" />
    </template>
    <div class="w-full max-w-xl">
      <Timeline :items="items" :model-value="2" :ui="ui" />
    </div>
  </ComponentExample>
</template>
