<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination, type PaginationUI } from '@/components/ui/Pagination'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const page = ref(5)
const round = ref(true)
const raiseActive = ref(false)
const roundClass = computed(() => (round.value ? 'rounded-full' : ''))
const ui = computed<PaginationUI>(() => ({
  first: () => ({ class: roundClass.value }),
  previous: () => ({ class: roundClass.value }),
  next: () => ({ class: roundClass.value }),
  last: () => ({ class: roundClass.value }),
  item: ({ active }) => ({
    class: [roundClass.value, raiseActive.value && active ? 'shadow-md' : ''],
  }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Pagination, type PaginationUI } from '__DOCS_PACKAGE__/components/ui/Pagination'

const page = ref(${page.value})
const ui: PaginationUI = {
  first: () => ({ class: '${roundClass.value}' }),
  previous: () => ({ class: '${roundClass.value}' }),
  next: () => ({ class: '${roundClass.value}' }),
  last: () => ({ class: '${roundClass.value}' }),
  item: ({ active }) => ({
    class: ['${roundClass.value}', ${raiseActive.value ? `active ? 'shadow-md' : ''` : `''`}],
  }),
}
${scriptEnd}

<template>
  <Pagination v-model:page="page" :total="200" :ui="ui" />
</template>`,
)

function reset() {
  page.value = 5
  round.value = true
  raiseActive.value = false
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Customize the list, each control, each page, and the ellipsis using the pagination context or the context of each item."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="round" label="Round buttons" />
        <ExampleCheckboxControl v-model="raiseActive" label="Raise current page" />
      </div>
    </template>
    <Pagination v-model:page="page" :total="200" :ui="ui" />
  </ComponentExample>
</template>
