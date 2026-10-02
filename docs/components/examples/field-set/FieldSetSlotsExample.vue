<script setup lang="ts">
import { FieldSet } from '@/components/ui/FieldSet'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { FieldSet } from '__DOCS_PACKAGE__/components/ui/FieldSet'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <FieldSet class="w-full" legend="Fallback legend" description="Fallback description">
    <template #legend>Account details</template>
    <template #description>Choose a public display name.</template>
    <div class="grid gap-2">
      <Label for="display-name">Display name</Label>
      <Input id="display-name" placeholder="Your name" />
    </div>
  </FieldSet>
</template>`
</script>

<template>
  <ComponentExample
    title="Slots"
    description="Replace the legend and description while retaining the fieldset and its controls."
    :code="code"
    :show-reset="false"
  >
    <FieldSet class="w-full" legend="Fallback legend" description="Fallback description">
      <template #legend>Account details</template>
      <template #description>Choose a public display name.</template>
      <div class="grid gap-2">
        <Label for="display-name">Display name</Label>
        <Input id="display-name" placeholder="Your name" />
      </div>
    </FieldSet>
  </ComponentExample>
</template>
