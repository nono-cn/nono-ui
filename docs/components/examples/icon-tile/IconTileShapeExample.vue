<script setup lang="ts">
import { IconTile } from '@/components/ui/IconTile'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <div class="flex items-center gap-4">
    <IconTile icon-name="info" shape="rounded" />
    <IconTile icon-name="info" shape="full" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Shape"
    description="Choose a rounded square or circle."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-4">
      <IconTile icon-name="info" shape="rounded" />
      <IconTile icon-name="info" shape="full" />
    </div>
  </ComponentExample>
</template>
