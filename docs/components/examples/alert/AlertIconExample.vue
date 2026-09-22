<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Sincronización completada"
    description="Todos los cambios están actualizados."
    :icon="{ name: 'check' }"
    severity="success"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Muestra un icono inicial mediante la prop icon."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Sincronización completada"
        description="Todos los cambios están actualizados."
        :icon="{ name: 'check' }"
        severity="success"
      />
    </div>
  </ComponentExample>
</template>
