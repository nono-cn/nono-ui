<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'
<\/script>

<template>
  <Bubble>Hola, ¿cómo va el proyecto?</Bubble>
</template>`
</script>

<template>
  <ComponentExample
    title="Bubble básica"
    description="Muestra un mensaje de conversación."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full flex-col gap-3">
      <Bubble>Hola, ¿cómo va el proyecto?</Bubble>
    </div>
  </ComponentExample>
</template>
