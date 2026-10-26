<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider, sliderDefaults } from '@/components/ui/Slider'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const min = ref(0)
const max = ref(50)
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <Slider :model-value="[20]" :min="${min.value}" :max="${max.value}" />
</template>`,
)

function reset() {
  min.value = sliderDefaults.min
  max.value = 50
}
</script>

<template>
  <ComponentExample
    title="Min and max"
    description="Set the minimum and maximum values of the slider."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleNumberControl v-model="min" label="Min" />
        <ExampleNumberControl v-model="max" label="Max" />
      </div>
    </template>
    <div class="w-full max-w-md">
      <Slider :model-value="[20]" :min="min" :max="max" />
    </div>
  </ComponentExample>
</template>
