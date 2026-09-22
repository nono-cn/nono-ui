<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Empty } from '@nono-cn/nono-ui/components/ui/Empty'
${scriptEnd}

<template>
  <Empty class="w-full" label="No hay resultados">
    <Button label="Restablecer filtros" />
  </Empty>
</template>`
</script>

<template>
  <ComponentExample
    title="Default"
    description="Añade acciones o enlaces como contenido principal."
    :code="code"
    :show-reset="false"
  >
    <Empty class="w-full" label="No hay resultados">
      <Button label="Restablecer filtros" />
    </Empty>
  </ComponentExample>
</template>
