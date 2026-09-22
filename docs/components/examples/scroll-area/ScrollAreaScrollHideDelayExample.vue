<script setup lang="ts">
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'

const items = Array.from({ length: 12 }, (_, index) => `Elemento ${index + 1}`)
const code = `<script setup lang="ts">
import { ScrollArea } from '__DOCS_PACKAGE__/components/ui/ScrollArea'

const items = Array.from({ length: 12 }, (_, index) => \`Elemento \${index + 1}\`)
<\/script>

<template>
  <ScrollArea type="scroll" :scroll-hide-delay="1500" class="h-40 w-full min-w-0 max-w-full rounded-md border p-4">
    <p v-for="item in items" :key="item" class="py-2">{{ item }}</p>
  </ScrollArea>
</template>`
</script>

<template>
  <ComponentExample
    title="ScrollHideDelay"
    description="La barra espera 1500 ms antes de ocultarse tras dejar de desplazar."
    :code="code"
    :show-reset="false"
  >
    <ScrollArea
      type="scroll"
      :scroll-hide-delay="1500"
      class="h-40 w-full max-w-md min-w-0 rounded-md border p-4"
    >
      <p v-for="item in items" :key="item" class="py-2">{{ item }}</p>
    </ScrollArea>
  </ComponentExample>
</template>
