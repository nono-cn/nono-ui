<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref([20, 80])
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const value = ref([${value.value.join(', ')}])
${scriptEnd}

<template>
  <Slider v-model="value" />
</template>`,
)

function reset() {
  value.value = [20, 80]
}
</script>

<template>
  <ComponentExample
    title="Multiple"
    description="Pass several values to render one thumb per value."
    :code="code"
    @reset="reset"
  >
    <div class="w-full max-w-md">
      <Slider v-model="value" />
    </div>
  </ComponentExample>
</template>
