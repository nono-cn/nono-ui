<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  RadioGroup,
  radioGroupDefaults,
  radioGroupOrientations,
  radioGroupVariantNames,
  type RadioGroupItem,
  type RadioGroupOrientation,
  type RadioGroupVariant,
} from '@/components/ui/RadioGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Hobby', description: 'For personal projects.', value: 'hobby' },
  { label: 'Pro', description: 'For small teams.', value: 'pro' },
  { label: 'Enterprise', description: 'For large organizations.', value: 'enterprise' },
]
const value = ref('pro')
const variant = ref<RadioGroupVariant>('card')
const orientation = ref<RadioGroupOrientation>(radioGroupDefaults.orientation)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Hobby', description: 'For personal projects.', value: 'hobby' },
  { label: 'Pro', description: 'For small teams.', value: 'pro' },
  { label: 'Enterprise', description: 'For large organizations.', value: 'enterprise' },
]
const value = ref('${value.value}')
${scriptEnd}

<template>
  <RadioGroup
    v-model="value"
    :items="items"
    variant="${variant.value}"
    orientation="${orientation.value}"
    legend="Plan"
  />
</template>`,
)

function reset() {
  value.value = 'pro'
  variant.value = 'card'
  orientation.value = radioGroupDefaults.orientation
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Show the options as a plain list, as separate cards, or as a joined table."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="radioGroupVariantNames" />
        <ExampleSelectControl
          v-model="orientation"
          label="Orientation"
          :options="radioGroupOrientations"
        />
      </div>
    </template>
    <RadioGroup
      v-model="value"
      :items="items"
      :variant="variant"
      :orientation="orientation"
      legend="Plan"
    />
  </ComponentExample>
</template>
