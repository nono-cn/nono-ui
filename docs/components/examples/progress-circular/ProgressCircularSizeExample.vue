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
  <ProgressCircular :model-value="65" size="${size.value}" label="65%" aria-label="Upload progress" />
</template>`,
)

function reset() {
  size.value = progressCircularDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the diameter and label text size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="progressCircularSizes" />
    </template>
    <ProgressCircular :model-value="65" :size="size" label="65%" aria-label="Upload progress" />
  </ComponentExample>
</template>
