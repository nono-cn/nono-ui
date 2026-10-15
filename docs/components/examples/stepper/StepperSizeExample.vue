<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Stepper,
  stepperSizes,
  stepperOrientations,
  stepperDefaults,
  type StepperSize,
  type StepperStep,
} from '@/components/ui/Stepper'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(1)
const size = ref<StepperSize>(stepperDefaults.size)
const orientation = ref<(typeof stepperOrientations)[number]>(stepperDefaults.orientation)
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
  <Stepper v-model="value" :steps="steps" size="${size.value}" orientation="${orientation.value}" aria-label="Checkout progress">
    <template #content="{ item }">{{ item.description }}</template>
  </Stepper>
</template>`,
)
function reset() {
  value.value = 1
  size.value = stepperDefaults.size
  orientation.value = stepperDefaults.orientation
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Scale the indicators, icons, labels, descriptions, and spacing."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="stepperSizes" />
        <ExampleSelectControl
          v-model="orientation"
          label="Orientation"
          :options="stepperOrientations"
        />
      </div>
    </template>
    <Stepper
      v-model="value"
      :steps="steps"
      :size="size"
      :orientation="orientation"
      aria-label="Checkout progress"
    >
      <template #content="{ item }">{{ item.description }}</template>
    </Stepper>
  </ComponentExample>
</template>
