<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar label="JD" />
</template>`
</script>

<template>
  <ComponentExample
    title="Label"
    description="Show text in the avatar fallback."
    :code="code"
    :show-reset="false"
  >
    <Avatar label="JD" />
  </ComponentExample>
</template>
