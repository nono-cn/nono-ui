<script setup lang="ts">
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'

const ribbons = [
  { label: 'Éxito', severity: 'success', position: 'top-right' },
  { label: 'Personalizado', color: '#8b5cf6', position: 'bottom-left' },
] as const

const code = `<script setup lang="ts">
import { Ribbon } from '__DOCS_PACKAGE__/components/ui/Ribbon'

const ribbons = [
  { label: 'Éxito', severity: 'success', position: 'top-right' },
  { label: 'Personalizado', color: '#8b5cf6', position: 'bottom-left' },
]
<\/script>

<template>
  <Ribbon :ribbons="ribbons" class="w-full max-w-md rounded-xl border p-16">
    <p class="text-center">Contenido con estilos semánticos</p>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity y color"
    description="Combina severidad y color personalizado."
    :code="code"
    :show-reset="false"
  >
    <Ribbon :ribbons="ribbons" class="w-full max-w-md rounded-xl border p-16">
      <p class="text-center">Contenido con estilos semánticos</p>
    </Ribbon>
  </ComponentExample>
</template>
