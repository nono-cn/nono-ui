<script setup lang="ts">
import { Loading } from '@/components/ui/Loading'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Loading } from '__DOCS_PACKAGE__/components/ui/Loading'
<\/script>

<template>
  <Loading :loading="false">
    <ul>
      <li>Ana</li>
      <li>Bruno</li>
      <li>Carla</li>
    </ul>
  </Loading>
</template>`
</script>

<template>
  <ComponentExample
    title="Contenido cargado"
    description="Cuando loading es false se muestra el contenido del slot default."
    :code="code"
    :show-reset="false"
  >
    <Loading :loading="false">
      <ul class="grid gap-1 text-sm">
        <li>Ana</li>
        <li>Bruno</li>
        <li>Carla</li>
      </ul>
    </Loading>
  </ComponentExample>
</template>
