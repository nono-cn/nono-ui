<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const samples = [
  { label: 'Preparing', value: 20 },
  { label: 'Processing', value: 65 },
  { label: 'Waiting', value: null },
]

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'

const samples = [
  { label: 'Preparing', value: 20 },
  { label: 'Processing', value: 65 },
  { label: 'Waiting', value: null },
]
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-5">
    <div v-for="sample in samples" :key="sample.label" class="grid gap-2">
      <span class="text-sm">{{ sample.label }}</span>
      <Progress :value="sample.value" :aria-label="sample.label" />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Value"
    description="Use a number for determinate progress and null for indeterminate progress."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-5">
      <div v-for="sample in samples" :key="sample.label" class="grid gap-2">
        <span class="text-sm">{{ sample.label }}</span>
        <Progress :value="sample.value" :aria-label="sample.label" />
      </div>
    </div>
  </ComponentExample>
</template>
