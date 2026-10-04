<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref<'yes' | 'no'>('no')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const value = ref<'yes' | 'no'>('${value.value}')
${scriptEnd}

<template>
  <label class="flex items-center gap-3">
    <Switch v-model="value" true-value="yes" false-value="no" />
    <span>Enabled: {{ value }}</span>
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
    description="Use custom values for the two states."
    :code="code"
    @reset="reset"
  >
    <label class="flex items-center gap-3">
      <Switch v-model="value" true-value="yes" false-value="no" />
      <span>Enabled: {{ value }}</span>
    </label>
  </ComponentExample>
</template>
