<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'
${scriptEnd}

<template>
  <Bubble color="#8b5cf6">Bubble with a custom color</Bubble>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Apply a custom CSS color."
    :code="code"
    :show-reset="false"
  >
    <Bubble color="#8b5cf6">Bubble with a custom color</Bubble>
  </ComponentExample>
</template>
