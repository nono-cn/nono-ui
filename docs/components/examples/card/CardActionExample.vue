<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Card } from '@nono-cn/nono-ui/components/ui/Card'
<\/script>

<template>
  <Card label="Preferencias" description="Gestiona tus preferencias de notificaciones.">
    <template #action>
      <Button label="Editar" variant="outline" size="sm" />
    </template>
    <p>Recibirás un resumen semanal por correo electrónico.</p>
    <template #footer>
      <span class="text-sm text-muted-foreground">Actualizado ahora</span>
    </template>
  </Card>
</template>`
</script>

<template>
  <ComponentExample
    title="Acción y pie"
    description="Combina los slots action y footer."
    :code="code"
    :show-reset="false"
  >
    <Card
      label="Preferencias"
      description="Gestiona tus preferencias de notificaciones."
      class="w-full max-w-md"
    >
      <template #action>
        <Button label="Editar" variant="outline" size="sm" />
      </template>
      <p>Recibirás un resumen semanal por correo electrónico.</p>
      <template #footer>
        <span class="text-sm text-muted-foreground">Actualizado ahora</span>
      </template>
    </Card>
  </ComponentExample>
</template>
