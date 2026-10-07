<script setup lang="ts">
import { FieldControl, FieldLabel } from 'reka-ui'
import { Field } from '@/components/ui/Field'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Field } from '__DOCS_PACKAGE__/components/ui/Field'
import { FieldControl, FieldLabel } from 'reka-ui'
${scriptEnd}

<template>
  <Field required class="w-full max-w-sm">
    <FieldLabel class="text-sm font-medium">Name</FieldLabel>
    <FieldControl
      placeholder="Your name"
      class="h-9 rounded-md border border-input bg-background px-3 text-sm"
    />
  </Field>
</template>`
</script>

<template>
  <ComponentExample
    title="Required control"
    description="Mark the field as required and pass that state to its control."
    :code="code"
    :show-reset="false"
  >
    <Field required class="w-full max-w-sm">
      <FieldLabel class="text-sm font-medium">Name</FieldLabel>
      <FieldControl
        placeholder="Your name"
        class="h-9 rounded-md border border-input bg-background px-3 text-sm"
      />
    </Field>
  </ComponentExample>
</template>
