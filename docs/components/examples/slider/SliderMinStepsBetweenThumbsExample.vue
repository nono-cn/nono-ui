<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider } from '@/components/ui/Slider'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const minStepsBetweenThumbs = ref(10)
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <Slider :model-value="[30, 70]" :min-steps-between-thumbs="${minStepsBetweenThumbs.value}" />
</template>`,
)

function reset() {
  minStepsBetweenThumbs.value = 10
}
</script>

<template>
  <ComponentExample
    title="Min steps between thumbs"
    description="Keep a minimum number of steps between thumbs."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleNumberControl
        v-model="minStepsBetweenThumbs"
        label="Min steps between thumbs"
        :min="0"
        :max="50"
      />
    </template>
    <div class="w-full max-w-md">
      <Slider :model-value="[30, 70]" :min-steps-between-thumbs="minStepsBetweenThumbs" />
    </div>
  </ComponentExample>
</template>
