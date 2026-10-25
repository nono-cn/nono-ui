<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@/components/ui/Badge'
import { RadioGroup, type RadioGroupItem } from '@/components/ui/RadioGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Starter', value: 'starter' },
  { label: 'Growth', value: 'growth' },
  { label: 'Scale', value: 'scale' },
]
const prices: Record<string, string> = { starter: '$0', growth: '$29', scale: '$99' }
const value = ref('growth')
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Starter', value: 'starter' },
  { label: 'Growth', value: 'growth' },
  { label: 'Scale', value: 'scale' },
]
const prices: Record<string, string> = { starter: '$0', growth: '$29', scale: '$99' }
const value = ref('growth')
${scriptEnd}

<template>
  <RadioGroup v-model="value" :items="items" variant="card">
    <template #legend="{ value }">Plan: {{ value }}</template>
    <template #label="{ item }">
      {{ item.label }}
      <Badge v-if="item.value === 'growth'" label="Popular" size="sm" variant="soft" />
    </template>
    <template #description="{ item }">{{ prices[item.value] }} per month</template>
  </RadioGroup>
</template>`

function reset() {
  value.value = 'growth'
}
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Customize the legend, and the label and description of every item."
    :code="code"
    @reset="reset"
  >
    <RadioGroup v-model="value" :items="items" variant="card">
      <template #legend="{ value: selected }">Plan: {{ selected }}</template>
      <template #label="{ item }">
        {{ item.label }}
        <Badge v-if="item.value === 'growth'" label="Popular" size="sm" variant="soft" />
      </template>
      <template #description="{ item }">{{ prices[item.value] }} per month</template>
    </RadioGroup>
  </ComponentExample>
</template>
