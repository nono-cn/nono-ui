<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Kbd label="Ctrl" variant="subtle" severity="primary" />
    <Kbd label="Meta" variant="subtle" severity="neutral" />
    <Kbd label="Alt" variant="subtle" severity="secondary" />
    <Kbd label="Shift" variant="subtle" severity="warning" />
    <Kbd label="Enter" variant="subtle" severity="success" />
    <Kbd label="Esc" variant="subtle" severity="error" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compare severity levels using the default subtle variant."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Kbd label="Ctrl" variant="subtle" severity="primary" />
      <Kbd label="Meta" variant="subtle" severity="neutral" />
      <Kbd label="Alt" variant="subtle" severity="secondary" />
      <Kbd label="Shift" variant="subtle" severity="warning" />
      <Kbd label="Enter" variant="subtle" severity="success" />
      <Kbd label="Esc" variant="subtle" severity="error" />
    </div>
  </ComponentExample>
</template>
