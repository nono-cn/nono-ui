<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

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
${scriptEnd}

<template>
  <div class="grid w-full max-w-md gap-5">
    <div class="grid gap-2">
      <Label id="enabled-slider-label">Interactive</Label>
      <Slider v-model:value="enabledValue" :ui="sliderUi('enabled-slider-label')" />
    </div>
    <div class="grid gap-2">
      <Label id="disabled-slider-label">Disabled</Label>
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
    description="The disabled prop prevents interaction with all thumbs."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-5">
      <div class="grid gap-2">
        <Label id="enabled-slider-label">Interactive</Label>
        <Slider v-model:value="enabledValue" :ui="sliderUi('enabled-slider-label')" />
      </div>
      <div class="grid gap-2">
        <Label id="disabled-slider-label">Disabled</Label>
        <Slider v-model:value="disabledValue" disabled :ui="sliderUi('disabled-slider-label')" />
      </div>
    </div>
  </ComponentExample>
</template>
