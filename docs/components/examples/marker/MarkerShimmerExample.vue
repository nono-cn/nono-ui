<script setup lang="ts">
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Marker } from '@nono-cn/nono-ui/components/ui/Marker'
<\/script>

<template>
  <Marker shimmer label="Procesando la solicitud..." />
</template>`
</script>

<template>
  <ComponentExample
    title="Shimmer"
    description="Indica que una operación sigue en curso."
    :code="code"
    :show-reset="false"
  >
    <Marker shimmer label="Procesando la solicitud..." />
  </ComponentExample>
</template>
