<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const readonly = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="3" :readonly="${readonly.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  readonly.value = true
}
</script>

<template>
  <ComponentExample
    title="Readonly"
    description="Display a rating without allowing changes."
    :code="code"
    @reset="reset"
  >
    <template #controls><ExampleCheckboxControl v-model="readonly" label="Readonly" /></template>
    <Rating :model-value="3" :readonly="readonly" aria-label="Product rating" />
  </ComponentExample>
</template>
