<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :value="37" :max="50" aria-label="Sincronización">
    <template #label="{ value, max, percentage }">
      {{ value }} / {{ max }} ({{ Math.round(percentage) }}%)
    </template>
  </Progress>
</template>`
</script>

<template>
  <ComponentExample
    title="Label"
    description="Usa el slot label para mostrar el contexto del progreso con un formato propio."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-md">
      <Progress :value="37" :max="50" aria-label="Sincronización">
        <template #label="{ value, max, percentage }">
          {{ value }} / {{ max }} ({{ Math.round(percentage) }}%)
        </template>
      </Progress>
    </div>
  </ComponentExample>
</template>
