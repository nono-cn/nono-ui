<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref([50])
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const value = ref([${value.value.join(', ')}])
${scriptEnd}

<template>
  <Slider v-model="value" :ui="{ thumb: () => ({ 'aria-label': 'Volume' }) }" />
</template>`,
)

function reset() {
  value.value = [50]
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Pick a value and update it with v-model."
    :code="code"
    @reset="reset"
  >
    <div class="w-full max-w-md">
      <Slider v-model="value" :ui="{ thumb: () => ({ 'aria-label': 'Volume' }) }" />
    </div>
  </ComponentExample>
</template>
