<script setup lang="ts">
import { Loading } from '@/components/ui/Loading'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Loading } from '__DOCS_PACKAGE__/components/ui/Loading'
${scriptEnd}

<template>
  <Loading :loading="false">
    <ul>
      <li>Ana</li>
      <li>Bruno</li>
      <li>Carla</li>
    </ul>
  </Loading>
</template>`
</script>

<template>
  <ComponentExample
    title="Loaded content"
    description="When loading is false, the default slot content is displayed."
    :code="code"
    :show-reset="false"
  >
    <Loading :loading="false">
      <ul class="grid gap-1 text-sm">
        <li>Ana</li>
        <li>Bruno</li>
        <li>Carla</li>
      </ul>
    </Loading>
  </ComponentExample>
</template>
