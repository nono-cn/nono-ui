<script setup lang="ts">
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Gestiona tus datos personales y preferencias.',
    slot: 'account',
  },
  {
    value: 'security',
    label: 'Seguridad',
    description: 'Configura la contraseña y la autenticación.',
  },
  {
    value: 'notifications',
    label: 'Notificaciones',
    description: 'Elige qué avisos quieres recibir.',
  },
]

const code = `<script setup lang="ts">
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const items = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Gestiona tus datos personales y preferencias.',
    slot: 'account',
  },
  {
    value: 'security',
    label: 'Seguridad',
    description: 'Configura la contraseña y la autenticación.',
  },
  {
    value: 'notifications',
    label: 'Notificaciones',
    description: 'Elige qué avisos quieres recibir.',
  },
]
${scriptEnd}

<template>
  <Accordion :items="items">
    <template #label-account="{ item, open }">
      <span class="flex items-center gap-2">
        {{ item.label }}
        <span class="text-xs text-muted-foreground">
          {{ open ? 'Abierto' : 'Cerrado' }}
        </span>
      </span>
    </template>
    <template #content-account="{ item }">
      <p>{{ item.description }} Puedes añadir aquí contenido personalizado.</p>
    </template>
  </Accordion>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots Example"
    description="Usa item.slot para personalizar el label y el contenido de una sección."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Accordion :items="items">
        <template #label-account="{ item, open }">
          <span class="flex items-center gap-2">
            {{ item.label }}
            <span class="text-xs text-muted-foreground">
              {{ open ? 'Abierto' : 'Cerrado' }}
            </span>
          </span>
        </template>
        <template #content-account="{ item }">
          <p>{{ item.description }} Puedes añadir aquí contenido personalizado.</p>
        </template>
      </Accordion>
    </div>
  </ComponentExample>
</template>
