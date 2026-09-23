<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${scriptEnd}

<template>
  <div class="grid w-full gap-4">
    <Message align="start" message="Received message" />
    <Message align="end" message="Sent message" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Align"
    description="Align each message based on who sent it."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4">
      <Message align="start" message="Received message" />
      <Message align="end" message="Sent message" />
    </div>
  </ComponentExample>
</template>
