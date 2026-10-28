<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressCircular, progressCircularDefaults } from '@/components/ui/ProgressCircular'
import ExampleSliderControl from '../../controls/ExampleSliderControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const thickness = ref(progressCircularDefaults.thickness)
const code = computed(
  () => `<script setup lang="ts">
import { ProgressCircular } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'
${scriptEnd}

<template>
  <ProgressCircular :model-value="65" :thickness="${thickness.value}" size="xl" aria-label="Upload progress" />
</template>`,
)

function reset() {
  thickness.value = progressCircularDefaults.thickness
}
</script>

<template>
  <ComponentExample
    title="Thickness"
    description="Change the stroke width, measured against a diameter of 100."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSliderControl v-model="thickness" label="Thickness" :min="1" :max="30" />
    </template>
    <ProgressCircular
      :model-value="65"
      :thickness="thickness"
      size="xl"
      aria-label="Upload progress"
    />
  </ComponentExample>
</template>
