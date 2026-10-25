<script setup lang="ts">
import { computed, ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '@/components/ui/RadioGroup'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Card', value: 'card' },
  { label: 'PayPal', value: 'paypal' },
  {
    label: 'Bank transfer',
    description: 'Not available in your region.',
    value: 'bank',
    disabled: true,
  },
]
const value = ref('card')
const disabled = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Card', value: 'card' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Bank transfer', description: 'Not available in your region.', value: 'bank', disabled: true },
]
const value = ref('${value.value}')
${scriptEnd}

<template>
  <RadioGroup v-model="value" :items="items"${disabled.value ? ' disabled' : ''} legend="Payment method" />
</template>`,
)

function reset() {
  value.value = 'card'
  disabled.value = false
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Disable the whole group, or a single option with its disabled field."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="disabled" label="Disable group" />
    </template>
    <RadioGroup v-model="value" :items="items" :disabled="disabled" legend="Payment method" />
  </ComponentExample>
</template>
