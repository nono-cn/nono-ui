<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '@nono-cn/nono-ui/components/ui/Kbd'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Kbd label="Ctrl" variant="solid" severity="secondary" />
    <Kbd label="Alt" variant="outline" severity="secondary" />
    <Kbd label="Shift" variant="soft" severity="secondary" />
    <Kbd label="Enter" variant="subtle" severity="secondary" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Compara los tratamientos visuales de la tecla usando la misma severidad."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Kbd label="Ctrl" variant="solid" severity="secondary" />
      <Kbd label="Alt" variant="outline" severity="secondary" />
      <Kbd label="Shift" variant="soft" severity="secondary" />
      <Kbd label="Enter" variant="subtle" severity="secondary" />
    </div>
  </ComponentExample>
</template>
