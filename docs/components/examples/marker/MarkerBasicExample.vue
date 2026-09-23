<script setup lang="ts">
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Marker } from '__DOCS_PACKAGE__/components/ui/Marker'
${scriptEnd}

<template>
  <Marker label="Sync complete" :icon="{ name: 'check' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic marker"
    description="Briefly indicate the result of an operation."
    :code="code"
    :show-reset="false"
  >
    <Marker label="Sync complete" :icon="{ name: 'check' }" />
  </ComponentExample>
</template>
