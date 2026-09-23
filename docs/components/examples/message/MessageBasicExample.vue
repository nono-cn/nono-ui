<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${scriptEnd}

<template>
  <Message message="Hi, how is the project going?" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic message"
    description="Display a conversation message."
    :code="code"
    :show-reset="false"
  >
    <Message message="Hi, how is the project going?" />
  </ComponentExample>
</template>
