<script setup lang="ts">
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = Array.from({ length: 8 }, (_, index) => `Row ${index + 1}`)
const code = `<script setup lang="ts">
import { ScrollArea } from '__DOCS_PACKAGE__/components/ui/ScrollArea'

const items = Array.from({ length: 8 }, (_, index) => \`Row \${index + 1}\`)
${scriptEnd}

<template>
  <div class="grid w-full min-w-0 gap-4">
    <section class="grid min-w-0 gap-2">
      <h4>Vertical</h4>
      <ScrollArea type="always" orientation="vertical" class="h-28 w-full min-w-0 max-w-full rounded-md border p-3">
        <p v-for="item in items" :key="item" class="py-1">{{ item }}</p>
      </ScrollArea>
    </section>
    <section class="grid min-w-0 gap-2">
      <h4>Horizontal</h4>
      <ScrollArea type="always" orientation="horizontal" class="h-28 w-full min-w-0 max-w-full rounded-md border p-3">
        <div class="flex w-max gap-3"><span v-for="item in items" :key="item" class="w-36 shrink-0 rounded border p-3">{{ item }}</span></div>
      </ScrollArea>
    </section>
    <section class="grid min-w-0 gap-2">
      <h4>Both</h4>
      <ScrollArea type="always" orientation="both" class="h-28 w-full min-w-0 max-w-full rounded-md border p-3">
        <div class="grid w-[520px] grid-cols-2 gap-2">
          <span v-for="item in items" :key="item" class="rounded border p-3">{{ item }}</span>
        </div>
      </ScrollArea>
    </section>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Compare vertical, horizontal, and bidirectional scrolling."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full min-w-0 gap-4">
      <section class="grid min-w-0 gap-2">
        <h4 class="text-sm font-medium">Vertical</h4>
        <ScrollArea
          type="always"
          orientation="vertical"
          class="h-28 w-full max-w-full min-w-0 rounded-md border p-3"
        >
          <p v-for="item in items" :key="item" class="py-1">{{ item }}</p>
        </ScrollArea>
      </section>
      <section class="grid min-w-0 gap-2">
        <h4 class="text-sm font-medium">Horizontal</h4>
        <ScrollArea
          type="always"
          orientation="horizontal"
          class="h-28 w-full max-w-full min-w-0 rounded-md border p-3"
        >
          <div class="flex w-max gap-3">
            <span v-for="item in items" :key="item" class="w-36 shrink-0 rounded border p-3">{{
              item
            }}</span>
          </div>
        </ScrollArea>
      </section>
      <section class="grid min-w-0 gap-2">
        <h4 class="text-sm font-medium">Both</h4>
        <ScrollArea
          type="always"
          orientation="both"
          class="h-28 w-full max-w-full min-w-0 rounded-md border p-3"
        >
          <div class="grid w-[520px] grid-cols-2 gap-2">
            <span v-for="item in items" :key="item" class="rounded border p-3">{{ item }}</span>
          </div>
        </ScrollArea>
      </section>
    </div>
  </ComponentExample>
</template>
