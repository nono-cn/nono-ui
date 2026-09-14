<script setup lang="ts">
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Gestiona tu información personal y tus preferencias.',
  },
  {
    value: 'notifications',
    label: 'Notificaciones',
    description: 'Configura cuándo y cómo quieres recibir avisos.',
  },
  {
    value: 'security',
    label: 'Seguridad',
    description: 'Revisa tus opciones de acceso y seguridad.',
  },
]

const code = `<script setup lang="ts">
import { Accordion } from '@nono-cn/nono-ui/components/ui/Accordion'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Accordion :items="items" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un acordeón de una sola sección abierta cada vez."
    :code="code"
    :show-reset="false"
  >
    <Accordion :items="items" class="w-full max-w-md" />
  </ComponentExample>
</template>
