<script setup lang="ts">
import { computed, ref } from 'vue'
import { Slider, type SliderUI } from '@/components/ui/Slider'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref([20, 70])
const square = ref(true)
const labelThumbs = ref(true)
const trackClass = computed(() => (square.value ? 'rounded-none' : ''))
const thumbClass = computed(() => (square.value ? 'rounded-sm' : ''))
const ui = computed<SliderUI>(() => ({
  track: () => ({ class: trackClass.value }),
  thumb: ({ index }) => ({
    class: thumbClass.value,
    'aria-label': labelThumbs.value ? (index === 0 ? 'Price from' : 'Price to') : undefined,
  }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Slider, type SliderUI } from '__DOCS_PACKAGE__/components/ui/Slider'

const value = ref([${value.value.join(', ')}])
const ui: SliderUI = {
  track: () => ({ class: '${trackClass.value}' }),
  thumb: ({ index }) => ({
    class: '${thumbClass.value}',
    'aria-label': ${labelThumbs.value ? `index === 0 ? 'Price from' : 'Price to'` : 'undefined'},
  }),
}
${scriptEnd}

<template>
  <Slider v-model="value" :ui="ui" />
</template>`,
)

function reset() {
  value.value = [20, 70]
  square.value = true
  labelThumbs.value = true
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the track, the range, and each thumb using the slider context or the context of each thumb."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="square" label="Square shapes" />
        <ExampleCheckboxControl v-model="labelThumbs" label="Name thumbs" />
      </div>
    </template>
    <div class="w-full max-w-md">
      <Slider v-model="value" :ui="ui" />
    </div>
  </ComponentExample>
</template>
