<script setup lang="ts">
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { AspectRatio } from '__DOCS_PACKAGE__/components/ui/AspectRatio'
<\/script>

<template>
  <AspectRatio :ratio="1" class="max-w-sm overflow-hidden rounded-lg border">
    <div class="grid size-full place-items-center bg-muted/40">Contenido adaptable</div>
  </AspectRatio>
</template>`
</script>

<template>
  <ComponentExample
    title="Contenido adaptable"
    description="Un contenedor cuadrado para contenido visual."
    :code="code"
    :show-reset="false"
  >
    <AspectRatio :ratio="1" class="w-full max-w-sm overflow-hidden rounded-lg border">
      <div class="grid size-full place-items-center bg-muted/40">Contenido adaptable</div>
    </AspectRatio>
  </ComponentExample>
</template>
