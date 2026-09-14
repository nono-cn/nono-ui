<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Cambios guardados"
    description="Tus preferencias se han actualizado correctamente."
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un alert con el variant soft y la severity primary predeterminados."
    :code="code"
    :show-reset="false"
  >
    <Alert
      label="Cambios guardados"
      description="Tus preferencias se han actualizado correctamente."
    />
  </ComponentExample>
</template>
