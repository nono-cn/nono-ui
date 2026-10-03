<script setup lang="ts">
import { HoverCard } from '@/components/ui/HoverCard'
import { Link } from '@/components/ui/Link'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { HoverCard } from '__DOCS_PACKAGE__/components/ui/HoverCard'
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'
${scriptEnd}

<template>
  <HoverCard>
    <Link to="#profile" label="@nonito" />
    <template #content><p>Frontend developer and component author.</p></template>
  </HoverCard>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Hover or focus the link to preview a profile."
    :code="code"
    :show-reset="false"
  >
    <HoverCard>
      <Link to="#profile" label="@nonito" />
      <template #content><p>Frontend developer and component author.</p></template>
    </HoverCard>
  </ComponentExample>
</template>
