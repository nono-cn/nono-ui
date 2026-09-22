<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Announcer } from '@nono-cn/nono-ui/components/ui/Announcer'
<\/script>

<template>
  <Announcer message="Cambios guardados correctamente" />
</template>`
</script>

<template>
  <ComponentExample
    title="Mensaje básico"
    description="Anuncia un mensaje sin añadir contenido visual."
    :code="code"
    :show-reset="false"
  >
    <Announcer message="Cambios guardados correctamente" />
    <span class="text-sm text-muted-foreground">El anuncio no es visible visualmente.</span>
  </ComponentExample>
</template>
