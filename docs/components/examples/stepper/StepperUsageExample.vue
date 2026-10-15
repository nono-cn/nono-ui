<script setup lang="ts">
import { computed, ref } from 'vue'
import { Stepper, type StepperStep } from '@/components/ui/Stepper'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(1)
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
import { Stepper, type StepperStep } from '__DOCS_PACKAGE__/components/ui/Stepper'

const value = ref(${value.value})
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
  <Stepper v-model="value" :steps="steps" aria-label="Checkout progress" />
</template>`,
)
function reset() {
  value.value = 1
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Follow the steps in order."
    :code="code"
    @reset="reset"
  >
    <Stepper v-model="value" :steps="steps" aria-label="Checkout progress" />
  </ComponentExample>
</template>
