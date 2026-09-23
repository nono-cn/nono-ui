<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
${scriptEnd}

<template>
  <Avatar
    src="https://i.pravatar.cc/150?img=3"
    label="NC"
    alt="Example profile"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Src"
    description="Load the profile image from a URL."
    :code="code"
    :show-reset="false"
  >
    <Avatar src="https://i.pravatar.cc/150?img=3" label="NC" alt="Example profile" />
  </ComponentExample>
</template>
