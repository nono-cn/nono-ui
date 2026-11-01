<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox } from '@/components/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref<'yes' | 'no'>('no')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '__DOCS_PACKAGE__/components/Checkbox'

const value = ref<'yes' | 'no'>('${value.value}')
${scriptEnd}

<template>
  <label class="flex items-center gap-3">
    <Checkbox v-model:value="value" true-value="yes" false-value="no" />
    <span>Accept: {{ value }}</span>
  </label>
</template>`,
)

function reset() {
  value.value = 'no'
}
</script>

<template>
  <ComponentExample
    title="Custom values"
    description="Use custom values with v-model:value."
    :code="code"
    @reset="reset"
  >
    <label class="flex items-center gap-3">
      <Checkbox v-model:value="value" true-value="yes" false-value="no" />
      <span>Accept: {{ value }}</span>
    </label>
  </ComponentExample>
</template>
