<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressCircular } from '@/components/ui/ProgressCircular'
import ExampleSliderControl from '../../controls/ExampleSliderControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(80)
const code = computed(
  () => `<script setup lang="ts">
import { ProgressCircular } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'
${scriptEnd}

<template>
  <ProgressCircular
    :model-value="${value.value}"
    :get-value-label="() => 'File upload progress'"
    :get-value-text="(current, total) => current + ' of ' + total + ' files uploaded'"
  />
</template>`,
)

function reset() {
  value.value = 80
}
</script>

<template>
  <ComponentExample
    title="Accessible value"
    description="Provide a spoken name and value for assistive technology."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSliderControl v-model="value" label="Value" :min="0" :max="100" />
    </template>
    <ProgressCircular
      :model-value="value"
      :get-value-label="() => 'File upload progress'"
      :get-value-text="(current, total) => current + ' of ' + total + ' files uploaded'"
    />
  </ComponentExample>
</template>
