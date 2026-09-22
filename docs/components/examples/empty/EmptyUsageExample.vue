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
  <Empty
    class="w-full"
    label="No hay proyectos"
    description="Crea tu primer proyecto para empezar a trabajar."
  >
    <Button label="Crear proyecto" />
  </Empty>
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Muestra un estado vacío con una acción para continuar."
    :code="code"
    :show-reset="false"
  >
    <Empty
      class="w-full"
      label="No hay proyectos"
      description="Crea tu primer proyecto para empezar a trabajar."
    >
      <Button label="Crear proyecto" />
    </Empty>
  </ComponentExample>
</template>
