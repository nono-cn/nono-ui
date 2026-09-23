<script setup lang="ts">
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { label: 'First', height: 128 },
  { label: 'Second', height: 72 },
  { label: 'Third', height: 112 },
  { label: 'Fourth', height: 88 },
  { label: 'Fifth', height: 144 },
  { label: 'Sixth', height: 80 },
]

const code = `<script setup lang="ts">
import { Masonry } from '__DOCS_PACKAGE__/components/ui/Masonry'

const items = [
  { label: 'First', height: 128 },
  { label: 'Second', height: 72 },
  { label: 'Third', height: 112 },
  { label: 'Fourth', height: 88 },
  { label: 'Fifth', height: 144 },
  { label: 'Sixth', height: 80 },
]
${scriptEnd}

<template>
  <Masonry class="min-w-0" :items="items" :columns="3" :spacing="3" sequential>
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
    title="Sequential order"
    description="Preserve the left-to-right order in each row."
    :code="code"
    :show-reset="false"
  >
    <Masonry class="min-w-0" :items="items" :columns="3" :spacing="3" sequential>
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
