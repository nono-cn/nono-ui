<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Kbd label="Ctrl" variant="solid" severity="neutral" />
    <Kbd label="Alt" variant="outline" severity="neutral" />
    <Kbd label="Shift" variant="soft" severity="neutral" />
    <Kbd label="Enter" variant="subtle" severity="neutral" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Compare visual variants using the default neutral severity."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Kbd label="Ctrl" variant="solid" severity="neutral" />
      <Kbd label="Alt" variant="outline" severity="neutral" />
      <Kbd label="Shift" variant="soft" severity="neutral" />
      <Kbd label="Enter" variant="subtle" severity="neutral" />
    </div>
  </ComponentExample>
</template>
