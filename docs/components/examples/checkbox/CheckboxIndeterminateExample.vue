<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox } from '@/components/ui/Checkbox'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const states = ['unchecked', 'checked', 'indeterminate'] as const
type SelectionState = (typeof states)[number]
const state = ref<SelectionState>('indeterminate')
const value = computed(() =>
  state.value === 'indeterminate' ? state.value : state.value === 'checked',
)
const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'

const state = ref<'unchecked' | 'checked' | 'indeterminate'>('${state.value}')
const value = computed(() =>
  state.value === 'indeterminate' ? state.value : state.value === 'checked',
)
${scriptEnd}

<template>
  <Checkbox :value="value" aria-label="Selection state" />
</template>`,
)

function reset() {
  state.value = 'indeterminate'
}
</script>

<template>
  <ComponentExample
    title="Indeterminate"
    description="Switch between unchecked, checked, and indeterminate states."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="state" label="State" :options="states" />
      </div>
    </template>
    <Checkbox :value="value" aria-label="Selection state" />
  </ComponentExample>
</template>
