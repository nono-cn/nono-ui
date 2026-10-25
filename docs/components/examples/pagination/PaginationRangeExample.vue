<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination, paginationDefaults } from '@/components/ui/Pagination'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleSliderControl from '../../controls/ExampleSliderControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(10)
const siblingCount = ref<number>(paginationDefaults.siblingCount)
const showEdges = ref<boolean>(paginationDefaults.showEdges)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
${scriptEnd}

<template>
  <Pagination
    v-model:page="page"
    :total="400"
    :sibling-count="${siblingCount.value}"
    :show-edges="${showEdges.value}"
  />
</template>`,
)

function reset() {
  page.value = 10
  siblingCount.value = paginationDefaults.siblingCount
  showEdges.value = paginationDefaults.showEdges
}
</script>

<template>
  <ComponentExample
    title="Range"
    description="Choose how many pages are shown around the current one, and whether the first and last pages stay visible."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSliderControl v-model="siblingCount" label="Sibling count" :min="0" :max="3" />
        <ExampleCheckboxControl v-model="showEdges" label="Show edges" />
      </div>
    </template>
    <Pagination
      v-model:page="page"
      :total="400"
      :sibling-count="siblingCount"
      :show-edges="showEdges"
    />
  </ComponentExample>
</template>
