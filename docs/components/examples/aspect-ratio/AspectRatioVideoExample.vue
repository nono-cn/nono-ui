<script setup lang="ts">
import { AspectRatio } from '@/components/ui/AspectRatio'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { AspectRatio } from '__DOCS_PACKAGE__/components/ui/AspectRatio'
${scriptEnd}

<template>
  <AspectRatio :ratio="16 / 9" class="max-w-xl overflow-hidden rounded-lg border">
    <div class="grid size-full place-items-center bg-slate-900 text-slate-100">
      <span aria-label="Video preview">Video preview</span>
    </div>
  </AspectRatio>
</template>`
</script>

<template>
  <ComponentExample
    title="Widescreen format"
    description="The 16:9 ratio is common for video."
    :code="code"
    :show-reset="false"
  >
    <AspectRatio :ratio="16 / 9" class="w-full max-w-xl overflow-hidden rounded-lg border">
      <div class="grid size-full place-items-center bg-slate-900 text-slate-100">
        <span aria-label="Video preview">Video preview</span>
      </div>
    </AspectRatio>
  </ComponentExample>
</template>
