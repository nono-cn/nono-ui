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
    label="Sesión guardada"
    description="Tus cambios se han guardado correctamente."
  >
    <Button variant="outline">Ver mensaje</Button>

    <template #footer="{ close }">
      <div class="flex w-full items-center justify-between gap-3">
        <span class="text-xs text-muted-foreground">Sin acciones pendientes</span>
        <Button size="sm" @click="close">Entendido</Button>
      </div>
    </template>
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Footer"
    description="Reemplaza todo el pie y usa close para cerrar desde una acción personalizada."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog label="Sesión guardada" description="Tus cambios se han guardado correctamente.">
      <Button variant="outline">Ver mensaje</Button>

      <template #footer="{ close }">
        <div class="flex w-full items-center justify-between gap-3">
          <span class="text-xs text-muted-foreground">Sin acciones pendientes</span>
          <Button size="sm" @click="close">Entendido</Button>
        </div>
      </template>
    </AlertDialog>
  </ComponentExample>
</template>
