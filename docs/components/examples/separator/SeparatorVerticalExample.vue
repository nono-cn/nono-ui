<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
<\/script>

<template>
  <div class="flex h-16 w-full max-w-md items-center justify-center gap-4 rounded-lg border bg-card px-4">
    <span>General</span>
    <Separator orientation="vertical" />
    <span>Privacidad</span>
    <Separator orientation="vertical" />
    <span>Ayuda</span>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Separación vertical"
    description="Divide elementos dentro de un contenedor con borde que da contexto y altura al separador."
    :code="code"
    :show-reset="false"
  >
    <div
      class="flex h-16 w-full max-w-md items-center justify-center gap-4 rounded-lg border bg-card px-4"
    >
      <span>General</span>
      <Separator orientation="vertical" />
      <span>Privacidad</span>
      <Separator orientation="vertical" />
      <span>Ayuda</span>
    </div>
  </ComponentExample>
</template>
