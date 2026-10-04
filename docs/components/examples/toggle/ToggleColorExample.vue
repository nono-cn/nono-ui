<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Toggle,
  toggleDefaults,
  toggleVariantNames,
  type ToggleVariant,
} from '@/components/ui/Toggle'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const variant = ref<ToggleVariant>(toggleDefaults.variant)
const colorChoice = ref<string>(toggleDefaults.color)
const customColor = ref('#8b5cf6')
const color = computed(() =>
  colorChoice.value === 'custom' ? customColor.value : colorChoice.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { Toggle } from '__DOCS_PACKAGE__/components/ui/Toggle'
${scriptEnd}

<template>
  <Toggle :model-value="true" variant="${variant.value}" color="${color.value}" label="Bold" aria-label="Toggle bold" />
</template>`,
)

function reset() {
  variant.value = toggleDefaults.variant
  colorChoice.value = toggleDefaults.color
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme or custom color with either variant."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="toggleVariantNames" />
        <ExampleSelectControl v-model="colorChoice" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="colorChoice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <Toggle
      :model-value="true"
      :variant="variant"
      :color="color"
      label="Bold"
      aria-label="Toggle bold"
    />
  </ComponentExample>
</template>
