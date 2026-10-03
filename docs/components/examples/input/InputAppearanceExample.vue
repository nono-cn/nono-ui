<script setup lang="ts">
import { computed, ref } from 'vue'
import { Input, inputDefaults, inputVariantNames, type InputVariant } from '@/components/ui/Input'
import { themeColors } from '@/components/ui/constants'
import { Label } from '@/components/ui/Label'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<InputVariant>(inputDefaults.variant)
const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(inputDefaults.color)
const customColor = ref('#7c3aed')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const highlight = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
      <Label for="appearance-input">Appearance</Label>
      <Input id="appearance-input" variant="${variant.value}" color="${color.value}" :highlight="${highlight.value}" placeholder="Type here..." />
  </div>
</template>`,
)

function reset() {
  variant.value = inputDefaults.variant
  selectedColor.value = inputDefaults.color
  customColor.value = '#7c3aed'
  highlight.value = true
}
</script>

<template>
  <ComponentExample
    title="Appearance"
    description="Choose the variant, color, and highlighted border together."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="inputVariantNames" />
        <ExampleSelectControl v-model="selectedColor" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="selectedColor === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
        <ExampleCheckboxControl v-model="highlight" label="Highlight" />
      </div>
    </template>
    <div class="grid w-full max-w-lg gap-2">
      <Label for="appearance-input">Appearance</Label>
      <Input
        id="appearance-input"
        :variant="variant"
        :color="color"
        :highlight="highlight"
        placeholder="Type here..."
      />
    </div>
  </ComponentExample>
</template>
