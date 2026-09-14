<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Actualización disponible"
    description="Hay una nueva versión lista para instalar."
    closable
    class="w-full max-w-lg"
    :close-button="{
      label: 'Cerrar',
      icon: { name: 'x' },
      size: 'sm',
      square: false,
      rounded: true,
      variant: 'outline',
      severity: 'secondary',
    }"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Close button"
    description="Configura el botón generado por Alert con las props de ButtonConfig."
    :code="code"
    :show-reset="false"
  >
    <Alert
      label="Actualización disponible"
      description="Hay una nueva versión lista para instalar."
      closable
      class="w-full max-w-lg"
      :close-button="{
        label: 'Cerrar',
        icon: { name: 'x' },
        size: 'sm',
        square: false,
        rounded: true,
        variant: 'outline',
        severity: 'secondary',
      }"
    />
  </ComponentExample>
</template>
