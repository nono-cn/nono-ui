<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  RadioGroup,
  radioGroupIndicators,
  radioGroupVariantNames,
  type RadioGroupIndicator,
  type RadioGroupItem,
  type RadioGroupVariant,
} from '@/components/ui/RadioGroup'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Like', value: 'like', icon: 'heart' },
  { label: 'Star', value: 'star', icon: 'star' },
  { label: 'Approve', value: 'approve', icon: 'check' },
]
const value = ref('star')
const indicator = ref<RadioGroupIndicator>('hidden')
const variant = ref<RadioGroupVariant>('table')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Like', value: 'like', icon: 'heart' },
  { label: 'Star', value: 'star', icon: 'star' },
  { label: 'Approve', value: 'approve', icon: 'check' },
]
const value = ref('${value.value}')
${scriptEnd}

<template>
  <RadioGroup
    v-model="value"
    :items="items"
    indicator="${indicator.value}"
    variant="${variant.value}"
    orientation="horizontal"
    legend="Reaction"
  />
</template>`,
)

function reset() {
  value.value = 'star'
  indicator.value = 'hidden'
  variant.value = 'table'
}
</script>

<template>
  <ComponentExample
    title="Indicator"
    description="Place the radio at the start or end, or hide it; item icons only show when it is hidden."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="indicator"
          label="Indicator"
          :options="radioGroupIndicators"
        />
        <ExampleSelectControl v-model="variant" label="Variant" :options="radioGroupVariantNames" />
      </div>
    </template>
    <RadioGroup
      v-model="value"
      :items="items"
      :indicator="indicator"
      :variant="variant"
      orientation="horizontal"
      legend="Reaction"
    />
  </ComponentExample>
</template>
