<script setup lang="ts">
/* eslint-disable no-useless-escape -- The copyable snippet contains an escaped closing SFC tag. */
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'

const value = ref<[number]>([65])
const sliderUi = {
  thumb: () => ({ 'aria-labelledby': 'vertical-slider-label' }),
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const value = ref<[number]>([65])
const sliderUi = {
  thumb: () => ({ 'aria-labelledby': 'vertical-slider-label' }),
}
<\/script>

<template>
  <div class="grid justify-items-center gap-3">
    <Label id="vertical-slider-label">Intensidad</Label>
    <div class="flex h-52 w-20 items-center justify-center rounded-lg border p-4">
      <Slider
        v-model:value="value"
        orientation="vertical"
        class="h-full"
        :ui="sliderUi"
      />
    </div>
    <output class="text-sm text-muted-foreground">{{ value[0] }} %</output>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="El contenedor define la altura disponible para el slider vertical."
    :code="code"
    :show-reset="false"
  >
    <div class="grid justify-items-center gap-3">
      <Label id="vertical-slider-label">Intensidad</Label>
      <div class="flex h-52 w-20 items-center justify-center rounded-lg border p-4">
        <Slider v-model:value="value" orientation="vertical" class="h-full" :ui="sliderUi" />
      </div>
      <output class="text-sm text-muted-foreground">{{ value[0] }} %</output>
    </div>
  </ComponentExample>
</template>
