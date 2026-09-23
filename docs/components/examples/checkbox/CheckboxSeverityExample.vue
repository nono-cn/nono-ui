<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const code = `<script setup lang="ts">
import { Checkbox } from '__DOCS_PACKAGE__/components/ui/Checkbox'
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
${scriptEnd}
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
    description="Compare the available severity levels."
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
