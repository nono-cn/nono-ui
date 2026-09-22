<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
<\/script>
<template>
  <Checkbox
    v-for="severity in severities"
    :key="severity"
    :severity="severity"
    :value="true"
    :aria-label="severity"
  />
</template>`
</script>
<template>
  <ComponentExample
    title="Severity"
    description="Compara las severidades disponibles."
    :code="code"
    :show-reset="false"
    ><div class="flex items-center gap-4">
      <Checkbox
        v-for="severity in severities"
        :key="severity"
        :severity="severity"
        :value="true"
        :aria-label="severity"
      /></div
  ></ComponentExample>
</template>
