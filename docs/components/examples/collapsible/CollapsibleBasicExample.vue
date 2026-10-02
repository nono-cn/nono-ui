<script setup lang="ts">
import { Collapsible } from '@/components/ui/Collapsible'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Collapsible } from '__DOCS_PACKAGE__/components/ui/Collapsible'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <Collapsible>
    <Button label="Project details" variant="outline" />
    <template #content>
      <p class="pt-3 text-sm">This project is shared with the design team.</p>
    </template>
  </Collapsible>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="An unstyled disclosure."
    :code="code"
    :show-reset="false"
  >
    <Collapsible class="w-full max-w-md">
      <Button label="Project details" variant="outline" />
      <template #content>
        <p class="pt-3 text-sm">This project is shared with the design team.</p>
      </template>
    </Collapsible>
  </ComponentExample>
</template>
