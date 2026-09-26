<script setup lang="ts">
import { ColorArea } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'
${scriptEnd}

<template>
  <ColorArea />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Render a color area with its default value."
    :code="code"
    :show-reset="false"
  >
    <ColorArea />
  </ComponentExample>
</template>
