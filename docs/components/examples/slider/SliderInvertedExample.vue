<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const normalValue = ref<[number]>([30])
const invertedValue = ref<[number]>([30])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const normalValue = ref<[number]>([30])
const invertedValue = ref<[number]>([30])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})
${scriptEnd}

<template>
  <div class="grid w-full max-w-md gap-5">
    <div class="grid gap-2">
      <Label id="normal-direction-label">Normal</Label>
      <Slider
        v-model:value="normalValue"
        :min="0"
        :max="100"
        :ui="sliderUi('normal-direction-label')"
      />
    </div>
    <div class="grid gap-2">
      <Label id="inverted-direction-label">Inverted</Label>
      <Slider
        v-model:value="invertedValue"
        :min="0"
        :max="100"
        inverted
        :ui="sliderUi('inverted-direction-label')"
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Inverted"
    description="The same value appears in opposite directions when inverted is enabled."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-5">
      <div class="grid gap-2">
        <Label id="normal-direction-label">Normal</Label>
        <Slider
          v-model:value="normalValue"
          :min="0"
          :max="100"
          :ui="sliderUi('normal-direction-label')"
        />
      </div>
      <div class="grid gap-2">
        <Label id="inverted-direction-label">Inverted</Label>
        <Slider
          v-model:value="invertedValue"
          :min="0"
          :max="100"
          inverted
          :ui="sliderUi('inverted-direction-label')"
        />
      </div>
    </div>
  </ComponentExample>
</template>
