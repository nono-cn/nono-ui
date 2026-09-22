<script setup lang="ts">
import { Loading } from '@/components/ui/Loading'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Loading } from '__DOCS_PACKAGE__/components/ui/Loading'
<\/script>

<template>
  <Loading :loading="true" aria-label="Preparando usuarios">
    <template #loading>
      <span>Preparando usuarios...</span>
    </template>
  </Loading>
</template>`
</script>

<template>
  <ComponentExample
    title="Loading personalizado"
    description="Sustituye el icono por un mensaje propio."
    :code="code"
    :show-reset="false"
  >
    <Loading :loading="true" aria-label="Preparando usuarios">
      <template #loading>
        <span>Preparando usuarios...</span>
      </template>
    </Loading>
  </ComponentExample>
</template>
