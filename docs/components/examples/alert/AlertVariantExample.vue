<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <div class="grid w-full max-w-2xl gap-3">
    <Alert label="Solid" description="Solid style." variant="solid" severity="success" />
    <Alert label="Outline" description="Outlined style." variant="outline" severity="success" />
    <Alert label="Plain" description="No background or border." variant="plain" severity="success" />
    <Alert label="Subtle" description="Subtle background and border." variant="subtle" severity="success" />
    <Alert label="Soft" description="Subtle background." variant="soft" severity="success" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Compare the five available visual styles."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-3">
      <Alert label="Solid" description="Solid style." variant="solid" severity="success" />
      <Alert label="Outline" description="Outlined style." variant="outline" severity="success" />
      <Alert
        label="Plain"
        description="No background or border."
        variant="plain"
        severity="success"
      />
      <Alert
        label="Subtle"
        description="Subtle background and border."
        variant="subtle"
        severity="success"
      />
      <Alert label="Soft" description="Subtle background." variant="soft" severity="success" />
    </div>
  </ComponentExample>
</template>
