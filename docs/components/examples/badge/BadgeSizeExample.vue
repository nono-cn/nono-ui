<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge label="sm" size="sm" />
    <Badge label="md" size="md" />
    <Badge label="lg" size="lg" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Adjust the badge’s visual size and internal spacing."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Badge label="sm" size="sm" />
      <Badge label="md" size="md" />
      <Badge label="lg" size="lg" />
    </div>
  </ComponentExample>
</template>
