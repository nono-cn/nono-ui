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
  <AlertDialog label="Eliminar acceso" description="Elige cómo quieres continuar.">
    <Button variant="outline">Administrar acceso</Button>

    <template #label>Eliminar acceso a este equipo</template>
    <template #description>
      Esta acción revoca el acceso inmediatamente y no puede deshacerse.
    </template>
    <template #content>
      <p class="text-sm">El usuario tendrá que recibir una nueva invitación para volver.</p>
    </template>
    <template #cancel="{ close }">
      <Button variant="outline" severity="secondary" @click="close">Ahora no</Button>
    </template>
    <template #action="{ close }">
      <Button severity="error" @click="close">Revocar acceso</Button>
    </template>
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Sustituye label, description y las acciones; content añade el cuerpo y action/cancel reciben close."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog label="Eliminar acceso" description="Elige cómo quieres continuar.">
      <Button variant="outline">Administrar acceso</Button>

      <template #label>Eliminar acceso a este equipo</template>
      <template #description>
        Esta acción revoca el acceso inmediatamente y no puede deshacerse.
      </template>
      <template #content>
        <p class="text-sm">El usuario tendrá que recibir una nueva invitación para volver.</p>
      </template>
      <template #cancel="{ close }">
        <Button variant="outline" severity="secondary" @click="close">Ahora no</Button>
      </template>
      <template #action="{ close }">
        <Button severity="error" @click="close">Revocar acceso</Button>
      </template>
    </AlertDialog>
  </ComponentExample>
</template>
