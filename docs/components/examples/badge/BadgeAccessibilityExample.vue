<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Badge :icon="{ name: 'check' }" role="img" aria-label="Completado" />
    <Badge label="Actualizado" role="status" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Contenido y semántica"
    description="El texto visible es accesible por defecto. Usa un nombre ARIA para un badge compuesto solo por un icono y role=status cuando represente un estado dinámico."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Badge :icon="{ name: 'check' }" role="img" aria-label="Completado" />
      <Badge label="Actualizado" role="status" />
    </div>
  </ComponentExample>
</template>
