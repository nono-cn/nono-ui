<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="Primary" variant="solid" severity="primary" />
    <Button label="Secondary" variant="solid" severity="secondary" />
    <Button label="Warning" variant="solid" severity="warning" />
    <Button label="Success" variant="solid" severity="success" />
    <Button label="Error" variant="solid" severity="error" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compara las severidades del botón usando la misma variante visual."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="Primary" variant="solid" severity="primary" />
      <Button label="Secondary" variant="solid" severity="secondary" />
      <Button label="Warning" variant="solid" severity="warning" />
      <Button label="Success" variant="solid" severity="success" />
      <Button label="Error" variant="solid" severity="error" />
    </div>
  </ComponentExample>
</template>
