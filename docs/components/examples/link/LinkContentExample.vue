<script setup lang="ts">
import { Link } from '@/components/ui/Link'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Link to="/components" label="Components" icon="folder" trailing-icon="chevronRight" />
    <Link to="/components/button" label="Fallback label">
      <template #leading><span aria-hidden="true">★</span></template>
      Button docs
      <template #trailing><span aria-hidden="true">↗</span></template>
    </Link>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Content and icons"
    description="Use Button's icon props or its leading, default, and trailing slots. Slot content replaces its fallback."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-4">
      <Link to="/components" label="Components" icon="folder" trailing-icon="chevronRight" />
      <Link to="/components/button" label="Fallback label">
        <template #leading><span aria-hidden="true">★</span></template>
        Button docs
        <template #trailing><span aria-hidden="true">↗</span></template>
      </Link>
    </div>
  </ComponentExample>
</template>
