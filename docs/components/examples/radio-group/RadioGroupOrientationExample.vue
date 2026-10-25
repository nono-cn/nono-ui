<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  RadioGroup,
  radioGroupOrientations,
  type RadioGroupItem,
  type RadioGroupOrientation,
} from '@/components/ui/RadioGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
]
const orientation = ref<RadioGroupOrientation>('horizontal')
const code = computed(
  () => `<script setup lang="ts">
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
]
${scriptEnd}

<template>
  <RadioGroup :items="items" orientation="${orientation.value}" legend="Size" />
</template>`,
)

function reset() {
  orientation.value = 'horizontal'
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Lay the options out vertically or horizontally; arrow keys follow the orientation."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="orientation"
        label="Orientation"
        :options="radioGroupOrientations"
      />
    </template>
    <RadioGroup :items="items" :orientation="orientation" legend="Size" />
  </ComponentExample>
</template>
