<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const max = ref(200)
const safeMax = computed(() => Math.max(80, Number(max.value) || 80))
const code = computed(
  () => `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :model-value="80" :max="${safeMax.value}" aria-label="Upload progress" />
</template>`,
)

function reset() {
  max.value = 200
}
</script>

<template>
  <ComponentExample
    title="Max"
    description="Set the maximum value used to calculate progress."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleNumberControl v-model="max" label="Max" :min="80" />
    </template>
    <div class="w-full max-w-md">
      <Progress :model-value="80" :max="safeMax" aria-label="Upload progress" />
    </div>
  </ComponentExample>
</template>
