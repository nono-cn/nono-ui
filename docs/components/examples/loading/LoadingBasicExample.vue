<script setup lang="ts">
import { Loading } from '@/components/ui/Loading'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Loading } from '@nono-cn/nono-ui/components/ui/Loading'
<\/script>

<template>
  <Loading :loading="true" aria-label="Cargando usuarios" />
</template>`
</script>

<template>
  <ComponentExample
    title="Carga básica"
    description="Usa el icono spinner predeterminado."
    :code="code"
    :show-reset="false"
  >
    <Loading :loading="true" aria-label="Cargando usuarios" />
  </ComponentExample>
</template>
