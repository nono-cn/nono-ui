<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble, bubbleDefaults, bubbleSizes, type BubbleSize } from '@/components/ui/Bubble'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<BubbleSize>(bubbleDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'
${scriptEnd}

<template>
  <Bubble size="${size.value}">Hi, how is the project going?</Bubble>
</template>`,
)

function reset() {
  size.value = bubbleDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the padding and text size of the bubble."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="bubbleSizes" />
    </template>
    <Bubble :size="size">Hi, how is the project going?</Bubble>
  </ComponentExample>
</template>
