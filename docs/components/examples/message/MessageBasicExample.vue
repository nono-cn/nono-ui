<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${scriptEnd}

<template>
  <Message message="Hi! Did you get a chance to review the pull request?" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show a chat message inside a bubble."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-xl">
      <Message message="Hi! Did you get a chance to review the pull request?" />
    </div>
  </ComponentExample>
</template>
