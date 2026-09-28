<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const rating = ref(5)

function reset() {
  rating.value = 5
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(5)
${scriptEnd}

<template>
  <Rating v-model="rating" loop aria-label="Rating" />
</template>`
</script>

<template>
  <ComponentExample
    title="Loop"
    description="Focus the last star and press the Right Arrow key to return to the first."
    :code="code"
    @reset="reset"
  >
    <Rating v-model="rating" loop aria-label="Rating" />
  </ComponentExample>
</template>
