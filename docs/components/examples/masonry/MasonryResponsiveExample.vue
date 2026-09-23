<script setup lang="ts">
import { Masonry } from '@/components/ui/Masonry'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = ['A', 'B', 'C', 'D', 'E', 'F']

const code = `<script setup lang="ts">
import { Masonry } from '__DOCS_PACKAGE__/components/ui/Masonry'

const items = ['A', 'B', 'C', 'D', 'E', 'F']
${scriptEnd}

<template>
  <Masonry class="min-w-0" :items="items" :columns="{ sm: 1, md: 2, lg: 4 }" :spacing="3">
    <template #default="{ item, index }">
      <div class="rounded-lg border bg-muted/40 p-5 text-center">{{ item }} - {{ index + 1 }}</div>
    </template>
  </Masonry>
</template>`
</script>

<template>
  <ComponentExample
    title="Responsive columns"
    description="Use a different configuration for each breakpoint."
    :code="code"
    :show-reset="false"
  >
    <Masonry class="min-w-0" :items="items" :columns="{ sm: 1, md: 2, lg: 4 }" :spacing="3">
      <template #default="{ item, index }">
        <div class="rounded-lg border bg-muted/40 p-5 text-center">
          {{ item }} - {{ index + 1 }}
        </div>
      </template>
    </Masonry>
  </ComponentExample>
</template>
