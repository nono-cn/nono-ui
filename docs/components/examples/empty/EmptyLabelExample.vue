<script setup lang="ts">
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Empty } from '__DOCS_PACKAGE__/components/ui/Empty'
${scriptEnd}

<template>
  <Empty class="w-full" label="No hay notificaciones" />
</template>`
</script>

<template>
  <ComponentExample
    title="Label"
    description="Define el título principal del estado vacío."
    :code="code"
    :show-reset="false"
  >
    <Empty class="w-full" label="No hay notificaciones" />
  </ComponentExample>
</template>
