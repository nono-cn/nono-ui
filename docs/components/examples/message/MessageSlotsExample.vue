<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${scriptEnd}

<template>
  <Message message="The design is ready for review.">
    <template #header><span class="text-xs text-muted-foreground">Ana · 10:32</span></template>
    <template #reaction><span aria-label="Like">👍</span></template>
    <template #footer><span class="text-xs text-muted-foreground">Seen</span></template>
  </Message>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Add metadata and reactions to the message."
    :code="code"
    :show-reset="false"
  >
    <Message message="The design is ready for review.">
      <template #header><span class="text-xs text-muted-foreground">Ana · 10:32</span></template>
      <template #reaction><span aria-label="Like">👍</span></template>
      <template #footer><span class="text-xs text-muted-foreground">Seen</span></template>
    </Message>
  </ComponentExample>
</template>
