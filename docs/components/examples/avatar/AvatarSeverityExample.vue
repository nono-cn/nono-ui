<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Avatar severity="primary" label="PR" />
    <Avatar severity="secondary" label="SE" />
    <Avatar severity="neutral" label="NE" />
    <Avatar severity="warning" label="WA" />
    <Avatar severity="success" label="SU" />
    <Avatar severity="error" label="ER" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose the text and icon color plus a soft background tint."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <Avatar severity="primary" label="PR" />
      <Avatar severity="secondary" label="SE" />
      <Avatar severity="neutral" label="NE" />
      <Avatar severity="warning" label="WA" />
      <Avatar severity="success" label="SU" />
      <Avatar severity="error" label="ER" />
    </div>
  </ComponentExample>
</template>
