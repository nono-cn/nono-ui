<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Textarea,
  textareaDefaults,
  textareaVariantNames,
  type TextareaVariant,
} from '@/components/ui/Textarea'
import { themeColors } from '@/components/ui/constants'
import { Label } from '@/components/ui/Label'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<TextareaVariant>(textareaDefaults.variant)
const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(textareaDefaults.color)
const customColor = ref('#7c3aed')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const highlight = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="appearance-textarea">Appearance</Label>
    <Textarea id="appearance-textarea" variant="${variant.value}" color="${color.value}" :highlight="${highlight.value}" placeholder="Write a message..." />
  </div>
</template>`,
)

function reset() {
  variant.value = textareaDefaults.variant
  selectedColor.value = textareaDefaults.color
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
        <ExampleSelectControl v-model="variant" label="Variant" :options="textareaVariantNames" />
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
      <Label for="appearance-textarea">Appearance</Label>
      <Textarea
        id="appearance-textarea"
        :variant="variant"
        :color="color"
        :highlight="highlight"
        placeholder="Write a message..."
      />
    </div>
  </ComponentExample>
</template>
