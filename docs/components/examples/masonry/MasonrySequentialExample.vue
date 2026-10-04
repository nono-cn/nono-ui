<script setup lang="ts">
import { computed, ref } from 'vue'
import { Masonry, type MasonryItem } from '@/components/ui/Masonry'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const items = [
  { label: 'First', height: 128 },
  { label: 'Second', height: 72 },
  { label: 'Third', height: 112 },
  { label: 'Fourth', height: 88 },
  { label: 'Fifth', height: 144 },
  { label: 'Sixth', height: 80 },
] satisfies MasonryItem[]

const sequential = ref(true)

const code = computed(
  () => `<script setup lang="ts">
import { Masonry, type MasonryItem } from '__DOCS_PACKAGE__/components/ui/Masonry'

const items = [
  { label: 'First', height: 128 },
  { label: 'Second', height: 72 },
  { label: 'Third', height: 112 },
  { label: 'Fourth', height: 88 },
  { label: 'Fifth', height: 144 },
  { label: 'Sixth', height: 80 },
] satisfies MasonryItem[]
${scriptEnd}

<template>
  <Masonry class="min-w-0" :items="items" :columns="3" :spacing="3" :sequential="${sequential.value}">
    <template #default="{ item }">
      <div class="grid h-full place-items-center rounded-lg border bg-muted/40 p-4">
        {{ item.label }}
      </div>
    </template>
  </Masonry>
</template>`,
)

function reset() {
  sequential.value = true
}
</script>

<template>
  <ComponentExample
    title="Sequential order"
    description="Preserve the left-to-right order in each row."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="sequential" label="Sequential" />
    </template>
    <Masonry class="min-w-0" :items="items" :columns="3" :spacing="3" :sequential="sequential">
      <template #default="{ item }">
        <div class="grid h-full place-items-center rounded-lg border bg-muted/40 p-4">
          {{ item.label }}
        </div>
      </template>
    </Masonry>
  </ComponentExample>
</template>
