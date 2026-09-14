<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Announcer } from '@nono-cn/nono-ui/components/ui/Announcer'
${scriptEnd}

<template>
  <div class="grid gap-2 text-center">
    <span class="text-sm font-medium">Estado actualizado</span>
    <Announcer message="Los cambios se han guardado correctamente." />
    <span class="text-xs text-muted-foreground">El mensaje no ocupa espacio visual.</span>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un mensaje anunciado con la politeness polite predeterminada y oculto visualmente."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-2 text-center">
      <span class="text-sm font-medium">Estado actualizado</span>
      <Announcer message="Los cambios se han guardado correctamente." />
      <span class="text-xs text-muted-foreground">El mensaje no ocupa espacio visual.</span>
    </div>
  </ComponentExample>
</template>
