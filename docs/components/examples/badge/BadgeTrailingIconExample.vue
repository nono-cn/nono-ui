<script setup lang="ts">
import { Badge } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'
${scriptEnd}

<template>
  <Badge label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="TrailingIcon"
    description="Añade un icono al final del badge."
    :code="code"
    :show-reset="false"
  >
    <Badge label="Siguiente" :trailing-icon="{ name: 'chevronRight' }" />
  </ComponentExample>
</template>
