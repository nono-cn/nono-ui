<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
<\/script>

<template>
  <Message message="El diseño está listo para revisión.">
    <template #header><span class="text-xs text-muted-foreground">Ana · 10:32</span></template>
    <template #reaction><span aria-label="Me gusta">👍</span></template>
    <template #footer><span class="text-xs text-muted-foreground">Visto</span></template>
  </Message>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Añade metadatos y reacciones al mensaje."
    :code="code"
    :show-reset="false"
  >
    <Message message="El diseño está listo para revisión.">
      <template #header><span class="text-xs text-muted-foreground">Ana · 10:32</span></template>
      <template #reaction><span aria-label="Me gusta">👍</span></template>
      <template #footer><span class="text-xs text-muted-foreground">Visto</span></template>
    </Message>
  </ComponentExample>
</template>
