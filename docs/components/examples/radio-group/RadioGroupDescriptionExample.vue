<script setup lang="ts">
import { computed, ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '@/components/ui/RadioGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Standard', description: 'Arrives in 4 to 6 business days.', value: 'standard' },
  { label: 'Express', description: 'Arrives in 2 business days.', value: 'express' },
  { label: 'Overnight', description: 'Arrives tomorrow before noon.', value: 'overnight' },
]
const value = ref('standard')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Standard', description: 'Arrives in 4 to 6 business days.', value: 'standard' },
  { label: 'Express', description: 'Arrives in 2 business days.', value: 'express' },
  { label: 'Overnight', description: 'Arrives tomorrow before noon.', value: 'overnight' },
]
const value = ref('${value.value}')
${scriptEnd}

<template>
  <RadioGroup v-model="value" :items="items" legend="Shipping" />
</template>`,
)

function reset() {
  value.value = 'standard'
}
</script>

<template>
  <ComponentExample
    title="Description"
    description="Add a description under each label; it becomes the radio’s accessible description."
    :code="code"
    @reset="reset"
  >
    <RadioGroup v-model="value" :items="items" legend="Shipping" />
  </ComponentExample>
</template>
