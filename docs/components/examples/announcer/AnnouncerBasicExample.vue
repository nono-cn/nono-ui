<script setup lang="ts">
import { Announcer } from '@/components/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Announcer } from '__DOCS_PACKAGE__/components/Announcer'
${scriptEnd}

<template>
  <Announcer message="Changes saved successfully" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic message"
    description="Announce a message without adding visible content."
    :code="code"
    :show-reset="false"
  >
    <Announcer message="Changes saved successfully" />
  </ComponentExample>
</template>
