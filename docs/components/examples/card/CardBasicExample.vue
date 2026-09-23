<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
${scriptEnd}

<template>
  <Card
    label="Account overview"
    description="View the latest information about your account."
  >
    <p>Your account is up to date.</p>
  </Card>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic card"
    description="Use a header with main content."
    :code="code"
    :show-reset="false"
  >
    <Card
      label="Account overview"
      description="View the latest information about your account."
      class="w-full max-w-md"
    >
      <p>Your account is up to date.</p>
    </Card>
  </ComponentExample>
</template>
