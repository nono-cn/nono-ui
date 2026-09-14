<script setup lang="ts">
import { computed, ref } from 'vue'
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialScrollHideDelay = 600
const scrollHideDelay = ref(initialScrollHideDelay)
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

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ScrollArea } from '@nono-cn/nono-ui/components/ui/ScrollArea'

const scrollHideDelay = ref(${scrollHideDelay.value})
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
    <p class="text-xs text-muted-foreground">
      type="scroll" · las barras aparecen mientras desplazas
    </p>
    <ScrollArea
      type="scroll"
      :scroll-hide-delay="scrollHideDelay"
      class="h-48 w-full rounded-md border"
    >
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
    <p class="text-xs text-muted-foreground">
      Deja de desplazar para comprobar cuándo se oculta la barra.
    </p>
  </div>
</template>`,
)

function reset() {
  scrollHideDelay.value = initialScrollHideDelay
}
</script>

<template>
  <ComponentExample
    title="Scroll hide delay"
    description="Define el tiempo que la barra permanece visible después de la última interacción."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="scroll-area-hide-delay">
        scrollHideDelay (ms)
        <input
          id="scroll-area-hide-delay"
          v-model.number="scrollHideDelay"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          min="0"
          step="100"
          type="number"
        />
      </label>
    </template>
    <div class="grid w-full max-w-md gap-2">
      <p class="text-xs text-muted-foreground">
        type="scroll" · las barras aparecen mientras desplazas
      </p>
      <ScrollArea
        type="scroll"
        :scroll-hide-delay="scrollHideDelay"
        class="h-48 w-full rounded-md border"
      >
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
      <p class="text-xs text-muted-foreground">
        Deja de desplazar para comprobar cuándo se oculta la barra.
      </p>
    </div>
  </ComponentExample>
</template>
