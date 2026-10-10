<script setup lang="ts">
import { computed, ref } from 'vue'
import { Rating, type RatingUI } from '@/components/ui/Rating'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const highlight = ref(true)
const ui = computed<RatingUI>(() => ({
  item: ({ item }) => ({
    'data-item': item,
    class: highlight.value ? 'rounded-md bg-primary/10' : '',
  }),
  indicator: ({ step }) => ({
    'aria-label': `Rate ${step} stars`,
    class: highlight.value ? 'rounded-md' : '',
  }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { Rating, type RatingUI } from '__DOCS_PACKAGE__/components/ui/Rating'

const ui: RatingUI = {
  item: ({ item }) => ({ 'data-item': item, class: '${highlight.value ? 'rounded-md bg-primary/10' : ''}' }),
  indicator: ({ step }) => ({ 'aria-label': \`Rate \${step} stars\`, class: '${highlight.value ? 'rounded-md' : ''}' }),
}
${scriptEnd}

<template>
  <Rating :model-value="3" :ui="ui" aria-label="Product rating" />
</template>`,
)

function reset() {
  highlight.value = true
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize each item and indicator using their context."
    :code="code"
    @reset="reset"
  >
    <template #controls
      ><ExampleCheckboxControl v-model="highlight" label="Highlight items"
    /></template>
    <Rating :model-value="3" :ui="ui" aria-label="Product rating" />
  </ComponentExample>
</template>
