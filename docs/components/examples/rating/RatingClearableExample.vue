<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialRating = 3
const rating = ref(initialRating)

function reset() {
  rating.value = initialRating
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(3)
${scriptEnd}

<template>
  <Rating v-model="rating" clearable aria-label="Rating" />
</template>`
</script>

<template>
  <ComponentExample
    title="Clearable"
    description="Click the selected rating again to clear it."
    :code="code"
    @reset="reset"
  >
    <Rating v-model="rating" clearable aria-label="Rating" />
  </ComponentExample>
</template>
