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
    label="Unsaved changes"
    description="Do you want to leave without saving your changes?"
    :icon="{ name: 'warning' }"
  >
    <Button label="Leave" variant="outline" />
  </AlertDialog>
</template>`
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Reinforce the dialog’s context with an icon."
    :code="code"
    :show-reset="false"
  >
    <AlertDialog
      label="Unsaved changes"
      description="Do you want to leave without saving your changes?"
      :icon="{ name: 'warning' }"
    >
      <Button label="Leave" variant="outline" />
    </AlertDialog>
  </ComponentExample>
</template>
