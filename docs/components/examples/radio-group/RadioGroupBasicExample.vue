<script setup lang="ts">
import { computed, ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '@/components/ui/RadioGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
]
const value = ref('system')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
]
const value = ref('${value.value}')
${scriptEnd}

<template>
  <RadioGroup v-model="value" :items="items" legend="Theme" />
</template>`,
)

function reset() {
  value.value = 'system'
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Bind the selected value with v-model and pass the options as items."
    :code="code"
    @reset="reset"
  >
    <RadioGroup v-model="value" :items="items" legend="Theme" />
  </ComponentExample>
</template>
