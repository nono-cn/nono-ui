<script setup lang="ts">
import { Link } from '@/components/ui/Link'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Link :to="{ path: '/components/button' }" label="Internal route" />
    <Link to="https://example.com" label="External site" target="_blank" rel="noopener noreferrer" />
    <Link label="No destination" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Destinations"
    description="The to prop accepts a route object or an external URL. Omit it for a non-navigating element."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <Link :to="{ path: '/components/button' }" label="Internal route" />
      <Link
        to="https://example.com"
        label="External site"
        target="_blank"
        rel="noopener noreferrer"
      />
      <Link label="No destination" />
    </div>
  </ComponentExample>
</template>
