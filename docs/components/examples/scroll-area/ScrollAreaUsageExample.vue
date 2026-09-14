<script setup lang="ts">
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  'Documentación',
  'Componentes',
  'Patrones de diseño',
  'Accesibilidad',
  'Tokens de diseño',
  'Guía de estilos',
  'Integraciones',
  'Changelog',
  'Migraciones',
  'Recursos',
]

const code = `<script setup lang="ts">
import { ScrollArea } from '@nono-cn/nono-ui/components/ui/ScrollArea'

const items = [
  'Documentación',
  'Componentes',
  'Patrones de diseño',
  'Accesibilidad',
  'Tokens de diseño',
  'Guía de estilos',
  'Integraciones',
  'Changelog',
  'Migraciones',
  'Recursos',
]
${scriptEnd}

<template>
  <div class="grid w-full max-w-md gap-2">
    <p class="text-xs text-muted-foreground">Lista desplazable · 10 elementos</p>
    <ScrollArea type="always" class="h-48 w-full rounded-md border">
      <div class="grid gap-1 p-3">
        <div
          v-for="(item, index) in items"
          :key="item"
          class="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted"
        >
          <span>{{ item }}</span>
          <span class="text-xs text-muted-foreground">{{ index + 1 }}</span>
        </div>
      </div>
    </ScrollArea>
    <p class="text-xs text-muted-foreground">Desplázate para ver los elementos restantes.</p>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un área de 192px contiene una lista más larga y mantiene visible la barra de desplazamiento."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-md gap-2">
      <p class="text-xs text-muted-foreground">Lista desplazable · 10 elementos</p>
      <ScrollArea type="always" class="h-48 w-full rounded-md border">
        <div class="grid gap-1 p-3">
          <div
            v-for="(item, index) in items"
            :key="item"
            class="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            <span>{{ item }}</span>
            <span class="text-xs text-muted-foreground">{{ index + 1 }}</span>
          </div>
        </div>
      </ScrollArea>
      <p class="text-xs text-muted-foreground">Desplázate para ver los elementos restantes.</p>
    </div>
  </ComponentExample>
</template>
