<script setup lang="ts">
import { IconTile } from '@/components/ui/IconTile'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <IconTile icon-name="info" variant="solid" color="#7c3aed" />
    <IconTile icon-name="check" variant="solid" color="#0891b2" />
    <IconTile icon-name="warning" variant="solid" color="#ea580c" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Set different custom colors on individual tiles."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <IconTile icon-name="info" variant="solid" color="#7c3aed" />
      <IconTile icon-name="check" variant="solid" color="#0891b2" />
      <IconTile icon-name="warning" variant="solid" color="#ea580c" />
    </div>
  </ComponentExample>
</template>
