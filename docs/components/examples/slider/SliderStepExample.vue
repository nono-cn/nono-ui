<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider } from '@/components/ui/Slider'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const step = ref(10)
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <Slider :model-value="[50]" :step="${step.value}" />
</template>`,
)

function reset() {
  step.value = 10
}
</script>

<template>
  <ComponentExample
    title="Step"
    description="Set the interval between values."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleNumberControl v-model="step" label="Step" :min="1" />
    </template>
    <div class="w-full max-w-md">
      <Slider :model-value="[50]" :step="step" />
    </div>
  </ComponentExample>
</template>
