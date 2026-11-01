<script setup lang="ts">
import { computed, ref } from 'vue'
import { Loading } from '@/components/Loading'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const loading = ref(true)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Loading } from '__DOCS_PACKAGE__/components/Loading'

const loading = ref(${loading.value})
${scriptEnd}

<template>
  <Loading :loading="loading" aria-label="Loading users">
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
    title="Basic loading"
    description="Switch between the default spinner and loaded content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="loading" label="Loading" />
    </template>
    <Loading :loading="loading" aria-label="Loading users">
      <p>Users loaded.</p>
    </Loading>
  </ComponentExample>
</template>
