<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Announcer } from '@nono-cn/nono-ui/components/ui/Announcer'
<\/script>

<template>
  <Announcer politeness="polite">
    <strong>Sincronización completada.</strong>
  </Announcer>
</template>`
</script>

<template>
  <ComponentExample
    title="Contenido personalizado"
    description="El slot default permite controlar el contenido anunciado."
    :code="code"
    :show-reset="false"
  >
    <Announcer politeness="polite">
      <strong>Sincronización completada.</strong>
    </Announcer>
    <span class="text-sm text-muted-foreground"
      >Con slot, el contenido también se muestra visualmente.</span
    >
  </ComponentExample>
</template>
