<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Custom theme"
    description="The CSS color overrides the alert’s semantic color."
    color="#7c3aed"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Color"
    description="Apply a custom CSS color to the alert style."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Custom theme"
        description="The CSS color overrides the alert’s semantic color."
        color="#7c3aed"
      />
    </div>
  </ComponentExample>
</template>
