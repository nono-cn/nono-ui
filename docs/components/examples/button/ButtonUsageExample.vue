<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button label="Guardar cambios" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Empieza con un botón con la severidad y el tamaño predeterminados."
    :code="code"
    :show-reset="false"
  >
    <Button label="Guardar cambios" />
  </ComponentExample>
</template>
