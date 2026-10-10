<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating, ratingDefaults, ratingSizes, type RatingSize } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<RatingSize>(ratingDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="3" size="${size.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  size.value = ratingDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the size and spacing of rating items."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleSelectControl v-model="size" label="Size" :options="ratingSizes"
    /></template>
    <Rating :model-value="3" :size="size" aria-label="Product rating" />
  </ComponentExample>
</template>
