<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Message } from '@nono-cn/nono-ui/components/ui/Message'
<\/script>

<template>
  <Message message="Hola, ¿cómo va el proyecto?" />
</template>`
</script>

<template>
  <ComponentExample
    title="Mensaje básico"
    description="Muestra un mensaje de conversación."
    :code="code"
    :show-reset="false"
  >
    <Message message="Hola, ¿cómo va el proyecto?" />
  </ComponentExample>
</template>
