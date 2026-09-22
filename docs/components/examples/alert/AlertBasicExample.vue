<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Cambios guardados"
    description="La configuración se ha actualizado correctamente."
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Muestra un título y una descripción con la apariencia predeterminada."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Cambios guardados"
        description="La configuración se ha actualizado correctamente."
      />
    </div>
  </ComponentExample>
</template>
