<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Empty } from '__DOCS_PACKAGE__/components/ui/Empty'
${scriptEnd}

<template>
  <Empty class="w-full" label="No results">
    <Button label="Reset filters" />
  </Empty>
</template>`
</script>

<template>
  <ComponentExample
    title="Default"
    description="Add actions or links as the main content."
    :code="code"
    :show-reset="false"
  >
    <Empty class="w-full" label="No results">
      <Button label="Reset filters" />
    </Empty>
  </ComponentExample>
</template>
