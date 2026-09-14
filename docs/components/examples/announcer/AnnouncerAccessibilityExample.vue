<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Announcer } from '@nono-cn/nono-ui/components/ui/Announcer'
${scriptEnd}

<template>
  <div class="grid gap-3">
    <div class="grid gap-1">
      <span class="text-xs font-medium text-muted-foreground">polite → role="status"</span>
      <Announcer message="La búsqueda está lista." politeness="polite" />
    </div>
    <div class="grid gap-1">
      <span class="text-xs font-medium text-muted-foreground">assertive → role="alert"</span>
      <Announcer message="Se ha producido un error." politeness="assertive" />
    </div>
    <div class="grid gap-1">
      <span class="text-xs font-medium text-muted-foreground">off → sin role</span>
      <Announcer message="Mensaje desactivado." politeness="off" />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Regiones live"
    description="Selecciona la prioridad adecuada y evita anunciar actualizaciones que no aporten información al usuario."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-3">
      <div class="grid gap-1">
        <span class="text-xs font-medium text-muted-foreground">polite → role="status"</span>
        <Announcer message="La búsqueda está lista." politeness="polite" />
      </div>
      <div class="grid gap-1">
        <span class="text-xs font-medium text-muted-foreground">assertive → role="alert"</span>
        <Announcer message="Se ha producido un error." politeness="assertive" />
      </div>
      <div class="grid gap-1">
        <span class="text-xs font-medium text-muted-foreground">off → sin role</span>
        <Announcer message="Mensaje desactivado." politeness="off" />
      </div>
    </div>
  </ComponentExample>
</template>
