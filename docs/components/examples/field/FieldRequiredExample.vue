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
    label="Name"
    required
    class="w-full max-w-sm"
  >
    <Input required placeholder="Your name" />
  </Field>
</template>`
</script>

<template>
  <ComponentExample
    title="Required control"
    description="Mark Field and your Input as required."
    :code="code"
    :show-reset="false"
  >
    <Field label="Name" required class="w-full max-w-sm">
      <Input required placeholder="Your name" />
    </Field>
  </ComponentExample>
</template>
