<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const code = `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'

const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
${scriptEnd}

<template>
  <div class="grid w-full gap-3">
    <Bubble v-for="severity in severities" :key="severity" :severity="severity">{{ severity }}</Bubble>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compare the semantic severities."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3">
      <Bubble v-for="severity in severities" :key="severity" :severity="severity">{{
        severity
      }}</Bubble>
    </div>
  </ComponentExample>
</template>
