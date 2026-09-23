<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

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
${scriptEnd}

<template>
  <div class="grid justify-items-center gap-3">
    <Label id="vertical-slider-label">Intensity</Label>
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
    description="The container defines the available height for the vertical slider."
    :code="code"
    :show-reset="false"
  >
    <div class="grid justify-items-center gap-3">
      <Label id="vertical-slider-label">Intensity</Label>
      <div class="flex h-52 w-20 items-center justify-center rounded-lg border p-4">
        <Slider v-model:value="value" orientation="vertical" class="h-full" :ui="sliderUi" />
      </div>
      <output class="text-sm text-muted-foreground">{{ value[0] }} %</output>
    </div>
  </ComponentExample>
</template>
