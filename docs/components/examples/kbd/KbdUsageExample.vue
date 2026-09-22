<script setup lang="ts">
import { Kbd } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd } from '@nono-cn/nono-ui/components/ui/Kbd'
${scriptEnd}

<template>
  <Kbd label="Ctrl" />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Empieza mostrando una tecla con su etiqueta visible."
    :code="code"
    :show-reset="false"
  >
    <Kbd label="Ctrl" />
  </ComponentExample>
</template>
