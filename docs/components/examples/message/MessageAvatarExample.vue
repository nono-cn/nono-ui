<script setup lang="ts">
import { Message } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'

const code = `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'
<\/script>

<template>
  <div class="grid w-full gap-4">
    <Message message="¿Has revisado el documento?" :avatar="{ label: 'Ana' }" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Avatar"
    description="Identifica al interlocutor con un avatar."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4">
      <Message message="¿Has revisado el documento?" :avatar="{ label: 'Ana' }" />
    </div>
  </ComponentExample>
</template>
