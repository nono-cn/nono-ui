<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  RadioGroup,
  radioGroupDefaults,
  radioGroupSizes,
  type RadioGroupItem,
  type RadioGroupSize,
} from '@/components/ui/RadioGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Email', description: 'A digest every morning.', value: 'email' },
  { label: 'Push', description: 'Instant alerts on your phone.', value: 'push' },
]
const value = ref('email')
const size = ref<RadioGroupSize>(radioGroupDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Email', description: 'A digest every morning.', value: 'email' },
  { label: 'Push', description: 'Instant alerts on your phone.', value: 'push' },
]
const value = ref('${value.value}')
${scriptEnd}

<template>
  <RadioGroup v-model="value" :items="items" size="${size.value}" legend="Notifications" />
</template>`,
)

function reset() {
  value.value = 'email'
  size.value = radioGroupDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the radio, dot, icon, legend, and text size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="radioGroupSizes" />
    </template>
    <RadioGroup v-model="value" :items="items" :size="size" legend="Notifications" />
  </ComponentExample>
</template>
