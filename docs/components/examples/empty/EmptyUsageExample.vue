<script setup lang="ts">
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const code = `<script setup lang="ts">
import { Empty } from '@nono-cn/nono-ui/components/ui/Empty'
${scriptEnd}

<template>
  <Empty
    label="Sin resultados"
    description="No encontramos elementos que coincidan con tu búsqueda."
  />
</template>`
</script>
<template>
  <ComponentExample
    title="Uso básico"
    description="Un estado vacío sencillo."
    :code="code"
    :show-reset="false"
  >
    <Empty
      label="Sin resultados"
      description="No encontramos elementos que coincidan con tu búsqueda."
    />
  </ComponentExample>
</template>
