<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Changes saved"
    description="Your settings have been updated successfully."
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show a title and description with the default styling."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert label="Changes saved" description="Your settings have been updated successfully." />
    </div>
  </ComponentExample>
</template>
