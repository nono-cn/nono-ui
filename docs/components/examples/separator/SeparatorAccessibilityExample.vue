<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Separator } from '@nono-cn/nono-ui/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="grid gap-3">
      <span class="text-sm font-medium">Decorativo</span>
      <Separator />
      <span class="text-xs text-muted-foreground">No se anuncia a lectores de pantalla.</span>
    </div>
    <div class="flex min-h-24 items-center gap-3">
      <span class="text-sm font-medium">Semántico</span>
      <Separator orientation="vertical" :decorative="false" aria-label="Cambio de sección" />
      <span class="text-xs text-muted-foreground">role=separator</span>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Separadores decorativos y semánticos"
    description="Usa el comportamiento decorativo por defecto para divisores visuales y activa la semántica cuando el separador aporte estructura."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-6 sm:grid-cols-2">
      <div class="grid gap-3">
        <span class="text-sm font-medium">Decorativo</span>
        <Separator />
        <span class="text-xs text-muted-foreground">No se anuncia a lectores de pantalla.</span>
      </div>
      <div class="flex min-h-24 items-center gap-3">
        <span class="text-sm font-medium">Semántico</span>
        <Separator orientation="vertical" :decorative="false" aria-label="Cambio de sección" />
        <span class="text-xs text-muted-foreground">role=separator</span>
      </div>
    </div>
  </ComponentExample>
</template>
