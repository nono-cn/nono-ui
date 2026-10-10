<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const disabled = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="3" :disabled="${disabled.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  disabled.value = true
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Prevent interaction and show disabled styling."
    :code="code"
    @reset="reset"
  >
    <template #controls><ExampleCheckboxControl v-model="disabled" label="Disabled" /></template>
    <Rating :model-value="3" :disabled="disabled" aria-label="Product rating" />
  </ComponentExample>
</template>
