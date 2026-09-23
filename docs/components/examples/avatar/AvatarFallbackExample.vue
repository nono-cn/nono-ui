<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar>
    <template #fallback>
      <span class="font-semibold">JD</span>
    </template>
  </Avatar>
</template>`
</script>

<template>
  <ComponentExample
    title="Fallback"
    description="Replace the avatar’s fallback content entirely."
    :code="code"
    :show-reset="false"
  >
    <Avatar>
      <template #fallback>
        <span class="font-semibold">JD</span>
      </template>
    </Avatar>
  </ComponentExample>
</template>
