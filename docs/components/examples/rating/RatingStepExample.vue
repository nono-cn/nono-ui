<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(2.5)
const step = ref('0.5')
const steps = ['0.5', '1']
const stepValue = computed<0.5 | 1>(() => (step.value === '0.5' ? 0.5 : 1))
watch(stepValue, () => {
  value.value = stepValue.value === 1 ? 3 : 2.5
})
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const value = ref(${value.value})
${scriptEnd}

<template>
  <Rating v-model="value" :step="${step.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  value.value = 2.5
  step.value = '0.5'
}
</script>

<template>
  <ComponentExample
    title="Step"
    description="Choose whole or half-star increments."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleSelectControl v-model="step" label="Step" :options="steps"
    /></template>
    <Rating v-model="value" :step="stepValue" aria-label="Product rating" />
  </ComponentExample>
</template>
