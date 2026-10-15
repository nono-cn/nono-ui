<script setup lang="ts">
import { computed, ref } from 'vue'
import { Stepper, type StepperStep } from '@/components/ui/Stepper'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'

const value = ref(1)
const colors = [...themeColors, 'custom']
const choice = ref('primary')
const customColor = ref('#8b5cf6')
const color = computed(() => (choice.value === 'custom' ? customColor.value : choice.value))
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
const color = ref(${JSON.stringify(color.value)})
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
  <Stepper v-model="value" :steps="steps" :color="color" aria-label="Checkout progress" />
</template>`,
)
function reset() {
  value.value = 1
  choice.value = 'primary'
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or custom CSS color for active and completed steps."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="choice" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="choice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <Stepper v-model="value" :steps="steps" :color="color" aria-label="Checkout progress" />
  </ComponentExample>
</template>
