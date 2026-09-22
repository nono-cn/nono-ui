<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

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
const fixedValue = ref<string | undefined>('security')
const collapsibleValue = ref<string | undefined>('security')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

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
const fixedValue = ref<string | undefined>('security')
const collapsibleValue = ref<string | undefined>('security')
${scriptEnd}

<template>
  <div class="grid w-full max-w-3xl gap-6 md:grid-cols-2">
    <section class="grid content-start gap-2">
      <h4 class="text-sm font-medium">No collapsible</h4>
      <Accordion v-model:value="fixedValue" type="single" :items="items" />
    </section>
    <section class="grid content-start gap-2">
      <h4 class="text-sm font-medium">Collapsible</h4>
      <Accordion
        v-model:value="collapsibleValue"
        type="single"
        collapsible
        :items="items"
      />
    </section>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Collapsible"
    description="En modo single, permite cerrar la sección que ya está abierta."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-3xl gap-6 md:grid-cols-2">
      <section class="grid content-start gap-2">
        <h4 class="text-sm font-medium">No collapsible</h4>
        <Accordion v-model:value="fixedValue" type="single" :items="items" />
      </section>
      <section class="grid content-start gap-2">
        <h4 class="text-sm font-medium">Collapsible</h4>
        <Accordion v-model:value="collapsibleValue" type="single" collapsible :items="items" />
      </section>
    </div>
  </ComponentExample>
</template>
