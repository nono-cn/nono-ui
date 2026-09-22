<script setup lang="ts">
/* eslint-disable no-useless-escape -- The copyable snippet contains an escaped closing SFC tag. */
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'

const enabledValue = ref<[number]>([55])
const disabledValue = ref<[number]>([55])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const enabledValue = ref<[number]>([55])
const disabledValue = ref<[number]>([55])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})
<\/script>

<template>
  <div class="grid w-full max-w-md gap-5">
    <div class="grid gap-2">
      <Label id="enabled-slider-label">Interactivo</Label>
      <Slider v-model:value="enabledValue" :ui="sliderUi('enabled-slider-label')" />
    </div>
    <div class="grid gap-2">
      <Label id="disabled-slider-label">Deshabilitado</Label>
      <Slider
        v-model:value="disabledValue"
        disabled
        :ui="sliderUi('disabled-slider-label')"
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="La prop disabled bloquea la interacción con todos los thumbs."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-5">
      <div class="grid gap-2">
        <Label id="enabled-slider-label">Interactivo</Label>
        <Slider v-model:value="enabledValue" :ui="sliderUi('enabled-slider-label')" />
      </div>
      <div class="grid gap-2">
        <Label id="disabled-slider-label">Deshabilitado</Label>
        <Slider v-model:value="disabledValue" disabled :ui="sliderUi('disabled-slider-label')" />
      </div>
    </div>
  </ComponentExample>
</template>
