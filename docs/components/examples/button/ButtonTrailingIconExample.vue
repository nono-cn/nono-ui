<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="TrailingIcon"
    description="Añade un icono después del contenido principal del botón."
    :code="code"
    :show-reset="false"
  >
    <Button label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />
  </ComponentExample>
</template>
