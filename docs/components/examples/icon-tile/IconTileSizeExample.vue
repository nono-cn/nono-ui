<script setup lang="ts">
import { IconTile } from '@/components/ui/IconTile'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <IconTile icon-name="info" size="xs" />
    <IconTile icon-name="info" size="sm" />
    <IconTile icon-name="info" size="md" />
    <IconTile icon-name="info" size="lg" />
    <IconTile icon-name="info" size="xl" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Sizes"
    description="Scale the tile and icon together."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <IconTile icon-name="info" size="xs" />
      <IconTile icon-name="info" size="sm" />
      <IconTile icon-name="info" size="md" />
      <IconTile icon-name="info" size="lg" />
      <IconTile icon-name="info" size="xl" />
    </div>
  </ComponentExample>
</template>
