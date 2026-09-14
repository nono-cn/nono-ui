<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const code = `<script setup lang="ts">
import { Card } from '@nono-cn/nono-ui/components/ui/Card'
${scriptEnd}
<template>
  <Card label="Resumen" description="Información de la cuenta">
    <p>Contenido principal de la card.</p>
  </Card>
</template>`
</script>
<template>
  <ComponentExample
    title="Uso básico"
    description="Agrupa información relacionada en una superficie."
    :code="code"
    :show-reset="false"
  >
    <Card label="Resumen" description="Información de la cuenta"
      ><p>Contenido principal de la card.</p></Card
    >
  </ComponentExample>
</template>
