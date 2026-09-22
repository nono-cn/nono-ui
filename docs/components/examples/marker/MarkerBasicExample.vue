<script setup lang="ts">
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Marker } from '__DOCS_PACKAGE__/components/ui/Marker'
<\/script>

<template>
  <Marker label="Sincronización completada" :icon="{ name: 'check' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="Marker básico"
    description="Indica brevemente el resultado de una operación."
    :code="code"
    :show-reset="false"
  >
    <Marker label="Sincronización completada" :icon="{ name: 'check' }" />
  </ComponentExample>
</template>
