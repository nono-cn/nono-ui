<script setup lang="ts">
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Empty } from '__DOCS_PACKAGE__/components/ui/Empty'
${scriptEnd}

<template>
  <Empty
    class="w-full"
    description="Try changing the filters to find content."
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Description"
    description="Add supporting information to the empty state."
    :code="code"
    :show-reset="false"
  >
    <Empty class="w-full" description="Try changing the filters to find content." />
  </ComponentExample>
</template>
