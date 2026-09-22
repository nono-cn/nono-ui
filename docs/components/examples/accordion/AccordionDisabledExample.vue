<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const rootDisabledValue = ref<string | undefined>('account')
const rootDisabledItems = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Este acordeón completo está deshabilitado.',
  },
  {
    value: 'security',
    label: 'Seguridad',
    description: 'Este acordeón completo está deshabilitado.',
  },
  {
    value: 'notifications',
    label: 'Notificaciones',
    description: 'Este acordeón completo está deshabilitado.',
  },
]
const itemDisabledItems = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Esta sección se puede abrir.',
  },
  {
    value: 'security',
    label: 'Seguridad',
    description: 'Esta sección está deshabilitada individualmente.',
    disabled: true,
  },
  {
    value: 'notifications',
    label: 'Notificaciones',
    description: 'Esta sección se puede abrir.',
  },
]

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Accordion } from '__DOCS_PACKAGE__/components/ui/Accordion'

const rootDisabledValue = ref<string | undefined>('account')
const rootDisabledItems = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Este acordeón completo está deshabilitado.',
  },
  {
    value: 'security',
    label: 'Seguridad',
    description: 'Este acordeón completo está deshabilitado.',
  },
  {
    value: 'notifications',
    label: 'Notificaciones',
    description: 'Este acordeón completo está deshabilitado.',
  },
]
const itemDisabledItems = [
  {
    value: 'account',
    label: 'Cuenta',
    description: 'Esta sección se puede abrir.',
  },
  {
    value: 'security',
    label: 'Seguridad',
    description: 'Esta sección está deshabilitada individualmente.',
    disabled: true,
  },
  {
    value: 'notifications',
    label: 'Notificaciones',
    description: 'Esta sección se puede abrir.',
  },
]
${scriptEnd}

<template>
  <div class="grid w-full max-w-3xl gap-6 md:grid-cols-2">
    <section class="grid content-start gap-2">
      <h4 class="text-sm font-medium">Disabled root</h4>
      <Accordion
        v-model:value="rootDisabledValue"
        :items="rootDisabledItems"
        :disabled="true"
      />
    </section>
    <section class="grid content-start gap-2">
      <h4 class="text-sm font-medium">Disabled item</h4>
      <Accordion :items="itemDisabledItems" />
    </section>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Deshabilita todo el acordeón o una sección individual."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-3xl gap-6 md:grid-cols-2">
      <section class="grid content-start gap-2">
        <h4 class="text-sm font-medium">Disabled root</h4>
        <Accordion v-model:value="rootDisabledValue" :items="rootDisabledItems" :disabled="true" />
      </section>
      <section class="grid content-start gap-2">
        <h4 class="text-sm font-medium">Disabled item</h4>
        <Accordion :items="itemDisabledItems" />
      </section>
    </div>
  </ComponentExample>
</template>
