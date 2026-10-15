<script setup lang="ts">
import { computed, ref } from 'vue'
import { Stepper, type StepperStep } from '@/components/ui/Stepper'
import { Button } from '@/components/ui/Button'
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
    slot: 'address',
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
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

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
    "description": "Delivery details",
    "slot": "address"
  },
  {
    "value": 3,
    "label": "Review",
    "description": "Confirm your order"
  }
]
${scriptEnd}

<template>
  <Stepper v-model="value" :steps="steps" :linear="false" aria-label="Checkout progress">
    <template #label-address="{ item }">{{ item.label }} (required)</template>
    <template #content="{ item, prevStep, nextStep, isPrevDisabled, isNextDisabled }">
      <p class="mb-3">{{ item.description }}</p>
      <div class="flex gap-3">
        <Button label="Previous" variant="outline" :disabled="isPrevDisabled" @click="prevStep" />
        <Button label="Next" :disabled="isNextDisabled" @click="nextStep" />
      </div>
    </template>
  </Stepper>
</template>`,
)
function reset() {
  value.value = 1
}
</script>

<template>
  <ComponentExample
    title="Custom slots"
    description="Use a specific slot and navigate from the content."
    :code="code"
    @reset="reset"
  >
    <Stepper v-model="value" :steps="steps" :linear="false" aria-label="Checkout progress">
      <template #label-address="{ item }">{{ item.label }} (required)</template>
      <template #content="{ item, prevStep, nextStep, isPrevDisabled, isNextDisabled }">
        <p class="mb-3">{{ item.description }}</p>
        <div class="flex gap-3">
          <Button label="Previous" variant="outline" :disabled="isPrevDisabled" @click="prevStep" />
          <Button label="Next" :disabled="isNextDisabled" @click="nextStep" />
        </div>
      </template>
    </Stepper>
  </ComponentExample>
</template>
