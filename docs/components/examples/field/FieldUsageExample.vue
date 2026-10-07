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
    description="We will use this address to contact you."
    class="w-full max-w-sm"
  >
    <Input
      type="email"
      placeholder="you@example.com"
    />
  </Field>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Use your Input inside Field and connect it to the label and description."
    :code="code"
    :show-reset="false"
  >
    <Field
      label="Email"
      description="We will use this address to contact you."
      class="w-full max-w-sm"
    >
      <Input type="email" placeholder="you@example.com" />
    </Field>
  </ComponentExample>
</template>
