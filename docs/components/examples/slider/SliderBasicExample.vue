<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref<[number]>([35])
const sliderUi = {
  thumb: () => ({ 'aria-labelledby': 'volume-label' }),
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const value = ref<[number]>([35])
const sliderUi = {
  thumb: () => ({ 'aria-labelledby': 'volume-label' }),
}
${scriptEnd}

<template>
  <div class="grid w-full max-w-md gap-3">
    <div class="flex items-center justify-between gap-3">
      <Label id="volume-label">Volume</Label>
      <output class="text-sm text-muted-foreground">{{ value[0] }} %</output>
    </div>
    <Slider
      v-model:value="value"
      :min="0"
      :max="100"
      :step="5"
      :ui="sliderUi"
      name="volume"
      required
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Value"
    description="Bind a value, provide an accessible name, and display the selected value."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-3">
      <div class="flex items-center justify-between gap-3">
        <Label id="volume-label">Volume</Label>
        <output class="text-sm text-muted-foreground">{{ value[0] }} %</output>
      </div>
      <Slider
        v-model:value="value"
        :min="0"
        :max="100"
        :step="5"
        :ui="sliderUi"
        name="volume"
        required
      />
    </div>
  </ComponentExample>
</template>
