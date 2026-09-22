<script setup lang="ts">
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Empty } from '__DOCS_PACKAGE__/components/ui/Empty'
${scriptEnd}

<template>
  <Empty
    class="w-full"
    description="Prueba a cambiar los filtros para encontrar contenido."
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Description"
    description="Añade información complementaria al estado vacío."
    :code="code"
    :show-reset="false"
  >
    <Empty class="w-full" description="Prueba a cambiar los filtros para encontrar contenido." />
  </ComponentExample>
</template>
