<script setup lang="ts">
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { AlertDialog } from '@nono-cn/nono-ui/components/ui/AlertDialog'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
<\/script>

<template>
  <AlertDialog
    label="Cambios sin guardar"
    description="¿Quieres salir sin guardar los cambios?"
    :icon="{ name: 'warning' }"
  >
    <Button label="Salir" variant="outline" />
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Icono"
    description="Refuerza el contexto del diálogo con un icono."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog
      label="Cambios sin guardar"
      description="¿Quieres salir sin guardar los cambios?"
      :icon="{ name: 'warning' }"
    >
      <Button label="Salir" variant="outline" />
    </AlertDialog>
  </ComponentExample>
</template>
