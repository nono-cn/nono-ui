<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressCircular } from '@/components/ui/ProgressCircular'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const label = ref('65%')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ProgressCircular } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'

const label = ref(${JSON.stringify(label.value)})
${scriptEnd}

<template>
  <ProgressCircular :model-value="65" :label="label" aria-label="Upload progress" />
</template>`,
)

function reset() {
  label.value = '65%'
}
</script>

<template>
  <ComponentExample
    title="Label"
    description="Show text in the center of the circle."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="label" label="Label" />
    </template>
    <ProgressCircular :model-value="65" :label="label" aria-label="Upload progress" />
  </ComponentExample>
</template>
