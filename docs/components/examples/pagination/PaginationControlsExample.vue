<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination, paginationDefaults } from '@/components/ui/Pagination'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(3)
const showControls = ref<boolean>(paginationDefaults.showControls)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
${scriptEnd}

<template>
  <Pagination v-model:page="page" :total="80" :show-controls="${showControls.value}" />
</template>`,
)

function reset() {
  page.value = 3
  showControls.value = paginationDefaults.showControls
}
</script>

<template>
  <ComponentExample
    title="Controls"
    description="Show or hide the first, previous, next, and last buttons."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="showControls" label="Show controls" />
    </template>
    <Pagination v-model:page="page" :total="80" :show-controls="showControls" />
  </ComponentExample>
</template>
