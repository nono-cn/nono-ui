<script setup lang="ts">
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Marker } from '__DOCS_PACKAGE__/components/ui/Marker'
${scriptEnd}

<template>
  <Marker shimmer label="Processing the request..." />
</template>`
</script>

<template>
  <ComponentExample
    title="Shimmer"
    description="Indicate that an operation is still in progress."
    :code="code"
    :show-reset="false"
  >
    <Marker shimmer label="Processing the request..." />
  </ComponentExample>
</template>
