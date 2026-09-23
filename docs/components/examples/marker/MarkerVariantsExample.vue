<script setup lang="ts">
import { Marker } from '@/components/ui/Marker'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Marker } from '__DOCS_PACKAGE__/components/ui/Marker'
${scriptEnd}

<template>
  <div class="grid w-full gap-2">
    <Marker variant="default" label="Value updated" />
    <Marker variant="border" label="Last updated: just now" />
    <Marker variant="separator" label="More information" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variants"
    description="Adapt the visual separation to the content context."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-2">
      <Marker variant="default" label="Value updated" />
      <Marker variant="border" label="Last updated: just now" />
      <Marker variant="separator" label="More information" />
    </div>
  </ComponentExample>
</template>
