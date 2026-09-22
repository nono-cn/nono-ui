<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'
<\/script>

<template>
  <div class="flex w-full flex-col gap-3">
    <Bubble align="start">Mensaje recibido</Bubble>
    <Bubble align="end">Mensaje enviado</Bubble>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Align"
    description="Coloca la burbuja al inicio o al final."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full flex-col gap-3">
      <Bubble align="start">Mensaje recibido</Bubble>
      <Bubble align="end">Mensaje enviado</Bubble>
    </div>
  </ComponentExample>
</template>
