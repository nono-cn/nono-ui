<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  buttonDefaults,
  buttonVariantNames,
  type ButtonVariant,
} from '@/components/ui/Button'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(buttonDefaults.color)
const customColor = ref('#6366f1')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const variant = ref<ButtonVariant>(buttonDefaults.variant)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const color = ref('${color.value}')
const variant = ref('${variant.value}' as const)
${scriptEnd}

<template>
  <Button label="Save changes" :color="color" :variant="variant" />
</template>`,
)

function reset() {
  selectedColor.value = buttonDefaults.color
  customColor.value = '#6366f1'
  variant.value = buttonDefaults.variant
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or a custom hexadecimal color, then select a visual style."
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
        <ExampleSelectControl v-model="variant" label="Variant" :options="buttonVariantNames" />
      </div>
    </template>
    <Button label="Save changes" :color="color" :variant="variant" />
  </ComponentExample>
</template>
