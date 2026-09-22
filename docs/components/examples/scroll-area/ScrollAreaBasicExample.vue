<script setup lang="ts">
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'

const items = Array.from({ length: 10 }, (_, index) => `Elemento ${index + 1}`)
const code = `<script setup lang="ts">
import { ScrollArea } from '__DOCS_PACKAGE__/components/ui/ScrollArea'

const items = Array.from({ length: 10 }, (_, index) => \`Elemento \${index + 1}\`)
<\/script>

<template>
  <ScrollArea class="h-48 rounded-md border p-4">
    <p v-for="item in items" :key="item" class="py-2">{{ item }}</p>
  </ScrollArea>
</template>`
</script>

<template>
  <ComponentExample
    title="Scroll vertical"
    description="Desplaza un contenido largo dentro de una altura limitada."
    :code="code"
    :show-reset="false"
  >
    <ScrollArea class="h-48 w-full max-w-md rounded-md border p-4">
      <p v-for="item in items" :key="item" class="py-2">{{ item }}</p>
    </ScrollArea>
  </ComponentExample>
</template>
