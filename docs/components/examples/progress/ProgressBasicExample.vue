<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <Progress :value="68" :max="100" label="68%" aria-label="File download progress" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show current progress with a visible label and an accessible name."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-md">
      <Progress :value="68" :max="100" label="68%" aria-label="File download progress" />
    </div>
  </ComponentExample>
</template>
