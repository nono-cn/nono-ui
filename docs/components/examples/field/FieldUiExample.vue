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
  <Field
    label="Email"
    description="We will use this address to contact you."
    class="w-full max-w-sm"
    :ui="{
      label: () => ({ class: 'text-primary underline underline-offset-4' }),
      description: () => ({ class: 'italic' }),
    }"
  >
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
    title="Label UI"
    description="Customize the label and description through ui resolvers."
    :code="code"
    :show-reset="false"
  >
    <Field
      label="Email"
      description="We will use this address to contact you."
      class="w-full max-w-sm"
      :ui="{
        label: () => ({ class: 'text-primary underline underline-offset-4' }),
        description: () => ({ class: 'italic' }),
      }"
    >
      <FieldControl
        type="email"
        placeholder="you@example.com"
        class="h-9 rounded-md border border-input bg-background px-3 text-sm"
      />
    </Field>
  </ComponentExample>
</template>
