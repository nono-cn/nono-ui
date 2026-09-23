<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Announcer } from '__DOCS_PACKAGE__/components/ui/Announcer'
${scriptEnd}

<template>
  <Announcer politeness="polite">
    <strong>Sync complete.</strong>
  </Announcer>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom content"
    description="The default slot lets you control the announced content."
    :code="code"
    :show-reset="false"
  >
    <Announcer politeness="polite">
      <strong>Sync complete.</strong>
    </Announcer>
    <span class="text-sm text-muted-foreground"
      >With a slot, the content is also displayed visually.</span
    >
  </ComponentExample>
</template>
