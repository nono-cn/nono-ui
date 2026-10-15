<script setup lang="ts">
import { computed, ref } from 'vue'
import { Stepper, type StepperStep } from '@/components/ui/Stepper'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(1)
const disabled = ref(true)
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
const disabled = ref(${disabled.value})
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
  <Stepper v-model="value" :steps="steps" :linear="false" :disabled="disabled" aria-label="Checkout progress" />
</template>`,
)
function reset() {
  value.value = 1
  disabled.value = true
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Disable navigation through every step."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="flex items-center gap-2"
        ><input v-model="disabled" type="checkbox" /> Disabled</label
      >
    </template>
    <Stepper
      v-model="value"
      :steps="steps"
      :linear="false"
      :disabled="disabled"
      aria-label="Checkout progress"
    />
  </ComponentExample>
</template>
