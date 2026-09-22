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
      <span class="text-sm">Normal</span>
      <Progress :value="32" aria-label="Progreso normal" />
    </div>
    <div class="grid gap-2">
      <span class="text-sm">Inverted</span>
      <Progress :value="32" inverted aria-label="Progreso invertido" />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Inverted"
    description="Compara la dirección normal de llenado con la dirección invertida."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-5">
      <div class="grid gap-2">
        <span class="text-sm">Normal</span>
        <Progress :value="32" aria-label="Progreso normal" />
      </div>
      <div class="grid gap-2">
        <span class="text-sm">Inverted</span>
        <Progress :value="32" inverted aria-label="Progreso invertido" />
      </div>
    </div>
  </ComponentExample>
</template>
