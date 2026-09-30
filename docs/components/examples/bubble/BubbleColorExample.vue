<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble, bubbleVariantNames, type BubbleVariant } from '@/components/ui/Bubble'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>('neutral')
const customColor = ref('#8b5cf6')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const variant = ref<BubbleVariant>('subtle')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Bubble, type BubbleVariant } from '__DOCS_PACKAGE__/components/ui/Bubble'

const color = ref('${color.value}')
const variant = ref<BubbleVariant>('${variant.value}')
${scriptEnd}

<template>
  <Bubble :color="color" :variant="variant">
    A message using the selected color.
  </Bubble>
</template>`,
)

function reset() {
  selectedColor.value = 'neutral'
  customColor.value = '#8b5cf6'
  variant.value = 'subtle'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or custom color, then select a visual style."
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
        <ExampleSelectControl v-model="variant" label="Variant" :options="bubbleVariantNames" />
      </div>
    </template>
    <Bubble :color="color" :variant="variant">A message using the selected color.</Bubble>
  </ComponentExample>
</template>
