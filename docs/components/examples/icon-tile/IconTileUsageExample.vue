<script setup lang="ts">
import { IconTile } from '@/components/ui/IconTile'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { IconTile } from '__DOCS_PACKAGE__/components/ui/IconTile'
${scriptEnd}

<template>
  <IconTile icon="info" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Display an icon in a consistent square surface."
    :code="code"
    :show-reset="false"
  >
    <IconTile icon="info" />
  </ComponentExample>
</template>
