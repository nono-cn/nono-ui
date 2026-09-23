<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar :icon="{ name: 'user' }" />
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Show an icon in the avatar fallback."
    :code="code"
    :show-reset="false"
  >
    <Avatar :icon="{ name: 'user' }" />
  </ComponentExample>
</template>
