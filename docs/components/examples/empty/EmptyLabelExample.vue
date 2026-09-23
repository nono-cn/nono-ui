<script setup lang="ts">
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Empty } from '__DOCS_PACKAGE__/components/ui/Empty'
${scriptEnd}

<template>
  <Empty class="w-full" label="No notifications" />
</template>`
</script>

<template>
  <ComponentExample
    title="Label"
    description="Set the main title of the empty state."
    :code="code"
    :show-reset="false"
  >
    <Empty class="w-full" label="No notifications" />
  </ComponentExample>
</template>
