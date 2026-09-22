<script setup lang="ts">
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'

const types = ['auto', 'always', 'scroll', 'hover', 'glimpse'] as const
const items = Array.from({ length: 6 }, (_, index) => `Contenido ${index + 1}`)

const code = `<script setup lang="ts">
import { ScrollArea } from '__DOCS_PACKAGE__/components/ui/ScrollArea'

const types = ['auto', 'always', 'scroll', 'hover', 'glimpse'] as const
const items = Array.from({ length: 6 }, (_, index) => \`Contenido \${index + 1}\`)
<\/script>

<template>
  <div class="grid w-full min-w-0 gap-4 sm:grid-cols-2">
    <section v-for="type in types" :key="type" class="grid min-w-0 gap-2">
      <h4 class="text-sm font-medium">{{ type }}</h4>
      <ScrollArea :type="type" class="h-28 w-full min-w-0 max-w-full rounded-md border p-3">
        <p v-for="item in items" :key="item" class="py-1">{{ item }}</p>
      </ScrollArea>
    </section>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Type"
    description="Compara auto, always, scroll, hover y glimpse con contenido desplazable."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full min-w-0 gap-4 sm:grid-cols-2">
      <section v-for="type in types" :key="type" class="grid min-w-0 gap-2">
        <h4 class="text-sm font-medium">{{ type }}</h4>
        <ScrollArea :type="type" class="h-28 w-full max-w-full min-w-0 rounded-md border p-3">
          <p v-for="item in items" :key="item" class="py-1">{{ item }}</p>
        </ScrollArea>
      </section>
    </div>
  </ComponentExample>
</template>
