<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
${scriptEnd}

<template>
  <div class="flex flex-col gap-4">
    <Message :avatar="{ label: 'AL' }" message="Can we ship it today?">
      <template #header>Ana López</template>
      <template #footer>10:24</template>
    </Message>
    <Message align="end" :bubble="{ variant: 'solid', color: 'primary' }" message="Yes, after lunch.">
      <template #footer>Read · 10:25</template>
    </Message>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Header and footer"
    description="Use the header and footer slots for the sender name, time or delivery state."
    :code="code"
    :show-reset="false"
  >
    <div class="flex w-full max-w-xl flex-col gap-4">
      <Message :avatar="{ label: 'AL' }" message="Can we ship it today?">
        <template #header>Ana López</template>
        <template #footer>10:24</template>
      </Message>
      <Message
        align="end"
        :bubble="{ variant: 'solid', color: 'primary' }"
        message="Yes, after lunch."
      >
        <template #footer>Read · 10:25</template>
      </Message>
    </div>
  </ComponentExample>
</template>
