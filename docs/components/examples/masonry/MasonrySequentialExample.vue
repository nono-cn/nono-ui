<script setup lang="ts">
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'

const items = [
  { label: 'Primero', height: 128 },
  { label: 'Segundo', height: 72 },
  { label: 'Tercero', height: 112 },
  { label: 'Cuarto', height: 88 },
  { label: 'Quinto', height: 144 },
  { label: 'Sexto', height: 80 },
]

const code = `<script setup lang="ts">
import { Masonry } from '__DOCS_PACKAGE__/components/ui/Masonry'

const items = [
  { label: 'Primero', height: 128 },
  { label: 'Segundo', height: 72 },
  { label: 'Tercero', height: 112 },
  { label: 'Cuarto', height: 88 },
  { label: 'Quinto', height: 144 },
  { label: 'Sexto', height: 80 },
]
<\/script>

<template>
  <Masonry class="min-w-0" :items="items" :columns="3" :spacing="3" sequential>
    <template #default="{ item }">
      <div class="grid place-items-center rounded-lg border bg-muted/40 p-4" :style="{ minHeight: \`\${item.height}px\` }">
        {{ item.label }}
      </div>
    </template>
  </Masonry>
</template>`
</script>

<template>
  <ComponentExample
    title="Orden secuencial"
    description="Conserva el orden de izquierda a derecha en cada fila."
    :code="code"
    :show-reset="false"
  >
    <Masonry class="min-w-0" :items="items" :columns="3" :spacing="3" sequential>
      <template #default="{ item }">
        <div
          class="grid place-items-center rounded-lg border bg-muted/40 p-4"
          :style="{ minHeight: `${item.height}px` }"
        >
          {{ item.label }}
        </div>
      </template>
    </Masonry>
  </ComponentExample>
</template>
