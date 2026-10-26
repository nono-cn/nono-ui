<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Slider,
  sliderDefaults,
  sliderOrientations,
  type SliderOrientation,
} from '@/components/ui/Slider'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const orientation = ref<SliderOrientation>(sliderDefaults.orientation)
const wrapperClass = computed(() => (orientation.value === 'vertical' ? 'h-40' : 'w-full max-w-md'))
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <div class="${wrapperClass.value}">
    <Slider :model-value="[40]" orientation="${orientation.value}" />
  </div>
</template>`,
)

function reset() {
  orientation.value = sliderDefaults.orientation
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Show a horizontal or vertical slider."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="orientation"
        label="Orientation"
        :options="sliderOrientations"
      />
    </template>
    <div :class="wrapperClass">
      <Slider :model-value="[40]" :orientation="orientation" />
    </div>
  </ComponentExample>
</template>
