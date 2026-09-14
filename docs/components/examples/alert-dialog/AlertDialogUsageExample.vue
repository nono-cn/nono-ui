<script setup lang="ts">
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { AlertDialog } from '@nono-cn/nono-ui/components/ui/AlertDialog'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
${scriptEnd}

<template>
  <AlertDialog
    label="Eliminar proyecto"
    description="Esta acción no se puede deshacer."
    :action-button="{ label: 'Eliminar', severity: 'error' }"
    :cancel-button="{ label: 'Conservar' }"
  >
    <Button variant="outline">Eliminar proyecto</Button>
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Usa label, description y los botones predeterminados para pedir una confirmación explícita."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog
      label="Eliminar proyecto"
      description="Esta acción no se puede deshacer."
      :action-button="{ label: 'Eliminar', severity: 'error' }"
      :cancel-button="{ label: 'Conservar' }"
    >
      <Button variant="outline">Eliminar proyecto</Button>
    </AlertDialog>
  </ComponentExample>
</template>
