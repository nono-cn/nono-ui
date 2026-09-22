<script setup lang="ts">
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Marker } from '__DOCS_PACKAGE__/components/ui/Marker'
<\/script>

<template>
  <div class="grid w-full gap-2">
    <Marker variant="default" label="Valor actualizado" />
    <Marker variant="border" label="Última actualización: ahora" />
    <Marker variant="separator" label="Más información" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variantes"
    description="Adapta la separación visual al contexto del contenido."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-2">
      <Marker variant="default" label="Valor actualizado" />
      <Marker variant="border" label="Última actualización: ahora" />
      <Marker variant="separator" label="Más información" />
    </div>
  </ComponentExample>
</template>
