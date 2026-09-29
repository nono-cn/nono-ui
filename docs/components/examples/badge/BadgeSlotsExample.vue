<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <Badge
    label="Fallback label"
    icon="info"
    trailing-icon="chevronRight"
  >
    <template #leading>
      <span aria-hidden="true">●</span>
    </template>
    <template #default>
      <span>In review</span>
    </template>
    <template #trailing>
      <span aria-hidden="true">→</span>
    </template>
  </Badge>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom slots"
    description="Replace the label and icon fallbacks with custom slot content."
    :code="code"
    :show-reset="false"
  >
    <Badge label="Fallback label" icon="info" trailing-icon="chevronRight">
      <template #leading>
        <span aria-hidden="true">●</span>
      </template>
      <template #default>
        <span>In review</span>
      </template>
      <template #trailing>
        <span aria-hidden="true">→</span>
      </template>
    </Badge>
  </ComponentExample>
</template>
