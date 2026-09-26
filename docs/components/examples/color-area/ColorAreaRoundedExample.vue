<script setup lang="ts">
import { ColorArea } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'
${scriptEnd}

<template>
  <div class="flex flex-wrap justify-center gap-8">
    <figure class="grid justify-items-center gap-2">
      <ColorArea rounded />
      <figcaption class="text-sm">Rounded</figcaption>
    </figure>
    <figure class="grid justify-items-center gap-2">
      <ColorArea :rounded="false" />
      <figcaption class="text-sm">Square</figcaption>
    </figure>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Rounded"
    description="Compare the default rounded corners with square corners."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap justify-center gap-8">
      <figure class="grid justify-items-center gap-2">
        <ColorArea rounded />
        <figcaption class="text-sm">Rounded</figcaption>
      </figure>
      <figure class="grid justify-items-center gap-2">
        <ColorArea :rounded="false" />
        <figcaption class="text-sm">Square</figcaption>
      </figure>
    </div>
  </ComponentExample>
</template>
