<script setup lang="ts">
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`)
const code = `<script setup lang="ts">
import { ScrollArea } from '__DOCS_PACKAGE__/components/ui/ScrollArea'

const items = Array.from({ length: 12 }, (_, index) => \`Item \${index + 1}\`)
${scriptEnd}

<template>
  <ScrollArea type="scroll" :scroll-hide-delay="1500" class="h-40 w-full min-w-0 max-w-full rounded-md border p-4">
    <p v-for="item in items" :key="item" class="py-2">{{ item }}</p>
  </ScrollArea>
</template>`
</script>

<template>
  <ComponentExample
    title="Scroll hide delay"
    description="The scrollbar waits 1500 ms before hiding after scrolling stops."
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
