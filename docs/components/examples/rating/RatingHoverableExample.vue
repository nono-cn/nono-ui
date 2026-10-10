<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const hoverable = ref(true)
const value = ref(3)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const value = ref(${value.value})
${scriptEnd}

<template>
  <Rating v-model="value" :hoverable="${hoverable.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  hoverable.value = true
  value.value = 3
}
</script>

<template>
  <ComponentExample
    title="Hoverable"
    description="Preview the value while hovering over rating items."
    :code="code"
    @reset="reset"
  >
    <template #controls><ExampleCheckboxControl v-model="hoverable" label="Hoverable" /></template>
    <Rating v-model="value" :hoverable="hoverable" aria-label="Product rating" />
  </ComponentExample>
</template>
