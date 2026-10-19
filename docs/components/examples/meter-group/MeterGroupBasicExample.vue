<script setup lang="ts">
import { MeterGroup, type MeterGroupItem } from '@/components/ui/MeterGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]
const code = `<script setup lang="ts">
import { MeterGroup, type MeterGroupItem } from '__DOCS_PACKAGE__/components/ui/MeterGroup'

const items: MeterGroupItem[] = [
  { label: 'Apps', value: 18 },
  { label: 'Photos', value: 24, color: 'success' },
  { label: 'Videos', value: 16, color: 'warning' },
]
${scriptEnd}

<template>
  <MeterGroup :items="items" class="w-full max-w-md" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show several values that share one track, with a legend for each item."
    :code="code"
    :show-reset="false"
  >
    <MeterGroup :items="items" class="w-full max-w-md" />
  </ComponentExample>
</template>
