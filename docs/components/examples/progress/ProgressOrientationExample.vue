<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <div class="flex w-full max-w-lg flex-wrap items-end justify-between gap-8">
    <div class="grid min-w-48 flex-1 gap-3">
      <span class="text-sm">Horizontal</span>
      <Progress :value="68" aria-label="Progreso horizontal" />
    </div>
    <div class="grid justify-items-center gap-3">
      <span class="text-sm">Vertical</span>
      <div class="h-40">
        <Progress :value="68" orientation="vertical" aria-label="Progreso vertical" />
      </div>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Muestra el progreso horizontal y vertical; el contenedor vertical define la altura."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full max-w-lg flex-wrap items-end justify-between gap-8">
      <div class="grid min-w-48 flex-1 gap-3">
        <span class="text-sm">Horizontal</span>
        <Progress :value="68" aria-label="Progreso horizontal" />
      </div>
      <div class="grid justify-items-center gap-3">
        <span class="text-sm">Vertical</span>
        <div class="h-40">
          <Progress :value="68" orientation="vertical" aria-label="Progreso vertical" />
        </div>
      </div>
    </div>
  </ComponentExample>
</template>
