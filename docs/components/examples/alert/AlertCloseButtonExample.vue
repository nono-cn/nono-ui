<script setup lang="ts">
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Alert } from '__DOCS_PACKAGE__/components/Alert'
import { Button } from '__DOCS_PACKAGE__/components/Button'
${scriptEnd}

<template>
  <Alert
    label="Unstable connection"
    description="Use the close slot to render your own close control."
    color="warning"
    :closable="true"
  >
    <template #close="{ close }">
      <Button label="Dismiss" size="xs" variant="outline" color="secondary" @click="close" />
    </template>
  </Alert>
</template>`
</script>

<template>
  <ComponentExample
    title="Close slot"
    description="Replace the default close button using the close slot."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-2xl">
      <Alert
        label="Unstable connection"
        description="Use the close slot to render your own close control."
        color="warning"
        :closable="true"
      >
        <template #close="{ close }">
          <Button label="Dismiss" size="xs" variant="outline" color="secondary" @click="close" />
        </template>
      </Alert>
    </div>
  </ComponentExample>
</template>
