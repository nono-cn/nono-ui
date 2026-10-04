<script setup lang="ts">
import { computed, ref } from 'vue'
import { Loading, type LoadingUI } from '@/components/ui/Loading'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const loading = ref(true)
const ui: LoadingUI = {
  loading: ({ loading }) => ({
    class: loading ? 'min-h-20 rounded-md bg-muted/60' : '',
  }),
  content: ({ loading }) => ({
    class: loading ? '' : 'rounded-md border p-4',
  }),
}
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Loading, type LoadingUI } from '__DOCS_PACKAGE__/components/ui/Loading'

const loading = ref(${loading.value})
const ui: LoadingUI = {
  loading: ({ loading }) => ({ class: loading ? 'min-h-20 rounded-md bg-muted/60' : '' }),
  content: ({ loading }) => ({ class: loading ? '' : 'rounded-md border p-4' }),
}
${scriptEnd}

<template>
  <Loading :loading="loading" :ui="ui" aria-label="Loading users">
    <p>Users loaded.</p>
  </Loading>
</template>`,
)

function reset() {
  loading.value = true
}
</script>

<template>
  <ComponentExample
    title="UI"
    description="Style the loading and content containers from LoadingContext."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="loading" label="Loading" />
    </template>
    <Loading :loading="loading" :ui="ui" aria-label="Loading users">
      <p>Users loaded.</p>
    </Loading>
  </ComponentExample>
</template>
