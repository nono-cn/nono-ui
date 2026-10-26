<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider } from '@/components/ui/Slider'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const inverted = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <Slider :model-value="[30]" :inverted="${inverted.value}" />
</template>`,
)

function reset() {
  inverted.value = true
}
</script>

<template>
  <ComponentExample
    title="Inverted"
    description="Fill the track from the opposite edge."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="inverted" label="Inverted" />
    </template>
    <div class="w-full max-w-md">
      <Slider :model-value="[30]" :inverted="inverted" />
    </div>
  </ComponentExample>
</template>
