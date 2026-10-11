<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-4">
    <p>Account details</p>
    <Separator />
    <p>Preferences</p>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Separate two groups of content with a horizontal line."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-sm gap-4">
      <p>Account details</p>
      <Separator />
      <p>Preferences</p>
    </div>
  </ComponentExample>
</template>
