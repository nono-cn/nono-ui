<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Announcer } from '__DOCS_PACKAGE__/components/ui/Announcer'
${scriptEnd}

<template>
  <Announcer message="Changes saved successfully" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic message"
    description="Announce a message without adding visible content."
    :code="code"
    :show-reset="false"
  >
    <Announcer message="Changes saved successfully" />
    <span class="text-sm text-muted-foreground">The announcement is visually hidden.</span>
  </ComponentExample>
</template>
