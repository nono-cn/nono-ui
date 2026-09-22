<script setup lang="ts">
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

const code = `<script setup lang="ts">
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
${scriptEnd}

<template>
  <div class="grid w-full max-w-3xl gap-6 md:grid-cols-2">
    <section class="grid content-start gap-2">
      <h4 class="text-sm font-medium">Single</h4>
      <Accordion type="single" :items="items" />
    </section>
    <section class="grid content-start gap-2">
      <h4 class="text-sm font-medium">Multiple</h4>
      <Accordion type="multiple" :items="items" />
    </section>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Type"
    description="Abre una sola sección o varias al mismo tiempo."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-3xl gap-6 md:grid-cols-2">
      <section class="grid content-start gap-2">
        <h4 class="text-sm font-medium">Single</h4>
        <Accordion type="single" :items="items" />
      </section>
      <section class="grid content-start gap-2">
        <h4 class="text-sm font-medium">Multiple</h4>
        <Accordion type="multiple" :items="items" />
      </section>
    </div>
  </ComponentExample>
</template>
