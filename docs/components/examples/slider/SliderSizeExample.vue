<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider, sliderDefaults, sliderSizes, type SliderSize } from '@/components/ui/Slider'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<SliderSize>(sliderDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <Slider :model-value="[60]" size="${size.value}" />
</template>`,
)

function reset() {
  size.value = sliderDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the track thickness and the thumb size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="sliderSizes" />
    </template>
    <div class="w-full max-w-md">
      <Slider :model-value="[60]" :size="size" />
    </div>
  </ComponentExample>
</template>
