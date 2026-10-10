<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Rating,
  ratingDefaults,
  ratingOrientations,
  type RatingProps,
} from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const orientation = ref<NonNullable<RatingProps['orientation']>>(ratingDefaults.orientation)
const code = computed(
  () => `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="3" orientation="${orientation.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  orientation.value = ratingDefaults.orientation
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Lay out items horizontally or vertically."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleSelectControl
        v-model="orientation"
        label="Orientation"
        :options="ratingOrientations"
    /></template>
    <Rating :model-value="3" :orientation="orientation" aria-label="Product rating" />
  </ComponentExample>
</template>
