<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge label="Primary" variant="solid" severity="primary" />
    <Badge label="Neutral" variant="solid" severity="neutral" />
    <Badge label="Secondary" variant="solid" severity="secondary" />
    <Badge label="Warning" variant="solid" severity="warning" />
    <Badge label="Success" variant="solid" severity="success" />
    <Badge label="Error" variant="solid" severity="error" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compare badge severities using the same visual variant."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Badge label="Primary" variant="solid" severity="primary" />
      <Badge label="Neutral" variant="solid" severity="neutral" />
      <Badge label="Secondary" variant="solid" severity="secondary" />
      <Badge label="Warning" variant="solid" severity="warning" />
      <Badge label="Success" variant="solid" severity="success" />
      <Badge label="Error" variant="solid" severity="error" />
    </div>
  </ComponentExample>
</template>
