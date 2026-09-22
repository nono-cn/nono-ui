<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Button label="No disponible" disabled />
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Usa el atributo disabled para impedir la interacción con el botón."
    :code="code"
    :show-reset="false"
  >
    <Button label="No disponible" disabled />
  </ComponentExample>
</template>
