<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider } from '@/components/ui/Slider'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const choice = ref('primary')
const customColor = ref('#8b5cf6')
const color = computed(() => (choice.value === 'custom' ? customColor.value : choice.value))
const code = computed(
  () => `<script setup lang="ts">
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'
${scriptEnd}

<template>
  <Slider :model-value="[25, 75]" color="${color.value}" />
</template>`,
)

function reset() {
  choice.value = 'primary'
  customColor.value = '#8b5cf6'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or CSS color for the track, range, and thumbs."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="choice" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="choice === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <div class="w-full max-w-md">
      <Slider :model-value="[25, 75]" :color="color" />
    </div>
  </ComponentExample>
</template>
