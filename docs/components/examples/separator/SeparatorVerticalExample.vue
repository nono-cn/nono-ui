<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="flex h-16 w-full max-w-md items-center justify-center gap-4 rounded-lg border bg-card px-4">
    <span>General</span>
    <Separator orientation="vertical" />
    <span>Privacy</span>
    <Separator orientation="vertical" />
    <span>Help</span>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Vertical separation"
    description="Divide items inside a bordered container that provides context and height for the separator."
    :code="code"
    :show-reset="false"
  >
    <div
      class="flex h-16 w-full max-w-md items-center justify-center gap-4 rounded-lg border bg-card px-4"
    >
      <span>General</span>
      <Separator orientation="vertical" />
      <span>Privacy</span>
      <Separator orientation="vertical" />
      <span>Help</span>
    </div>
  </ComponentExample>
</template>
