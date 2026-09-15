<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Message } from '@nono-cn/nono-ui/components/ui/Message'
${scriptEnd}

<template>
  <Message
    message="Hola, ¿cómo estás?"
    :avatar="{ label: 'CN' }"
    class="w-full max-w-md"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Uso básico"
    description="Muestra un mensaje con su avatar y la burbuja predeterminada."
    :code="code"
    :show-reset="false"
  >
    <Message message="Hola, ¿cómo estás?" :avatar="{ label: 'CN' }" class="w-full max-w-md" />
  </ComponentExample>
</template>
