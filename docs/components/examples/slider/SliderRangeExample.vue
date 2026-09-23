<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Slider } from '@/components/ui/Slider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref<[number, number]>([25, 75])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Slider } from '__DOCS_PACKAGE__/components/ui/Slider'

const value = ref<[number, number]>([25, 75])
${scriptEnd}

<template>
  <div class="grid w-full max-w-md gap-3">
    <Label id="price-range-label">Price range</Label>
    <Slider
      v-model:value="value"
      :min="0"
      :max="100"
      :step="5"
      :min-steps-between-thumbs="4"
      aria-labelledby="price-range-label"
      name="price"
      required
    />
    <output class="text-sm text-muted-foreground">
      {{ value[0] }} € – {{ value[1] }} €
    </output>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Min steps between thumbs"
    description="Use two thumbs, limits, and increments; minStepsBetweenThumbs sets their minimum distance."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-3">
      <Label id="price-range-label">Price range</Label>
      <Slider
        v-model:value="value"
        :min="0"
        :max="100"
        :step="5"
        :min-steps-between-thumbs="4"
        aria-labelledby="price-range-label"
        name="price"
        required
      />
      <output class="text-sm text-muted-foreground"> {{ value[0] }} € – {{ value[1] }} € </output>
    </div>
  </ComponentExample>
</template>
