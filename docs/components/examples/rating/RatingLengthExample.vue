<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating, ratingDefaults } from '@/components/ui/Rating'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const options = ['3', '5', '7']
const length = ref(String(ratingDefaults.length))
const code = computed(
  () => `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="2" :length="${length.value}" aria-label="Product rating" />
</template>`,
)

function reset() {
  length.value = String(ratingDefaults.length)
}
</script>

<template>
  <ComponentExample
    title="Length"
    description="Set the number of rating items."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleSelectControl v-model="length" label="Length" :options="options"
    /></template>
    <Rating :model-value="2" :length="Number(length)" aria-label="Product rating" />
  </ComponentExample>
</template>
