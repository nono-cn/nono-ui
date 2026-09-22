<script setup lang="ts">
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'

const items = [
  { label: 'Uno', height: 72 },
  { label: 'Dos', height: 120 },
  { label: 'Tres', height: 88 },
  { label: 'Cuatro', height: 144 },
  { label: 'Cinco', height: 96 },
  { label: 'Seis', height: 64 },
]

const code = `<script setup lang="ts">
import { Masonry } from '__DOCS_PACKAGE__/components/ui/Masonry'

const items = [
  { label: 'Uno', height: 72 },
  { label: 'Dos', height: 120 },
  { label: 'Tres', height: 88 },
  { label: 'Cuatro', height: 144 },
  { label: 'Cinco', height: 96 },
  { label: 'Seis', height: 64 },
]
<\/script>

<template>
  <Masonry class="min-w-0" :items="items" :columns="3" :spacing="4">
    <template #default="{ item }">
      <div class="grid place-items-center rounded-lg border bg-muted/40 p-4" :style="{ minHeight: \`\${item.height}px\` }">
        {{ item.label }}
      </div>
    </template>
  </Masonry>
</template>`
</script>

<template>
  <ComponentExample
    title="Masonry básico"
    description="Distribuye elementos con alturas diferentes."
    :code="code"
    :show-reset="false"
  >
    <Masonry class="min-w-0" :items="items" :columns="3" :spacing="4">
      <template #default="{ item }">
        <div
          class="grid place-items-center rounded-lg border bg-muted/40 p-4"
          :style="{ minHeight: `${item.height}px` }"
        >
          {{ item.label }}
        </div>
      </template>
    </Masonry>
  </ComponentExample>
</template>
