<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'
${scriptEnd}

<template>
  <Kbd label="Ctrl" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Start by displaying a key with its visible label."
    :code="code"
    :show-reset="false"
  >
    <Kbd label="Ctrl" />
  </ComponentExample>
</template>
