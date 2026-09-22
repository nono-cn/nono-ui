<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Message } from '@nono-cn/nono-ui/components/ui/Message'
<\/script>

<template>
  <div class="grid w-full gap-4">
    <Message align="start" message="Mensaje recibido" />
    <Message align="end" message="Mensaje enviado" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Align"
    description="Alinea cada mensaje según el interlocutor."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4">
      <Message align="start" message="Mensaje recibido" />
      <Message align="end" message="Mensaje enviado" />
    </div>
  </ComponentExample>
</template>
