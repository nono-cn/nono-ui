<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ExampleSliderControl from '../../controls/ExampleSliderControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(70)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'

const value = ref(${value.value})
${scriptEnd}

<template>
  <Progress v-model="value" size="2xl" aria-label="Upload progress">
    <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
  </Progress>
</template>`,
)

function reset() {
  value.value = 70
}
</script>

<template>
  <ComponentExample
    title="Slot label"
    description="Render a label inside the track at sizes xl and 2xl."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSliderControl v-model="value" label="Value" :min="0" :max="100" />
    </template>
    <div class="w-full max-w-md">
      <Progress v-model="value" size="2xl" aria-label="Upload progress">
        <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
      </Progress>
    </div>
  </ComponentExample>
</template>
