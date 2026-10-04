<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch, type SwitchUI } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(true)
const ui: SwitchUI = {
  thumb: ({ state }) => ({
    class: state ? 'ring-4 ring-fuchsia-500 shadow-lg' : 'ring-4 ring-amber-500 shadow-lg',
  }),
}
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Switch, type SwitchUI } from '__DOCS_PACKAGE__/components/ui/Switch'

const value = ref(${value.value})
const ui: SwitchUI = {
  thumb: ({ state }) => ({
    class: state ? 'ring-4 ring-fuchsia-500 shadow-lg' : 'ring-4 ring-amber-500 shadow-lg',
  }),
}
${scriptEnd}

<template>
  <Switch v-model="value" :ui="ui" aria-label="State" />
</template>`,
)

function reset() {
  value.value = true
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Toggle the switch to see distinct thumb styles for each state."
    :code="code"
    @reset="reset"
  >
    <Switch v-model="value" :ui="ui" aria-label="State" />
  </ComponentExample>
</template>
