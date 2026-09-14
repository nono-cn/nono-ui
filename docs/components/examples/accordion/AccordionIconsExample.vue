<script setup lang="ts">
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { value: 'home', label: 'Inicio', description: 'Resumen de actividad.', icon: { name: 'user' } },
  {
    value: 'settings',
    label: 'Ajustes',
    description: 'Preferencias de la cuenta.',
    icon: { name: 'folder' },
    disabled: true,
  },
  {
    value: 'documents',
    label: 'Documentos',
    description: 'Archivos y recursos guardados.',
    icon: { name: 'fileText' },
  },
]

const code = `<script setup lang="ts">
import { Accordion } from '@nono-cn/nono-ui/components/ui/Accordion'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template><Accordion :items="items" /></template>`
</script>

<template>
  <ComponentExample
    title="Iconos y elementos deshabilitados"
    description="Cada elemento puede tener su propio icono y estado disabled."
    :code="code"
    :show-reset="false"
  >
    <Accordion :items="items" class="w-full max-w-md" />
  </ComponentExample>
</template>
