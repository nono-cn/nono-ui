<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <Button label="Guardar" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un botón con el variant solid, la severity primary y el tamaño md predeterminados."
    :code="code"
    :show-reset="false"
  >
    <Button label="Guardar" />
  </ComponentExample>
</template>
