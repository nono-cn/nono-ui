<script setup lang="ts">
import { computed, ref } from 'vue'
import { Stepper, type StepperStep, type StepperUI } from '@/components/ui/Stepper'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(1)
const ui: StepperUI = {
  indicator: ({ active }) => ({ class: active ? 'ring-4 ring-primary/20' : '' }),
  content: () => ({ class: 'rounded-lg border p-4' }),
}
const steps: StepperStep[] = [
  {
    value: 1,
    icon: 'user',
    label: 'Account',
    description: 'Your profile',
  },
  {
    value: 2,
    icon: 'fileText',
    label: 'Address',
    description: 'Delivery details',
  },
  {
    value: 3,
    label: 'Review',
    description: 'Confirm your order',
  },
]
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Stepper, type StepperStep, type StepperUI } from '__DOCS_PACKAGE__/components/ui/Stepper'

const value = ref(${value.value})
const ui: StepperUI = {
  indicator: ({ active }) => ({ class: active ? 'ring-4 ring-primary/20' : '' }),
  content: () => ({ class: 'rounded-lg border p-4' })
}
const steps: StepperStep[] = [
  {
    "value": 1,
    "icon": "user",
    "label": "Account",
    "description": "Your profile"
  },
  {
    "value": 2,
    "icon": "fileText",
    "label": "Address",
    "description": "Delivery details"
  },
  {
    "value": 3,
    "label": "Review",
    "description": "Confirm your order"
  }
]
${scriptEnd}

<template>
  <Stepper v-model="value" :steps="steps" :ui="ui" aria-label="Checkout progress">
      <template #content="{ item }">{{ item.description }}</template>
    </Stepper>
</template>`,
)
function reset() {
  value.value = 1
}
</script>

<template>
  <ComponentExample
    title="UI resolvers"
    description="Customize nodes using the current step context."
    :code="code"
    @reset="reset"
  >
    <Stepper v-model="value" :steps="steps" :ui="ui" aria-label="Checkout progress">
      <template #content="{ item }">{{ item.description }}</template>
    </Stepper>
  </ComponentExample>
</template>
