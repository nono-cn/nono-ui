<script setup lang="ts">
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { AlertDialog } from '__DOCS_PACKAGE__/components/ui/AlertDialog'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
<\/script>

<template>
  <AlertDialog
    label="Publicar cambios"
    description="Los cambios estarán disponibles para todos los usuarios."
    :action-button="{ label: 'Publicar', severity: 'success' }"
    :cancel-button="{ label: 'Revisar', variant: 'outline' }"
  >
    <Button label="Publicar" />
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Acciones personalizadas"
    description="Configura los botones predeterminados del diálogo."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog
      label="Publicar cambios"
      description="Los cambios estarán disponibles para todos los usuarios."
      :action-button="{ label: 'Publicar', severity: 'success' }"
      :cancel-button="{ label: 'Revisar', variant: 'outline' }"
    >
      <Button label="Publicar" />
    </AlertDialog>
  </ComponentExample>
</template>
