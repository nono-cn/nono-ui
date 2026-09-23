<script setup lang="ts">
import { Loading } from '@/components/ui/Loading'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Loading } from '__DOCS_PACKAGE__/components/ui/Loading'
${scriptEnd}

<template>
  <Loading :loading="true" aria-label="Preparing users">
    <template #loading>
      <span>Preparing users...</span>
    </template>
  </Loading>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom loading"
    description="Replace the default icon with a custom message."
    :code="code"
    :show-reset="false"
  >
    <Loading :loading="true" aria-label="Preparing users">
      <template #loading>
        <span>Preparing users...</span>
      </template>
    </Loading>
  </ComponentExample>
</template>
