<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Kbd label="Ctrl" variant="solid" severity="primary" />
    <Kbd label="Alt" variant="solid" severity="secondary" />
    <Kbd label="Shift" variant="solid" severity="warning" />
    <Kbd label="Enter" variant="solid" severity="success" />
    <Kbd label="Esc" variant="solid" severity="error" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compara las severidades de la tecla usando la misma variante visual."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Kbd label="Ctrl" variant="solid" severity="primary" />
      <Kbd label="Alt" variant="solid" severity="secondary" />
      <Kbd label="Shift" variant="solid" severity="warning" />
      <Kbd label="Enter" variant="solid" severity="success" />
      <Kbd label="Esc" variant="solid" severity="error" />
    </div>
  </ComponentExample>
</template>
