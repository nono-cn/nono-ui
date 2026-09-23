<script setup lang="ts">
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { AlertDialog } from '__DOCS_PACKAGE__/components/ui/AlertDialog'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
${scriptEnd}

<template>
  <AlertDialog
    label="Publish changes"
    description="These changes will be available to everyone."
    :action-button="{ label: 'Publish', severity: 'success' }"
    :cancel-button="{ label: 'Review', variant: 'outline' }"
  >
    <Button label="Publish" />
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom actions"
    description="Configure the dialog’s default action buttons."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog
      label="Publish changes"
      description="These changes will be available to everyone."
      :action-button="{ label: 'Publish', severity: 'success' }"
      :cancel-button="{ label: 'Review', variant: 'outline' }"
    >
      <Button label="Publish" />
    </AlertDialog>
  </ComponentExample>
</template>
