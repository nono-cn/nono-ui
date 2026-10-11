<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Progress,
  progressDefaults,
  progressOrientations,
  type ProgressOrientation,
} from '@/components/ui/Progress'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const orientation = ref<ProgressOrientation>(progressDefaults.orientation)
const inverted = ref(progressDefaults.inverted)
const code = computed(
  () => `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <div class="${orientation.value === 'vertical' ? 'h-40' : 'w-full max-w-md'}">
    <Progress :model-value="40" orientation="${orientation.value}" :inverted="${inverted.value}" aria-label="Upload progress" />
  </div>
</template>`,
)

function reset() {
  orientation.value = progressDefaults.orientation
  inverted.value = progressDefaults.inverted
}
</script>

<template>
  <ComponentExample
    title="Orientation and direction"
    description="Show horizontal or vertical progress, optionally from the opposite edge."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="orientation"
          label="Orientation"
          :options="progressOrientations"
        />
        <ExampleCheckboxControl v-model="inverted" label="Inverted" />
      </div>
    </template>
    <div :class="orientation === 'vertical' ? 'h-40' : 'w-full max-w-md'">
      <Progress
        :model-value="40"
        :orientation="orientation"
        :inverted="inverted"
        aria-label="Upload progress"
      />
    </div>
  </ComponentExample>
</template>
