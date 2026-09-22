<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <Button label="Guardar" :icon="{ name: 'save' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Añade un icono antes del contenido principal del botón."
    :code="code"
    :show-reset="false"
  >
    <Button label="Guardar" :icon="{ name: 'save' }" />
  </ComponentExample>
</template>
