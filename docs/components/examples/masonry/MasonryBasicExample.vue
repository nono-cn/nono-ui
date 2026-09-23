<script setup lang="ts">
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { label: 'One', height: 72 },
  { label: 'Two', height: 120 },
  { label: 'Three', height: 88 },
  { label: 'Four', height: 144 },
  { label: 'Five', height: 96 },
  { label: 'Six', height: 64 },
]

const code = `<script setup lang="ts">
import { Masonry } from '__DOCS_PACKAGE__/components/ui/Masonry'

const items = [
  { label: 'One', height: 72 },
  { label: 'Two', height: 120 },
  { label: 'Three', height: 88 },
  { label: 'Four', height: 144 },
  { label: 'Five', height: 96 },
  { label: 'Six', height: 64 },
]
${scriptEnd}

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
    title="Basic masonry"
    description="Arrange items with varying heights."
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
