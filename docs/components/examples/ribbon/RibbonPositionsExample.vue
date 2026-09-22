<script setup lang="ts">
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'

const ribbons = [
  { label: 'Top right', position: 'top-right' },
  { label: 'Top left', position: 'top-left' },
  { label: 'Bottom right', position: 'bottom-right' },
  { label: 'Bottom left', position: 'bottom-left' },
] as const

const code = `<script setup lang="ts">
import { Ribbon } from '@nono-cn/nono-ui/components/ui/Ribbon'

const ribbons = [
  { label: 'Top right', position: 'top-right' },
  { label: 'Top left', position: 'top-left' },
  { label: 'Bottom right', position: 'bottom-right' },
  { label: 'Bottom left', position: 'bottom-left' },
]
<\/script>

<template>
  <Ribbon :ribbons="ribbons" class="w-full max-w-md rounded-xl border p-16">
    <p class="text-center">Contenido con varias posiciones</p>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Posiciones"
    description="Muestra las cuatro posiciones posibles."
    :code="code"
    :show-reset="false"
  >
    <Ribbon :ribbons="ribbons" class="w-full max-w-md rounded-xl border p-16">
      <p class="text-center">Contenido con varias posiciones</p>
    </Ribbon>
  </ComponentExample>
</template>
