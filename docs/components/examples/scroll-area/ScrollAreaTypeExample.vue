<script setup lang="ts">
import { computed, ref } from 'vue'
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialType = 'hover' as const
const type = ref<'auto' | 'always' | 'scroll' | 'hover' | 'glimpse'>(initialType)
const types = ['auto', 'always', 'scroll', 'hover', 'glimpse'] as const
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

const type = ref<'auto' | 'always' | 'scroll' | 'hover' | 'glimpse'>('${type.value}')
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
    <div class="flex items-center justify-between text-xs text-muted-foreground">
      <span>Visibilidad de la barra</span>
      <code class="rounded bg-muted px-1.5 py-0.5">type={{ type }}</code>
    </div>
    <ScrollArea class="h-48 w-full rounded-md border" :type="type">
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
      Con hover, scroll y glimpse interactúa con el área para mostrar la barra.
    </p>
  </div>
</template>`,
)

function reset() {
  type.value = initialType
}
</script>

<template>
  <ComponentExample
    title="Type"
    description="Cambia cuándo aparece la barra y comprueba el resultado en la lista desplazable."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="scroll-area-type">
        type
        <select
          id="scroll-area-type"
          v-model="type"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="scrollType in types" :key="scrollType" :value="scrollType">
            {{ scrollType }}
          </option>
        </select>
      </label>
    </template>
    <div class="grid w-full max-w-md gap-2">
      <div class="flex items-center justify-between text-xs text-muted-foreground">
        <span>Visibilidad de la barra</span>
        <code class="rounded bg-muted px-1.5 py-0.5">type={{ type }}</code>
      </div>
      <ScrollArea class="h-48 w-full rounded-md border" :type="type">
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
        Con hover, scroll y glimpse interactúa con el área para mostrar la barra.
      </p>
    </div>
  </ComponentExample>
</template>
