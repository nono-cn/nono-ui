<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button label="Save changes" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Start with a button using the default severity and size."
    :code="code"
    :show-reset="false"
  >
    <Button label="Save changes" />
  </ComponentExample>
</template>
