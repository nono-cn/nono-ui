<script setup lang="ts">
import { Announcer } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Announcer } from '@nono-cn/nono-ui/components/ui/Announcer'
${scriptEnd}

<template>
  <Announcer>
    <span class="rounded-md border px-3 py-2 text-sm">Archivo subido correctamente.</span>
  </Announcer>
</template>`
</script>

<template>
  <ComponentExample
    title="Slot"
    description="El slot default permite anunciar contenido personalizado y se muestra visualmente."
    :code="code"
    :show-reset="false"
  >
    <Announcer>
      <span class="rounded-md border px-3 py-2 text-sm">Archivo subido correctamente.</span>
    </Announcer>
  </ComponentExample>
</template>
