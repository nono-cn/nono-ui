<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Progress,
  progressDefaults,
  progressSizes,
  type ProgressSize,
} from '@/components/ui/Progress'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<ProgressSize>(progressDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :model-value="65" size="${size.value}" aria-label="Upload progress" />
</template>`,
)

function reset() {
  size.value = progressDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the track thickness."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="progressSizes" />
    </template>
    <div class="w-full max-w-md">
      <Progress :model-value="65" :size="size" aria-label="Upload progress" />
    </div>
  </ComponentExample>
</template>
