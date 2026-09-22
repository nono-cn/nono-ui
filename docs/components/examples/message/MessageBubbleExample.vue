<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
<\/script>

<template>
  <div class="grid w-full gap-4">
    <Message message="Mensaje informativo" :bubble="{ variant: 'outline', severity: 'primary' }" />
    <Message message="Mensaje completado" :bubble="{ variant: 'soft', severity: 'success' }" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Bubble"
    description="Configura la burbuja interna de Message."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4">
      <Message
        message="Mensaje informativo"
        :bubble="{ variant: 'outline', severity: 'primary' }"
      />
      <Message message="Mensaje completado" :bubble="{ variant: 'soft', severity: 'success' }" />
    </div>
  </ComponentExample>
</template>
