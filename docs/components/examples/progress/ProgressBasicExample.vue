<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ExampleSliderControl from '../../controls/ExampleSliderControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(35)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'

const value = ref(${value.value})
${scriptEnd}

<template>
  <Progress v-model="value" aria-label="Upload progress" />
</template>`,
)

function reset() {
  value.value = 35
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show a determinate value and update it with v-model."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSliderControl v-model="value" label="Value" :min="0" :max="100" />
    </template>
    <div class="w-full max-w-md">
      <Progress v-model="value" aria-label="Upload progress" />
    </div>
  </ComponentExample>
</template>
