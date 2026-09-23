<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <div class="grid w-full max-w-2xl gap-3">
    <Alert label="Primary" description="Primary information." severity="primary" />
    <Alert label="Secondary" description="Secondary information." severity="secondary" />
    <Alert label="Warning" description="Please review this notice." severity="warning" />
    <Alert label="Success" description="The operation completed successfully." severity="success" />
    <Alert label="Error" description="The operation could not be completed." severity="error" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Compare the available semantic colors."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-2xl gap-3">
      <Alert label="Primary" description="Primary information." severity="primary" />
      <Alert label="Secondary" description="Secondary information." severity="secondary" />
      <Alert label="Warning" description="Please review this notice." severity="warning" />
      <Alert
        label="Success"
        description="The operation completed successfully."
        severity="success"
      />
      <Alert label="Error" description="The operation could not be completed." severity="error" />
    </div>
  </ComponentExample>
</template>
