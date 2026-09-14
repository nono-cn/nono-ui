<script setup lang="ts">
import { Accordion } from '@/components/ui/Accordion'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { value: 'account', label: 'Cuenta', description: 'Gestiona tu información personal.' },
  { value: 'notifications', label: 'Notificaciones', description: 'Configura tus avisos.' },
  { value: 'security', label: 'Seguridad', description: 'Revisa tus opciones de acceso.' },
]

const code = `<script setup lang="ts">
import { Accordion } from '@nono-cn/nono-ui/components/ui/Accordion'

const items = ${JSON.stringify(items, null, 2)}
${scriptEnd}

<template>
  <Accordion disabled :items="items" />
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Cuando disabled es true, todos los activadores quedan deshabilitados."
    :code="code"
    :show-reset="false"
  >
    <Accordion disabled :items="items" class="w-full max-w-md" />
  </ComponentExample>
</template>
