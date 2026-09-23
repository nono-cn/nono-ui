<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '__DOCS_PACKAGE__/components/ui/Kbd'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Kbd label="Ctrl" color="#6366f1" />
    <Kbd label="Alt" color="#22c55e" />
    <Kbd label="Enter" color="#f97316" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Apply a custom CSS color with calculated text contrast."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Kbd label="Ctrl" color="#6366f1" />
      <Kbd label="Alt" color="#22c55e" />
      <Kbd label="Enter" color="#f97316" />
    </div>
  </ComponentExample>
</template>
