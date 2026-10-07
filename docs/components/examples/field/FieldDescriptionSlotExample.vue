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
    <Input
      type="email"
      placeholder="you@example.com"
    />
    <template #description>
      We will only use your address for <strong>account updates</strong>.
    </template>
  </Field>
</template>`
</script>

<template>
  <ComponentExample
    title="Description slot"
    description="Replace the description text with custom content."
    :code="code"
    :show-reset="false"
  >
    <Field label="Email" class="w-full max-w-sm">
      <Input type="email" placeholder="you@example.com" />
      <template #description>
        We will only use your address for <strong>account updates</strong>.
      </template>
    </Field>
  </ComponentExample>
</template>
