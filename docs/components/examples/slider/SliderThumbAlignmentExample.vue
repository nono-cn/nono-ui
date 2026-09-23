<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const containedValue = ref<[number]>([0])
const overflowValue = ref<[number]>([0])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const containedValue = ref<[number]>([0])
const overflowValue = ref<[number]>([0])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})
${scriptEnd}

<template>
  <div class="grid w-full max-w-md gap-5">
    <div class="grid gap-2">
      <Label id="contained-thumb-label">Contain</Label>
      <Slider
        v-model:value="containedValue"
        :min="0"
        :max="100"
        thumb-alignment="contain"
        :ui="sliderUi('contained-thumb-label')"
      />
    </div>
    <div class="grid gap-2">
      <Label id="overflow-thumb-label">Overflow</Label>
      <Slider
        v-model:value="overflowValue"
        :min="0"
        :max="100"
        thumb-alignment="overflow"
        :ui="sliderUi('overflow-thumb-label')"
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Thumb alignment"
    description="Compare thumb behavior at the starting end of the track."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-5">
      <div class="grid gap-2">
        <Label id="contained-thumb-label">Contain</Label>
        <Slider
          v-model:value="containedValue"
          :min="0"
          :max="100"
          thumb-alignment="contain"
          :ui="sliderUi('contained-thumb-label')"
        />
      </div>
      <div class="grid gap-2">
        <Label id="overflow-thumb-label">Overflow</Label>
        <Slider
          v-model:value="overflowValue"
          :min="0"
          :max="100"
          thumb-alignment="overflow"
          :ui="sliderUi('overflow-thumb-label')"
        />
      </div>
    </div>
  </ComponentExample>
</template>
