<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Announcer } from '__DOCS_PACKAGE__/components/ui/Announcer'
${scriptEnd}

<template>
  <div class="grid gap-2">
    <Announcer message="Informational update" politeness="polite" />
    <Announcer message="Urgent alert" politeness="assertive" />
    <Announcer message="No announcement" politeness="off" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Politeness"
    description="Compare polite, assertive, and off."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-2 text-sm text-muted-foreground">
      <Announcer message="Informational update" politeness="polite" />
      <Announcer message="Urgent alert" politeness="assertive" />
      <Announcer message="No announcement" politeness="off" />
      <span>Announcements remain visually hidden.</span>
    </div>
  </ComponentExample>
</template>
