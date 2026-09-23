<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar
    src="/missing-avatar.png"
    :delay-ms="300"
    label="NC"
    alt="Example profile"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="DelayMs"
    description="Delay the fallback content while the image is unavailable."
    :code="code"
    :show-reset="false"
  >
    <Avatar src="/missing-avatar.png" :delay-ms="300" label="NC" alt="Example profile" />
  </ComponentExample>
</template>
