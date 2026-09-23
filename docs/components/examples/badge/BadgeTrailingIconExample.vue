<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '__DOCS_PACKAGE__/components/ui/Badge'
${scriptEnd}

<template>
  <Badge label="Next" :trailing-icon="{ name: 'chevronRight' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="TrailingIcon"
    description="Add an icon at the end of the badge."
    :code="code"
    :show-reset="false"
  >
    <Badge label="Next" :trailing-icon="{ name: 'chevronRight' }" />
  </ComponentExample>
</template>
