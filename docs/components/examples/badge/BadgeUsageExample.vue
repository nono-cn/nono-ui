<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <Badge label="Active" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Start with a badge using its default configuration."
    :code="code"
    :show-reset="false"
  >
    <Badge label="Active" />
  </ComponentExample>
</template>
