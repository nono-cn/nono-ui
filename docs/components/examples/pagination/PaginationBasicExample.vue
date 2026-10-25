<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination } from '@/components/ui/Pagination'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(1)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
${scriptEnd}

<template>
  <Pagination v-model:page="page" :total="120" :items-per-page="10" />
</template>`,
)

function reset() {
  page.value = 1
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Bind the current page with v-model:page and pass the total number of items and how many fit on a page."
    :code="code"
    @reset="reset"
  >
    <Pagination v-model:page="page" :total="120" :items-per-page="10" />
  </ComponentExample>
</template>
