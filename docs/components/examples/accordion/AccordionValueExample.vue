<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref<string | undefined>('account')
const items = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Gestiona tus datos personales y preferencias.',
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
import { ref } from 'vue'
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const value = ref<string | undefined>('account')
const items = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Gestiona tus datos personales y preferencias.',
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
  <div class="grid w-full max-w-2xl gap-3">
    <Accordion v-model:value="value" :items="items" />
    <output class="text-sm text-muted-foreground">
      Sección abierta: {{ value ?? 'ninguna' }}
    </output>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Value"
    description="Enlaza el valor abierto y refleja los cambios en el estado de Vue."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-3">
      <Accordion v-model:value="value" :items="items" />
      <output class="text-sm text-muted-foreground">
        Sección abierta: {{ value ?? 'ninguna' }}
      </output>
    </div>
  </ComponentExample>
</template>
