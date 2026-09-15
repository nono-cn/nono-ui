<script setup lang="ts">
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Marker } from '@nono-cn/nono-ui/components/ui/Marker'
${scriptEnd}

<template>
  <Marker label="Procesando" status />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Muestra un mensaje de estado con role=status."
    :code="code"
    :show-reset="false"
  >
    <Marker label="Procesando" status class="max-w-md" />
  </ComponentExample>
</template>
