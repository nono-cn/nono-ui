<script setup lang="ts">
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Field } from '__DOCS_PACKAGE__/components/ui/Field'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
${scriptEnd}

<template>
  <Field
    label="Email"
    class="w-full max-w-sm"
  >
    <template #label>
      Email <span class="text-muted-foreground">(work)</span>
    </template>
    <Input
      type="email"
      placeholder="you@example.com"
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
      <Input type="email" placeholder="you@example.com" />
    </Field>
  </ComponentExample>
</template>
