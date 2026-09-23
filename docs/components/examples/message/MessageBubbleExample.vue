<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${scriptEnd}

<template>
  <div class="grid w-full gap-4">
    <Message message="Informational message" :bubble="{ variant: 'outline', severity: 'primary' }" />
    <Message message="Completed message" :bubble="{ variant: 'soft', severity: 'success' }" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Bubble"
    description="Configure the inner Message bubble."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4">
      <Message
        message="Informational message"
        :bubble="{ variant: 'outline', severity: 'primary' }"
      />
      <Message message="Completed message" :bubble="{ variant: 'soft', severity: 'success' }" />
    </div>
  </ComponentExample>
</template>
