<script setup lang="ts">
import { Splitter } from '@/components/ui/Splitter'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { id: 'first', slot: 'first', defaultSize: 50, minSize: 25 },
  { id: 'second', slot: 'second', defaultSize: 50, minSize: 25 },
]

const code = `<script setup lang="ts">
import { Splitter } from '__DOCS_PACKAGE__/components/ui/Splitter'

const items = [
  { id: 'first', slot: 'first', defaultSize: 50, minSize: 25 },
  { id: 'second', slot: 'second', defaultSize: 50, minSize: 25 },
]
${scriptEnd}

<template>
  <div class="grid w-full max-w-2xl gap-6">
    <div class="grid gap-2">
      <span class="text-sm font-medium">Horizontal</span>
      <div class="h-36 w-full">
        <Splitter
          :items="items"
          direction="horizontal"
          class="w-full overflow-hidden rounded-lg border"
        >
          <template #panel-first>
            <div class="flex h-full items-center justify-center bg-muted/30 p-3">First panel</div>
          </template>
          <template #panel-second>
            <div class="flex h-full items-center justify-center p-3">Second panel</div>
          </template>
        </Splitter>
      </div>
    </div>
    <div class="grid gap-2">
      <span class="text-sm font-medium">Vertical</span>
      <div class="h-64 w-full">
        <Splitter
          :items="items"
          direction="vertical"
          class="w-full overflow-hidden rounded-lg border"
        >
          <template #panel-first>
            <div class="flex h-full items-center justify-center bg-muted/30 p-3">First panel</div>
          </template>
          <template #panel-second>
            <div class="flex h-full items-center justify-center p-3">Second panel</div>
          </template>
        </Splitter>
      </div>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Direction"
    description="Cambia la dirección para colocar los paneles en fila o en columna."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-6">
      <div class="grid gap-2">
        <span class="text-sm font-medium">Horizontal</span>
        <div class="h-36 w-full">
          <Splitter
            :items="items"
            direction="horizontal"
            class="w-full overflow-hidden rounded-lg border"
          >
            <template #panel-first>
              <div class="flex h-full items-center justify-center bg-muted/30 p-3">First panel</div>
            </template>
            <template #panel-second>
              <div class="flex h-full items-center justify-center p-3">Second panel</div>
            </template>
          </Splitter>
        </div>
      </div>
      <div class="grid gap-2">
        <span class="text-sm font-medium">Vertical</span>
        <div class="h-64 w-full">
          <Splitter
            :items="items"
            direction="vertical"
            class="w-full overflow-hidden rounded-lg border"
          >
            <template #panel-first>
              <div class="flex h-full items-center justify-center bg-muted/30 p-3">First panel</div>
            </template>
            <template #panel-second>
              <div class="flex h-full items-center justify-center p-3">Second panel</div>
            </template>
          </Splitter>
        </div>
      </div>
    </div>
  </ComponentExample>
</template>
