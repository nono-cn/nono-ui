<script setup lang="ts">
import { FieldControl, FieldDescription, FieldLabel } from 'reka-ui'
import { Field } from '@/components/ui/Field'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Field } from '__DOCS_PACKAGE__/components/ui/Field'
import { FieldControl, FieldDescription, FieldLabel } from 'reka-ui'
${scriptEnd}

<template>
  <Field class="w-full max-w-sm">
    <FieldLabel class="text-sm font-medium">Email</FieldLabel>
    <FieldControl
      type="email"
      placeholder="you@example.com"
      class="h-9 rounded-md border border-input bg-background px-3 text-sm"
    />
    <FieldDescription class="text-sm text-muted-foreground">
      We will use this address to contact you.
    </FieldDescription>
  </Field>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Connect a label and description to a control inside Field."
    :code="code"
    :show-reset="false"
  >
    <Field class="w-full max-w-sm">
      <FieldLabel class="text-sm font-medium">Email</FieldLabel>
      <FieldControl
        type="email"
        placeholder="you@example.com"
        class="h-9 rounded-md border border-input bg-background px-3 text-sm"
      />
      <FieldDescription class="text-sm text-muted-foreground">
        We will use this address to contact you.
      </FieldDescription>
    </Field>
  </ComponentExample>
</template>
