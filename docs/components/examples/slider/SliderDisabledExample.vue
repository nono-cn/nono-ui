<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider } from '@/components/ui/Slider'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const disabled = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <Slider :model-value="[30]" :disabled="${disabled.value}" />
</template>`,
)

function reset() {
  disabled.value = true
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Prevent interaction with the slider."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="disabled" label="Disabled" />
    </template>
    <div class="w-full max-w-md">
      <Slider :model-value="[30]" :disabled="disabled" />
    </div>
  </ComponentExample>
</template>
