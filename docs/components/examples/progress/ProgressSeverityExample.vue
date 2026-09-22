<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const severities = ['primary', 'secondary', 'success', 'warning', 'error'] as const

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'

const severities = ['primary', 'secondary', 'success', 'warning', 'error'] as const
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-5">
    <div
      v-for="severity in severities"
      :key="severity"
      class="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4"
    >
      <span class="text-sm">{{ severity }}</span>
      <Progress :value="68" :severity="severity" :aria-label="'Progreso ' + severity" />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compara los colores semánticos disponibles para la barra."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-5">
      <div
        v-for="severity in severities"
        :key="severity"
        class="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4"
      >
        <span class="text-sm">{{ severity }}</span>
        <Progress :value="68" :severity="severity" :aria-label="'Progreso ' + severity" />
      </div>
    </div>
  </ComponentExample>
</template>
