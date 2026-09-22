<script setup lang="ts">
/* eslint-disable no-useless-escape -- The copyable snippet contains an escaped closing SFC tag. */
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const values = ref<[number][]>([[15], [30], [45], [60], [75]])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const values = ref<[number][]>([[15], [30], [45], [60], [75]])
const sliderUi = (labelId: string) => ({
  thumb: () => ({ 'aria-labelledby': labelId }),
})
<\/script>

<template>
  <div class="grid w-full max-w-lg gap-4">
    <div
      v-for="(size, index) in sizes"
      :key="size"
      class="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-4"
    >
      <Label :id="'slider-size-' + size">{{ size }}</Label>
      <Slider
        v-model:value="values[index]"
        :size="size"
        :min="0"
        :max="100"
        :ui="sliderUi('slider-size-' + size)"
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Compara los cinco tamaños disponibles."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-4">
      <div
        v-for="(size, index) in sizes"
        :key="size"
        class="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-4"
      >
        <Label :id="'slider-size-' + size">{{ size }}</Label>
        <Slider
          v-model:value="values[index]"
          :size="size"
          :min="0"
          :max="100"
          :ui="sliderUi('slider-size-' + size)"
        />
      </div>
    </div>
  </ComponentExample>
</template>
