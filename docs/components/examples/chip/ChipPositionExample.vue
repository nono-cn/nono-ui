<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
import { Chip } from '__DOCS_PACKAGE__/components/ui/Chip'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Chip position="top-left"><Avatar label="TL" size="lg" /></Chip>
    <Chip position="top-right"><Avatar label="TR" size="lg" /></Chip>
    <Chip position="bottom-left"><Avatar label="BL" size="lg" /></Chip>
    <Chip position="bottom-right"><Avatar label="BR" size="lg" /></Chip>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Position"
    description="Place the chip in one of the available corners."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-6">
      <Chip position="top-left"><Avatar label="TL" size="lg" /></Chip>
      <Chip position="top-right"><Avatar label="TR" size="lg" /></Chip>
      <Chip position="bottom-left"><Avatar label="BL" size="lg" /></Chip>
      <Chip position="bottom-right"><Avatar label="BR" size="lg" /></Chip>
    </div>
  </ComponentExample>
</template>
