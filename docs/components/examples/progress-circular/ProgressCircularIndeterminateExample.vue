<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ProgressCircular,
  progressCircularDefaults,
  progressCircularSizes,
  type ProgressCircularSize,
} from '@/components/ui/ProgressCircular'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<ProgressCircularSize>(progressCircularDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ProgressCircular } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'
${scriptEnd}

<template>
  <ProgressCircular :model-value="null" size="${size.value}" aria-label="Loading" />
</template>`,
)

function reset() {
  size.value = progressCircularDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Indeterminate"
    description="Use a null value when progress is unknown to spin a quarter arc."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="progressCircularSizes" />
    </template>
    <ProgressCircular :model-value="null" :size="size" aria-label="Loading" />
  </ComponentExample>
</template>
