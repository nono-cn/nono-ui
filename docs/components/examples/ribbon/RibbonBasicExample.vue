<script setup lang="ts">
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Ribbon } from '__DOCS_PACKAGE__/components/ui/Ribbon'
${scriptEnd}

<template>
  <Ribbon :ribbons="[{ label: 'New', severity: 'primary' }]" class="w-full max-w-md rounded-xl border p-12">
    <p class="text-center">Featured content</p>
  </Ribbon>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic ribbon"
    description="Add a ribbon over the content."
    :code="code"
    :show-reset="false"
  >
    <Ribbon
      :ribbons="[{ label: 'New', severity: 'primary' }]"
      class="w-full max-w-md rounded-xl border p-12"
    >
      <p class="text-center">Featured content</p>
    </Ribbon>
  </ComponentExample>
</template>
