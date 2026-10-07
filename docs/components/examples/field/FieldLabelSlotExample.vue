<script setup lang="ts">
import { FieldControl } from 'reka-ui'
import { Field } from '@/components/ui/Field'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Field } from '__DOCS_PACKAGE__/components/ui/Field'
import { FieldControl } from 'reka-ui'
${scriptEnd}

<template>
  <Field label="Email" class="w-full max-w-sm">
    <template #label>
      Email <span class="text-muted-foreground">(work)</span>
    </template>
    <FieldControl
      type="email"
      placeholder="you@example.com"
      class="h-9 rounded-md border border-input bg-background px-3 text-sm"
    />
  </Field>
</template>`
</script>

<template>
  <ComponentExample
    title="Label slot"
    description="Replace the label text with custom content."
    :code="code"
    :show-reset="false"
  >
    <Field label="Email" class="w-full max-w-sm">
      <template #label> Email <span class="text-muted-foreground">(work)</span> </template>
      <FieldControl
        type="email"
        placeholder="you@example.com"
        class="h-9 rounded-md border border-input bg-background px-3 text-sm"
      />
    </Field>
  </ComponentExample>
</template>
