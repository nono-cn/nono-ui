<script setup lang="ts">
import { computed, ref } from 'vue'
import { Masonry, type MasonryItem } from '@/components/ui/Masonry'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { label: 'A', height: 72 },
  { label: 'B', height: 120 },
  { label: 'C', height: 88 },
  { label: 'D', height: 144 },
  { label: 'E', height: 96 },
  { label: 'F', height: 64 },
] satisfies MasonryItem[]
const columnOptions = ['1', '2', '3', '4']
const sm = ref('1')
const md = ref('2')
const lg = ref('4')
const columns = computed(() => ({
  sm: Number(sm.value),
  md: Number(md.value),
  lg: Number(lg.value),
}))

const code = computed(
  () => `<script setup lang="ts">
import { Masonry, type MasonryItem } from '__DOCS_PACKAGE__/components/ui/Masonry'

const items = [
  { label: 'A', height: 72 },
  { label: 'B', height: 120 },
  { label: 'C', height: 88 },
  { label: 'D', height: 144 },
  { label: 'E', height: 96 },
  { label: 'F', height: 64 },
] satisfies MasonryItem[]
${scriptEnd}

<template>
  <Masonry class="min-w-0" :items="items" :columns="{ sm: ${sm.value}, md: ${md.value}, lg: ${lg.value} }" :spacing="3">
    <template #default="{ item, index }">
      <div class="grid h-full place-items-center rounded-lg border bg-muted/40 p-5 text-center">{{ item.label }} - {{ index + 1 }}</div>
    </template>
  </Masonry>
</template>`,
)

function reset() {
  sm.value = '1'
  md.value = '2'
  lg.value = '4'
}
</script>

<template>
  <ComponentExample
    title="Responsive columns"
    description="Use a different configuration for each breakpoint."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="sm" label="Small columns" :options="columnOptions" />
        <ExampleSelectControl v-model="md" label="Medium columns" :options="columnOptions" />
        <ExampleSelectControl v-model="lg" label="Large columns" :options="columnOptions" />
      </div>
    </template>
    <Masonry class="min-w-0" :items="items" :columns="columns" :spacing="3">
      <template #default="{ item, index }">
        <div class="grid h-full place-items-center rounded-lg border bg-muted/40 p-5 text-center">
          {{ item.label }} - {{ index + 1 }}
        </div>
      </template>
    </Masonry>
  </ComponentExample>
</template>
