<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'
${scriptEnd}

<template>
  <Bubble>Hi, how is the project going?</Bubble>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show a conversation message."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full flex-col gap-3">
      <Bubble>Hi, how is the project going?</Bubble>
    </div>
  </ComponentExample>
</template>
