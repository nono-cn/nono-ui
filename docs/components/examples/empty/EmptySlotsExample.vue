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
  <Empty class="w-full" label="No results" description="Try another search.">
    <template #label>
      <span class="text-primary">Nothing matched</span>
    </template>
    <template #description>
      <span>Change your search terms or clear the active filters.</span>
    </template>
    <Button label="Clear filters" />
  </Empty>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Replace the label and description, and provide custom content."
    :code="code"
    :show-reset="false"
  >
    <Empty class="w-full" label="No results" description="Try another search.">
      <template #label>
        <span class="text-primary">Nothing matched</span>
      </template>
      <template #description>
        <span>Change your search terms or clear the active filters.</span>
      </template>
      <Button label="Clear filters" />
    </Empty>
  </ComponentExample>
</template>
