<script setup lang="ts">
import { Bubble } from '@/components/ui/Bubble'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'
${scriptEnd}

<template>
  <div class="flex w-full flex-col gap-3">
    <Bubble align="start">Received message</Bubble>
    <Bubble align="end">Sent message</Bubble>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Align"
    description="Place the bubble at the start or end of the container."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full flex-col gap-3">
      <Bubble align="start">Received message</Bubble>
      <Bubble align="end">Sent message</Bubble>
    </div>
  </ComponentExample>
</template>
