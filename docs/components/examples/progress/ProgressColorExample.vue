<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-5">
    <div class="grid gap-2">
      <span class="text-sm">Color</span>
      <Progress :value="68" color="#7c3aed" aria-label="Progreso morado" />
    </div>
    <div class="grid gap-2">
      <span class="text-sm">Color y trackColor</span>
      <Progress
        :value="68"
        color="#0f766e"
        track-color="#ccfbf1"
        aria-label="Progreso verde azulado"
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Personaliza el indicador con color y define también un color propio para el track."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-5">
      <div class="grid gap-2">
        <span class="text-sm">Color</span>
        <Progress :value="68" color="#7c3aed" aria-label="Progreso morado" />
      </div>
      <div class="grid gap-2">
        <span class="text-sm">Color y trackColor</span>
        <Progress
          :value="68"
          color="#0f766e"
          track-color="#ccfbf1"
          aria-label="Progreso verde azulado"
        />
      </div>
    </div>
  </ComponentExample>
</template>
