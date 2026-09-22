<script setup lang="ts">
import { Splitter } from '@/components/ui/Splitter'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { id: 'sidebar', slot: 'sidebar', defaultSize: 22, minSize: 15, maxSize: 35 },
  { id: 'main', slot: 'main', defaultSize: 50, minSize: 35 },
  { id: 'inspector', slot: 'inspector', defaultSize: 28, minSize: 15, maxSize: 40 },
]

const code = `<script setup lang="ts">
import { Splitter } from '__DOCS_PACKAGE__/components/ui/Splitter'

const items = [
  { id: 'sidebar', slot: 'sidebar', defaultSize: 22, minSize: 15, maxSize: 35 },
  { id: 'main', slot: 'main', defaultSize: 50, minSize: 35 },
  { id: 'inspector', slot: 'inspector', defaultSize: 28, minSize: 15, maxSize: 40 },
]
${scriptEnd}

<template>
  <Splitter :items="items" class="h-52 w-full overflow-hidden rounded-lg border">
    <template #panel-sidebar>
      <div class="flex h-full items-center justify-center bg-muted/30 p-2 text-center text-sm">
        Sidebar
      </div>
    </template>
    <template #panel-main>
      <div class="flex h-full items-center justify-center p-2 text-sm">Main</div>
    </template>
    <template #panel-inspector>
      <div class="flex h-full items-center justify-center bg-muted/30 p-2 text-center text-sm">
        Inspector
      </div>
    </template>
  </Splitter>
</template>`
</script>

<template>
  <ComponentExample
    title="DefaultSize"
    description="Define tamaños iniciales y límites mínimos y máximos para cada panel."
    :code="code"
    :show-reset="false"
  >
    <Splitter :items="items" class="h-52 w-full overflow-hidden rounded-lg border">
      <template #panel-sidebar>
        <div class="flex h-full items-center justify-center bg-muted/30 p-2 text-center text-sm">
          Sidebar
        </div>
      </template>
      <template #panel-main>
        <div class="flex h-full items-center justify-center p-2 text-sm">Main</div>
      </template>
      <template #panel-inspector>
        <div class="flex h-full items-center justify-center bg-muted/30 p-2 text-center text-sm">
          Inspector
        </div>
      </template>
    </Splitter>
  </ComponentExample>
</template>
