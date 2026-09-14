<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button
      aria-label="Eliminar elemento"
      :icon="{ name: 'trash2' }"
      severity="error"
      square
    />
    <Button label="Guardar" :loading="true" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Acciones accesibles"
    description="Los botones solo con icono necesitan un nombre accesible y los botones en carga comunican su estado."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button aria-label="Eliminar elemento" :icon="{ name: 'trash2' }" severity="error" square />
      <Button label="Guardar" :loading="true" />
    </div>
  </ComponentExample>
</template>
