<script setup lang="ts">
import { computed, ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '@/components/ui/RadioGroup'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
]
const legend = ref('Billing period')
const code = computed(
  () => `<script setup lang="ts">
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
]
${scriptEnd}

<template>
  <RadioGroup :items="items" legend="${legend.value}" />
</template>`,
)

function reset() {
  legend.value = 'Billing period'
}
</script>

<template>
  <ComponentExample
    title="Legend"
    description="Name the group with a legend; it labels the radio group for assistive technologies."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleTextInputControl v-model="legend" label="Legend" />
    </template>
    <RadioGroup :items="items" :legend="legend" />
  </ComponentExample>
</template>
