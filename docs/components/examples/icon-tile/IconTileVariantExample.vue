<script setup lang="ts">
import { IconTile } from '@/components/ui/IconTile'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <IconTile icon-name="info" variant="solid" />
    <IconTile icon-name="info" variant="outline" />
    <IconTile icon-name="info" variant="elevated" />
    <IconTile icon-name="info" variant="frame" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variants"
    description="Compare the solid, outline, elevated, and framed surfaces."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <IconTile icon-name="info" variant="solid" />
      <IconTile icon-name="info" variant="outline" />
      <IconTile icon-name="info" variant="elevated" />
      <IconTile icon-name="info" variant="frame" />
    </div>
  </ComponentExample>
</template>
