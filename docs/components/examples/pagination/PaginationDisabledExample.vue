<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination } from '@/components/ui/Pagination'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(3)
const disabled = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
${scriptEnd}

<template>
  <Pagination v-model:page="page" :total="100" :disabled="${disabled.value}" />
</template>`,
)

function reset() {
  page.value = 3
  disabled.value = true
}
</script>

<template>
  <ComponentExample
    title="Disabled"
    description="Disable every page and control, for example while the next page is loading."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="disabled" label="Disabled" />
    </template>
    <Pagination v-model:page="page" :total="100" :disabled="disabled" />
  </ComponentExample>
</template>
