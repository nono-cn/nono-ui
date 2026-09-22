<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge label="Solid" variant="solid" severity="primary" />
    <Badge label="Outline" variant="outline" severity="primary" />
    <Badge label="Plain" variant="plain" severity="primary" />
    <Badge label="Subtle" variant="subtle" severity="primary" />
    <Badge label="Soft" variant="soft" severity="primary" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Compara los tratamientos visuales del badge usando la misma severidad."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Badge label="Solid" variant="solid" severity="primary" />
      <Badge label="Outline" variant="outline" severity="primary" />
      <Badge label="Plain" variant="plain" severity="primary" />
      <Badge label="Subtle" variant="subtle" severity="primary" />
      <Badge label="Soft" variant="soft" severity="primary" />
    </div>
  </ComponentExample>
</template>
