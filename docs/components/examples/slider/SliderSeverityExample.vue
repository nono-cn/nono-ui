<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities = ['primary', 'secondary', 'success', 'warning', 'error'] as const
const values = ref<[number][]>([[15], [30], [45], [60], [75]])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const severities = ['primary', 'secondary', 'success', 'warning', 'error'] as const
const values = ref<[number][]>([[15], [30], [45], [60], [75]])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-4">
    <div
      v-for="(severity, index) in severities"
      :key="severity"
      class="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4"
    >
      <Label :id="'slider-severity-' + severity">{{ severity }}</Label>
      <Slider
        v-model:value="values[index]"
        :severity="severity"
        :min="0"
        :max="100"
        :ui="sliderUi('slider-severity-' + severity)"
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compare the available semantic colors for the selected value."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-4">
      <div
        v-for="(severity, index) in severities"
        :key="severity"
        class="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4"
      >
        <Label :id="'slider-severity-' + severity">{{ severity }}</Label>
        <Slider
          v-model:value="values[index]"
          :severity="severity"
          :min="0"
          :max="100"
          :ui="sliderUi('slider-severity-' + severity)"
        />
      </div>
    </div>
  </ComponentExample>
</template>
