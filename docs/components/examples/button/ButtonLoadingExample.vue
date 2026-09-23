<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="Saving" loading />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Loading"
    description="Show the loading state to indicate that the action is temporarily busy."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="Saving" loading />
    </div>
  </ComponentExample>
</template>
