<script setup lang="ts">
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Ribbon } from '__DOCS_PACKAGE__/components/ui/Ribbon'
<\/script>

<template>
  <Ribbon :ribbons="[{ label: 'Nuevo', severity: 'primary' }]" class="w-full max-w-md rounded-xl border p-12">
    <p class="text-center">Contenido destacado</p>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Ribbon básica"
    description="Añade una cinta sobre el contenido."
    :code="code"
    :show-reset="false"
  >
    <Ribbon
      :ribbons="[{ label: 'Nuevo', severity: 'primary' }]"
      class="w-full max-w-md rounded-xl border p-12"
    >
      <p class="text-center">Contenido destacado</p>
    </Ribbon>
  </ComponentExample>
</template>
