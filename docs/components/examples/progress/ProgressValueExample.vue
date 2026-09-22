<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const samples = [
  { label: 'Preparación', value: 20 },
  { label: 'Procesando', value: 65 },
  { label: 'Esperando', value: null },
]

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'

const samples = [
  { label: 'Preparación', value: 20 },
  { label: 'Procesando', value: 65 },
  { label: 'Esperando', value: null },
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
    description="Usa un número para el progreso determinado y null para el indeterminado."
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
