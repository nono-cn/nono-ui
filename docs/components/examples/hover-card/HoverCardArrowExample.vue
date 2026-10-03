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
  <HoverCard show-arrow :arrow="{ width: 16, height: 8, rounded: true }">
    <Link to="#profile" label="@nonito" />
    <template #content><p>Custom rounded arrow.</p></template>
  </HoverCard>
</template>`
</script>

<template>
  <ComponentExample
    title="Arrow"
    description="Show a rounded arrow with a custom size."
    :code="code"
    :show-reset="false"
  >
    <HoverCard show-arrow :arrow="{ width: 16, height: 8, rounded: true }">
      <Link to="#profile" label="@nonito" />
      <template #content><p>Custom rounded arrow.</p></template>
    </HoverCard>
  </ComponentExample>
</template>
