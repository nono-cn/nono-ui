<script setup lang="ts">
/* eslint-disable no-useless-escape -- The copyable snippet contains an escaped closing SFC tag. */
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'

const value = ref<[number]>([62])
const sliderUi = {
  thumb: () => ({ 'aria-labelledby': 'temperature-label' }),
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const value = ref<[number]>([62])
const sliderUi = {
  thumb: () => ({ 'aria-labelledby': 'temperature-label' }),
}
<\/script>

<template>
  <div class="grid w-full max-w-md gap-3">
    <div class="flex items-center justify-between gap-3">
      <Label id="temperature-label">Temperatura</Label>
      <output class="text-sm text-muted-foreground">{{ value[0] }} °C</output>
    </div>
    <Slider
      v-model:value="value"
      :min="0"
      :max="100"
      color="#f97316"
      severity="secondary"
      :ui="sliderUi"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="La prop color aplica un color CSS y tiene prioridad sobre severity."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-3">
      <div class="flex items-center justify-between gap-3">
        <Label id="temperature-label">Temperatura</Label>
        <output class="text-sm text-muted-foreground">{{ value[0] }} °C</output>
      </div>
      <Slider
        v-model:value="value"
        :min="0"
        :max="100"
        color="#f97316"
        severity="secondary"
        :ui="sliderUi"
      />
    </div>
  </ComponentExample>
</template>
