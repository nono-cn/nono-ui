<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Pagination,
  paginationDefaults,
  paginationSizes,
  type PaginationSize,
} from '@/components/ui/Pagination'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(1)
const size = ref<PaginationSize>(paginationDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
${scriptEnd}

<template>
  <Pagination v-model:page="page" :total="100" size="${size.value}" />
</template>`,
)

function reset() {
  page.value = 1
  size.value = paginationDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Change the size of the buttons, icons, and ellipsis."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="size" label="Size" :options="paginationSizes" />
    </template>
    <Pagination v-model:page="page" :total="100" :size="size" />
  </ComponentExample>
</template>
