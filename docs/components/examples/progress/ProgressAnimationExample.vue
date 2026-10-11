<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Progress,
  progressAnimations,
  progressDefaults,
  progressOrientations,
  type ProgressAnimation,
  type ProgressOrientation,
} from '@/components/ui/Progress'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const animation = ref<ProgressAnimation>(progressDefaults.animation)
const orientation = ref<ProgressOrientation>(progressDefaults.orientation)
const code = computed(
  () => `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <div class="${orientation.value === 'vertical' ? 'h-40' : 'w-full max-w-md'}">
    <Progress :model-value="null" animation="${animation.value}" orientation="${orientation.value}" aria-label="Loading" />
  </div>
</template>`,
)

function reset() {
  animation.value = progressDefaults.animation
  orientation.value = progressDefaults.orientation
}
</script>

<template>
  <ComponentExample
    title="Indeterminate animation"
    description="Use a null value when progress is unknown and choose its animation."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="animation" label="Animation" :options="progressAnimations" />
        <ExampleSelectControl
          v-model="orientation"
          label="Orientation"
          :options="progressOrientations"
        />
      </div>
    </template>
    <div :class="orientation === 'vertical' ? 'h-40' : 'w-full max-w-md'">
      <Progress
        :model-value="null"
        :animation="animation"
        :orientation="orientation"
        aria-label="Loading"
      />
    </div>
  </ComponentExample>
</template>
