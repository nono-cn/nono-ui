<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${scriptEnd}

<template>
  <div class="grid w-full gap-4">
    <Message message="Have you reviewed the document?" :avatar="{ label: 'Ana' }" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Avatar"
    description="Identify the sender with an avatar."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4">
      <Message message="Have you reviewed the document?" :avatar="{ label: 'Ana' }" />
    </div>
  </ComponentExample>
</template>
