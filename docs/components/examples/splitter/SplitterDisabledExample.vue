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
  <div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
    <div class="grid gap-2">
      <span class="text-sm font-medium">Enabled</span>
      <Splitter :items="items" class="h-36 overflow-hidden rounded-lg border">
        <template #panel-first>
          <div class="flex h-full items-center justify-center bg-muted/30 p-2 text-sm">First</div>
        </template>
        <template #panel-second>
          <div class="flex h-full items-center justify-center p-2 text-sm">Second</div>
        </template>
      </Splitter>
    </div>
    <div class="grid gap-2">
      <span class="text-sm font-medium">Disabled</span>
      <Splitter :items="items" disabled class="h-36 overflow-hidden rounded-lg border">
        <template #panel-first>
          <div class="flex h-full items-center justify-center bg-muted/30 p-2 text-sm">First</div>
        </template>
        <template #panel-second>
          <div class="flex h-full items-center justify-center p-2 text-sm">Second</div>
        </template>
      </Splitter>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Deshabilita los manejadores sin cambiar el contenido ni el layout inicial."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <div class="grid gap-2">
        <span class="text-sm font-medium">Enabled</span>
        <Splitter :items="items" class="h-36 overflow-hidden rounded-lg border">
          <template #panel-first>
            <div class="flex h-full items-center justify-center bg-muted/30 p-2 text-sm">First</div>
          </template>
          <template #panel-second>
            <div class="flex h-full items-center justify-center p-2 text-sm">Second</div>
          </template>
        </Splitter>
      </div>
      <div class="grid gap-2">
        <span class="text-sm font-medium">Disabled</span>
        <Splitter :items="items" disabled class="h-36 overflow-hidden rounded-lg border">
          <template #panel-first>
            <div class="flex h-full items-center justify-center bg-muted/30 p-2 text-sm">First</div>
          </template>
          <template #panel-second>
            <div class="flex h-full items-center justify-center p-2 text-sm">Second</div>
          </template>
        </Splitter>
      </div>
    </div>
  </ComponentExample>
</template>
