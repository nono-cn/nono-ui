<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox, type CheckboxUI } from '@/components/ui/Checkbox'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const states = ['unchecked', 'checked', 'indeterminate'] as const
type SelectionState = (typeof states)[number]
const state = ref<SelectionState>('indeterminate')
const value = computed(() =>
  state.value === 'indeterminate' ? state.value : state.value === 'checked',
)

const ui: CheckboxUI = {
  indicator: ({ state }) => ({
    class: state === 'indeterminate' ? 'rounded-sm bg-black/20' : 'rounded-sm',
    'aria-label': state === 'indeterminate' ? 'Partially selected' : undefined,
  }),
}

const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox, type CheckboxUI } from '__DOCS_PACKAGE__/components/ui/Checkbox'

const state = ref<'unchecked' | 'checked' | 'indeterminate'>('${state.value}')
const value = computed(() =>
  state.value === 'indeterminate' ? state.value : state.value === 'checked',
)

const ui: CheckboxUI = {
  indicator: ({ state }) => ({
    class: state === 'indeterminate' ? 'rounded-sm bg-black/20' : 'rounded-sm',
    'aria-label': state === 'indeterminate' ? 'Partially selected' : undefined,
  }),
}
${scriptEnd}

<template>
  <Checkbox :value="value" :ui="ui" aria-label="Selection state" />
</template>`,
)

function reset() {
  state.value = 'indeterminate'
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the indicator using the current CheckboxContext state."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="state" label="State" :options="states" />
    </template>
    <Checkbox :value="value" :ui="ui" aria-label="Selection state" />
  </ComponentExample>
</template>
