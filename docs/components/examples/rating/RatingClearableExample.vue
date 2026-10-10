<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const clearable = ref(true)
const value = ref(3)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const value = ref(${value.value})
${scriptEnd}

<template>
  <Rating v-model="value" :clearable="${clearable.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  clearable.value = true
  value.value = 3
}
</script>

<template>
  <ComponentExample
    title="Clearable"
    description="Select the current value again to clear it."
    :code="code"
    @reset="reset"
  >
    <template #controls><ExampleCheckboxControl v-model="clearable" label="Clearable" /></template>
    <Rating v-model="value" :clearable="clearable" aria-label="Product rating" />
  </ComponentExample>
</template>
