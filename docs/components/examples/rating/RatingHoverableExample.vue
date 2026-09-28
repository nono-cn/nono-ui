<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialRating = 2
const rating = ref(initialRating)

function reset() {
  rating.value = initialRating
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(2)
${scriptEnd}

<template>
  <Rating v-model="rating" hoverable aria-label="Rating" />
</template>`
</script>

<template>
  <ComponentExample
    title="Hoverable"
    description="Preview a rating by hovering over its stars."
    :code="code"
    @reset="reset"
  >
    <Rating v-model="rating" hoverable aria-label="Rating" />
  </ComponentExample>
</template>
