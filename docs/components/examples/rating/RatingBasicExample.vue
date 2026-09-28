<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const rating = ref(3)

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(3)
${scriptEnd}

<template>
  <Rating v-model="rating" aria-label="Rating" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Choose a rating from one to five."
    :code="code"
    :show-reset="false"
  >
    <Rating v-model="rating" aria-label="Rating" />
  </ComponentExample>
</template>
