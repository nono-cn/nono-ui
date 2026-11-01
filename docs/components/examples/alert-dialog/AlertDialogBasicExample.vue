<script setup lang="ts">
import { AlertDialog } from '@/components/AlertDialog'
import { Button } from '@/components/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { AlertDialog } from '__DOCS_PACKAGE__/components/AlertDialog'
import { Button } from '__DOCS_PACKAGE__/components/Button'
${scriptEnd}

<template>
  <AlertDialog label="Delete this item?" description="This action cannot be undone.">
    <Button label="Delete" color="error" />
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic confirmation"
    description="Open a confirmation dialog."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog label="Delete this item?" description="This action cannot be undone.">
      <Button label="Delete" color="error" />
    </AlertDialog>
  </ComponentExample>
</template>
