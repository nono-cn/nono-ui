<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  RadioGroup,
  radioGroupDefaults,
  radioGroupVariantNames,
  type RadioGroupItem,
  type RadioGroupVariant,
} from '@/components/ui/RadioGroup'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: RadioGroupItem[] = [
  { label: 'Public', description: 'Anyone can see this project.', value: 'public' },
  { label: 'Private', description: 'Only members can see it.', value: 'private' },
]
const value = ref('private')
const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(radioGroupDefaults.color)
const customColor = ref('#8b5cf6')
const variant = ref<RadioGroupVariant>(radioGroupDefaults.variant)
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupItem } from '__DOCS_PACKAGE__/components/ui/RadioGroup'

const items: RadioGroupItem[] = [
  { label: 'Public', description: 'Anyone can see this project.', value: 'public' },
  { label: 'Private', description: 'Only members can see it.', value: 'private' },
]
const value = ref('${value.value}')
${scriptEnd}

<template>
  <RadioGroup
    v-model="value"
    :items="items"
    color="${color.value}"
    variant="${variant.value}"
    legend="Visibility"
  />
</template>`,
)

function reset() {
  value.value = 'private'
  selectedColor.value = radioGroupDefaults.color
  customColor.value = '#8b5cf6'
  variant.value = radioGroupDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or a custom CSS color for the checked radio, focus ring, and selected card."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedColor" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="selectedColor === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
        <ExampleSelectControl v-model="variant" label="Variant" :options="radioGroupVariantNames" />
      </div>
    </template>
    <RadioGroup
      v-model="value"
      :items="items"
      :color="color"
      :variant="variant"
      legend="Visibility"
    />
  </ComponentExample>
</template>
