<script setup lang="ts">
import { ColorArea } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const code = `<script setup lang="ts">
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center justify-center gap-8">
    <figure v-for="size in sizes" :key="size" class="grid justify-items-center gap-2">
      <ColorArea :size="size" />
      <figcaption class="text-sm">{{ size }}</figcaption>
    </figure>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Compare the available ColorArea dimensions."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center justify-center gap-8">
      <figure v-for="size in sizes" :key="size" class="grid justify-items-center gap-2">
        <ColorArea :size="size" />
        <figcaption class="text-sm">{{ size }}</figcaption>
      </figure>
    </div>
  </ComponentExample>
</template>
