<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'
${scriptEnd}

<template>
  <Badge label="Status" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Un badge sencillo con el estilo sólido y el tamaño predeterminados."
    :code="code"
    :show-reset="false"
  >
    <Badge label="Status" />
  </ComponentExample>
</template>
