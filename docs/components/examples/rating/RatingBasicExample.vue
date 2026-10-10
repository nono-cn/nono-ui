<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(3)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const value = ref(${value.value})
${scriptEnd}

<template>
  <Rating v-model="value" aria-label="Product rating" />
</template>`,
)

function reset() {
  value.value = 3
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Choose a rating from one to five."
    :code="code"
    @reset="reset"
  >
    <Rating v-model="value" aria-label="Product rating" />
  </ComponentExample>
</template>
