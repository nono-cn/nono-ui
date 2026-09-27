<script setup lang="ts">
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { AspectRatio } from '__DOCS_PACKAGE__/components/ui/AspectRatio'
${scriptEnd}

<template>
  <AspectRatio :ratio="1" class="max-w-sm overflow-hidden rounded-lg border">
    <div class="grid size-full place-items-center bg-muted/40">Content</div>
  </AspectRatio>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="A square container for visual content."
    :code="code"
    :show-reset="false"
  >
    <AspectRatio :ratio="1" class="w-full max-w-sm overflow-hidden rounded-lg border">
      <div class="grid size-full place-items-center bg-muted/40">Content</div>
    </AspectRatio>
  </ComponentExample>
</template>
