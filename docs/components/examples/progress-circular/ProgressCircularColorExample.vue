<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProgressCircular } from '@/components/ui/ProgressCircular'
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
import { ProgressCircular } from '__DOCS_PACKAGE__/components/ui/ProgressCircular'
${scriptEnd}

<template>
  <ProgressCircular :model-value="65" color="${color.value}" aria-label="Upload progress" />
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
    description="Choose a theme token or CSS color for the indicator and track."
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
    <ProgressCircular :model-value="65" :color="color" aria-label="Upload progress" />
  </ComponentExample>
</template>
