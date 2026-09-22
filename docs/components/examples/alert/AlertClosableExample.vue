<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Sesión activa"
    description="Puedes cerrar este aviso con el botón situado a la derecha."
    :closable="true"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Closable"
    description="Muestra el botón de cierre predeterminado."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Sesión activa"
        description="Puedes cerrar este aviso con el botón situado a la derecha."
        :closable="true"
      />
    </div>
  </ComponentExample>
</template>
