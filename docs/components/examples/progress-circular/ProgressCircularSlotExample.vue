<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressCircular } from '@/components/ui/ProgressCircular'
import ExampleSliderControl from '../../controls/ExampleSliderControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(70)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ProgressCircular } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'

const value = ref(${value.value})
${scriptEnd}

<template>
  <ProgressCircular v-model="value" size="xl" aria-label="Upload progress">
    <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
  </ProgressCircular>
</template>`,
)

function reset() {
  value.value = 70
}
</script>

<template>
  <ComponentExample
    title="Slot label"
    description="Render custom content in the center of the circle."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSliderControl v-model="value" label="Value" :min="0" :max="100" />
    </template>
    <ProgressCircular v-model="value" size="xl" aria-label="Upload progress">
      <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
    </ProgressCircular>
  </ComponentExample>
</template>
