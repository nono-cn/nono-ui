<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/ui/Alert'
${scriptEnd}

<template>
  <Alert
    label="Session active"
    description="You can dismiss this alert using the button on the right."
    :closable="true"
  />
</template>`
</script>

<template>
  <ComponentExample
    title="Closable"
    description="Show the default close button."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Session active"
        description="You can dismiss this alert using the button on the right."
        :closable="true"
      />
    </div>
  </ComponentExample>
</template>
