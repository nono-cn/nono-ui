<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'
const code = `<script setup lang="ts">
import { Bubble } from '@nono-cn/nono-ui/components/ui/Bubble'
${scriptEnd}
<template>
  <div class="flex w-full flex-col gap-3">
    <Bubble>Hola, ¿cómo estás?</Bubble>
  </div>
</template>`
</script>
<template>
  <ComponentExample
    title="Uso básico"
    description="Una burbuja de conversación sencilla."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full flex-col gap-3">
      <Bubble>Hola, ¿cómo estás?</Bubble>
    </div>
  </ComponentExample>
  >
</template>
