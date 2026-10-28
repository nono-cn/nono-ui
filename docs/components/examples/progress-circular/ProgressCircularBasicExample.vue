<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressCircular } from '@/components/ui/ProgressCircular'
import ExampleSliderControl from '../../controls/ExampleSliderControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(35)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ProgressCircular } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'

const value = ref(${value.value})
${scriptEnd}

<template>
  <ProgressCircular v-model="value" aria-label="Upload progress" />
</template>`,
)

function reset() {
  value.value = 35
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show a determinate value and update it with v-model."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSliderControl v-model="value" label="Value" :min="0" :max="100" />
    </template>
    <ProgressCircular v-model="value" aria-label="Upload progress" />
  </ComponentExample>
</template>
