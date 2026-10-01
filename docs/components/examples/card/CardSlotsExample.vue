<script setup lang="ts">
import { Card } from '@/components/ui/Card'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
${scriptEnd}

<template>
  <Card class="w-full max-w-md">
    <template #label><span>Team activity</span></template>
    <template #description><span>Updates from your workspace</span></template>
    <p>Three new updates are available.</p>
  </Card>
</template>`
</script>

<template>
  <ComponentExample
    title="Label and description slots"
    description="Replace the generated heading and description content."
    :code="code"
    :show-reset="false"
  >
    <Card class="w-full max-w-md">
      <template #label><span>Team activity</span></template>
      <template #description><span>Updates from your workspace</span></template>
      <p>Three new updates are available.</p>
    </Card>
  </ComponentExample>
</template>
