<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button label="Rounded" rounded />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Rounded"
    description="Aplica una forma completamente redondeada al botón."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-3">
      <Button label="Rounded" rounded />
    </div>
  </ComponentExample>
</template>
