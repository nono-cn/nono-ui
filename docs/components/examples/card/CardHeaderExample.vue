<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
<\/script>

<template>
  <Card>
    <template #header>
      <div class="grid gap-1 px-6">
        <h3 class="font-semibold">Actividad reciente</h3>
        <p class="text-sm text-muted-foreground">Últimos movimientos de tu cuenta.</p>
      </div>
    </template>
    <p>Has realizado 3 movimientos esta semana.</p>
  </Card>
</template>`
</script>

<template>
  <ComponentExample
    title="Encabezado personalizado"
    description="Usa el slot header para controlar toda la estructura del encabezado."
    :code="code"
    :show-reset="false"
  >
    <Card class="w-full max-w-md">
      <template #header>
        <div class="grid gap-1 px-6">
          <h3 class="font-semibold">Actividad reciente</h3>
          <p class="text-sm text-muted-foreground">Últimos movimientos de tu cuenta.</p>
        </div>
      </template>
      <p>Has realizado 3 movimientos esta semana.</p>
    </Card>
  </ComponentExample>
</template>
