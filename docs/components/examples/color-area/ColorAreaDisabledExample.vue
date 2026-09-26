<script setup lang="ts">
import { ColorArea } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'
${scriptEnd}

<template>
  <ColorArea disabled />
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Disable interaction with the color area."
    :code="code"
    :show-reset="false"
  >
    <ColorArea disabled />
  </ComponentExample>
</template>
