<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Kbd label="Ctrl" size="sm" />
    <Kbd label="Ctrl+K" size="md" />
    <Kbd label="Ctrl+Shift+P" size="lg" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Adjust the key’s visual size."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Kbd label="Ctrl" size="sm" />
      <Kbd label="Ctrl+K" size="md" />
      <Kbd label="Ctrl+Shift+P" size="lg" />
    </div>
  </ComponentExample>
</template>
