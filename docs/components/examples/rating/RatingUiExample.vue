<script setup lang="ts">
import { ref } from 'vue'
import { Rating, type RatingUI } from '@/components/ui/Rating'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const rating = ref(3)
const ui: RatingUI = {
  item: () => ({ class: 'rounded-md bg-error/15 ring-1 ring-error/40' }),
  indicator: () => ({
    class: 'hover:bg-error/20 focus-visible:ring-4 focus-visible:ring-error/60',
  }),
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Rating, type RatingUI } from '__DOCS_PACKAGE__/components/ui/Rating'

const rating = ref(3)
const ui: RatingUI = {
  item: () => ({ class: 'rounded-md bg-error/15 ring-1 ring-error/40' }),
  indicator: () => ({ class: 'hover:bg-error/20 focus-visible:ring-4 focus-visible:ring-error/60' }),
}
${scriptEnd}

<template>
  <Rating v-model="rating" :ui="ui" aria-label="Rating" />
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the item and indicator elements."
    :code="code"
    :show-reset="false"
  >
    <Rating v-model="rating" :ui="ui" aria-label="Rating" />
  </ComponentExample>
</template>
