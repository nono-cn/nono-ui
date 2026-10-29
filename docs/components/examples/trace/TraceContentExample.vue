<script setup lang="ts">
import { computed, ref } from 'vue'
import { Trace, type TraceItem } from '@/components/ui/Trace'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: TraceItem[] = [
  {
    value: 'plan',
    label: 'Planned the change',
    status: 'success',
    content: 'Add the component, its docs and its tests.',
  },
  {
    value: 'build',
    label: 'Ran the build',
    status: 'error',
    content: 'error TS2322: Type "string" is not assignable to type "number".',
  },
  { value: 'retry', label: 'Retry the build', status: 'pending' },
]
const open = ref<string[]>(['build'])
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Trace } from '__DOCS_PACKAGE__/components/ui/Trace'

const items = ${JSON.stringify(items, null, 2)}
const open = ref(${JSON.stringify(open.value)})
${scriptEnd}

<template>
  <Trace v-model="open" :items="items" />
</template>`,
)

function reset() {
  open.value = ['build']
}
</script>

<template>
  <ComponentExample
    title="Collapsible content"
    description="Items with content can be expanded; v-model holds the values of the open items."
    :code="code"
    @reset="reset"
  >
    <div class="grid w-full max-w-md gap-3">
      <Trace v-model="open" :items="items" />
      <p class="text-xs text-muted-foreground">Open: {{ open.join(', ') || 'none' }}</p>
    </div>
  </ComponentExample>
</template>
