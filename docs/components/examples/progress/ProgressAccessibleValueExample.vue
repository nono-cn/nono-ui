<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ExampleSliderControl from '../../controls/ExampleSliderControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(80)
const code = computed(
  () => `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <Progress
    :model-value="${value.value}"
    :get-value-label="() => 'File upload progress'"
    :get-value-text="(current, total) => current + ' of ' + total + ' files uploaded'"
  />
</template>`,
)

function reset() {
  value.value = 80
}
</script>

<template>
  <ComponentExample
    title="Accessible value"
    description="Provide a spoken name and value for assistive technology."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSliderControl v-model="value" label="Value" :min="0" :max="100" />
    </template>
    <div class="w-full max-w-md">
      <Progress
        :model-value="value"
        :get-value-label="() => 'File upload progress'"
        :get-value-text="(current, total) => current + ' of ' + total + ' files uploaded'"
      />
    </div>
  </ComponentExample>
</template>
