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
  <Accordion
    v-model:value="value"
    collapsible
    :items="items"
    :icon-drop-down-open="{ name: 'minus' }"
    :icon-drop-down-close="{ name: 'plus' }"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="IconDropDown"
    description="Cambia los iconos del activador según la sección esté abierta o cerrada."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Accordion
        v-model:value="value"
        collapsible
        :items="items"
        :icon-drop-down-open="{ name: 'minus' }"
        :icon-drop-down-close="{ name: 'plus' }"
      />
    </div>
  </ComponentExample>
</template>
