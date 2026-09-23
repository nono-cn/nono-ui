<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Unstable connection"
    description="The close button inherits the alert’s style unless you customize it."
    severity="warning"
    :closable="true"
    :close-button="{ size: 'sm', variant: 'outline', severity: 'secondary' }"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="CloseButton"
    description="Customize the close button’s size, variant, and severity."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Unstable connection"
        description="The close button inherits the alert’s style unless you customize it."
        severity="warning"
        :closable="true"
        :close-button="{ size: 'sm', variant: 'outline', severity: 'secondary' }"
      />
    </div>
  </ComponentExample>
</template>
