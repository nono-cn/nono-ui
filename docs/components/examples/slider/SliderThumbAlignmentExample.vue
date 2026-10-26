<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Slider,
  sliderDefaults,
  sliderThumbAlignments,
  type SliderThumbAlignment,
} from '@/components/ui/Slider'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const thumbAlignment = ref<SliderThumbAlignment>(sliderDefaults.thumbAlignment)
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <Slider :model-value="[0, 100]" thumb-alignment="${thumbAlignment.value}" />
</template>`,
)

function reset() {
  thumbAlignment.value = sliderDefaults.thumbAlignment
}
</script>

<template>
  <ComponentExample
    title="Thumb alignment"
    description="Keep the thumbs inside the track or let them overflow its ends."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="thumbAlignment"
        label="Thumb alignment"
        :options="sliderThumbAlignments"
      />
    </template>
    <div class="w-full max-w-md">
      <Slider :model-value="[0, 100]" :thumb-alignment="thumbAlignment" />
    </div>
  </ComponentExample>
</template>
