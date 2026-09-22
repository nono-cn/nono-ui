<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
<\/script>

<template>
  <Card
    label="Resumen de la cuenta"
    description="Consulta la información más reciente de tu cuenta."
  >
    <p>Tu cuenta está al día.</p>
  </Card>
</template>`
</script>

<template>
  <ComponentExample
    title="Card básica"
    description="Usa un encabezado y contenido principal."
    :code="code"
    :show-reset="false"
  >
    <Card
      label="Resumen de la cuenta"
      description="Consulta la información más reciente de tu cuenta."
      class="w-full max-w-md"
    >
      <p>Tu cuenta está al día.</p>
    </Card>
  </ComponentExample>
</template>
