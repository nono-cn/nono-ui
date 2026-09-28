<script setup lang="ts">
import { Rating } from '@/components/ui/Rating'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
${scriptEnd}

<template>
  <Rating :model-value="3" disabled aria-label="Rating" />
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Display a rating without allowing changes."
    :code="code"
    :show-reset="false"
  >
    <Rating :model-value="3" disabled aria-label="Rating" />
  </ComponentExample>
</template>
