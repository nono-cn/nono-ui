<script setup lang="ts">
import { computed, ref } from 'vue'
import { Masonry, type MasonryItem } from '@/components/ui/Masonry'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const firstHeight = ref('72')
const heightOptions = ['72', '128', '192']
const items = computed(
  () =>
    [
      { label: 'One', height: Number(firstHeight.value) },
      { label: 'Two', height: 120 },
      { label: 'Three', height: 88 },
      { label: 'Four', height: 144 },
      { label: 'Five', height: 96 },
      { label: 'Six', height: 64 },
    ] satisfies MasonryItem[],
)

const columnOptions = ['1', '2', '3', '4']
const spacingOptions = ['0', '2', '4', '6']
const columns = ref('3')
const spacing = ref('4')

const code = computed(
  () => `<script setup lang="ts">
import { Masonry, type MasonryItem } from '__DOCS_PACKAGE__/components/ui/Masonry'

const items = [
  { label: 'One', height: ${firstHeight.value} },
  { label: 'Two', height: 120 },
  { label: 'Three', height: 88 },
  { label: 'Four', height: 144 },
  { label: 'Five', height: 96 },
  { label: 'Six', height: 64 },
] satisfies MasonryItem[]
${scriptEnd}

<template>
  <Masonry class="min-w-0" :items="items" :columns="${columns.value}" :spacing="${spacing.value}">
    <template #default="{ item }">
      <div class="grid h-full place-items-center rounded-lg border bg-muted/40 p-4">
        {{ item.label }}
      </div>
    </template>
  </Masonry>
</template>`,
)

function reset() {
  firstHeight.value = '72'
  columns.value = '3'
  spacing.value = '4'
}
</script>

<template>
  <ComponentExample
    title="Basic masonry"
    description="Set each item's height in pixels, then choose columns and spacing."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="firstHeight"
          label="First item height"
          :options="heightOptions"
        />
        <ExampleSelectControl v-model="columns" label="Columns" :options="columnOptions" />
        <ExampleSelectControl v-model="spacing" label="Spacing" :options="spacingOptions" />
      </div>
    </template>
    <Masonry class="min-w-0" :items="items" :columns="Number(columns)" :spacing="Number(spacing)">
      <template #default="{ item }">
        <div class="grid h-full place-items-center rounded-lg border bg-muted/40 p-4">
          {{ item.label }}
        </div>
      </template>
    </Masonry>
  </ComponentExample>
</template>
