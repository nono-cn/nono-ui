<script setup lang="ts">
import { Loading } from '@/components/ui/Loading'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Loading } from '__DOCS_PACKAGE__/components/ui/Loading'
${scriptEnd}

<template>
  <Loading :loading="true" aria-label="Loading users" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic loading"
    description="Use the default spinner icon."
    :code="code"
    :show-reset="false"
  >
    <Loading :loading="true" aria-label="Loading users" />
  </ComponentExample>
</template>
