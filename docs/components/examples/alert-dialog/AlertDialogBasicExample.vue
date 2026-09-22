<script setup lang="ts">
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { AlertDialog } from '__DOCS_PACKAGE__/components/ui/AlertDialog'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
<\/script>

<template>
  <AlertDialog label="¿Eliminar este elemento?" description="Esta acción no se puede deshacer.">
    <Button label="Eliminar" severity="error" />
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Confirmación básica"
    description="Abre un diálogo de confirmación."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog label="¿Eliminar este elemento?" description="Esta acción no se puede deshacer.">
      <Button label="Eliminar" severity="error" />
    </AlertDialog>
  </ComponentExample>
</template>
