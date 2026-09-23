<script setup lang="ts">
import { IconTile } from '@/components/ui/IconTile'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <IconTile icon-name="info" variant="solid" severity="primary" />
    <IconTile icon-name="info" variant="solid" severity="secondary" />
    <IconTile icon-name="warning" variant="solid" severity="warning" />
    <IconTile icon-name="check" variant="solid" severity="success" />
    <IconTile icon-name="warning" variant="solid" severity="error" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose a semantic tone for the icon and tile."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <IconTile icon-name="info" variant="solid" severity="primary" />
      <IconTile icon-name="info" variant="solid" severity="secondary" />
      <IconTile icon-name="warning" variant="solid" severity="warning" />
      <IconTile icon-name="check" variant="solid" severity="success" />
      <IconTile icon-name="warning" variant="solid" severity="error" />
    </div>
  </ComponentExample>
</template>
