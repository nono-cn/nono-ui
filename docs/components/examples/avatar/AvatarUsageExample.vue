<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar
    class="text-primary"
    label="NC"
    alt="Nono UI avatar"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Display a profile image with a text fallback."
    :code="code"
    :show-reset="false"
  >
    <Avatar class="text-primary" label="NC" alt="Nono UI avatar" />
  </ComponentExample>
</template>
