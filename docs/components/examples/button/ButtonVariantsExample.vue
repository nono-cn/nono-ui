<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="Solid" variant="solid" severity="primary" />
    <Button label="Outline" variant="outline" severity="primary" />
    <Button label="Plain" variant="plain" severity="primary" />
    <Button label="Subtle" variant="subtle" severity="primary" />
    <Button label="Soft" variant="soft" severity="primary" />
    <Button label="Link" variant="link" severity="primary" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Compara las variantes visuales del botón usando la misma severidad."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="Solid" variant="solid" severity="primary" />
      <Button label="Outline" variant="outline" severity="primary" />
      <Button label="Plain" variant="plain" severity="primary" />
      <Button label="Subtle" variant="subtle" severity="primary" />
      <Button label="Soft" variant="soft" severity="primary" />
      <Button label="Link" variant="link" severity="primary" />
    </div>
  </ComponentExample>
</template>
