<script setup lang="ts">
import { FieldSet, type FieldSetUI } from '@/components/ui/FieldSet'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ui: FieldSetUI = {
  legend: () => ({ class: 'text-primary' }),
  description: () => ({ id: 'account-help', class: 'italic' }),
  group: () => ({ class: 'rounded-md border border-border p-4' }),
}

const code = `<script setup lang="ts">
import { FieldSet, type FieldSetUI } from '__DOCS_PACKAGE__/components/ui/FieldSet'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'

const ui: FieldSetUI = {
  legend: () => ({ class: 'text-primary' }),
  description: () => ({ id: 'account-help', class: 'italic' }),
  group: () => ({ class: 'rounded-md border border-border p-4' }),
}
${scriptEnd}

<template>
  <FieldSet
    class="w-full"
    legend="Account"
    description="This name appears on your profile."
    aria-describedby="account-help"
    :ui="ui"
  >
    <div class="grid gap-2">
      <Label for="account-name">Name</Label>
      <Input id="account-name" placeholder="Your name" />
    </div>
  </FieldSet>
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Style each internal part and connect the description to the fieldset."
    :code="code"
    :show-reset="false"
  >
    <FieldSet
      class="w-full"
      legend="Account"
      description="This name appears on your profile."
      aria-describedby="account-help"
      :ui="ui"
    >
      <div class="grid gap-2">
        <Label for="account-name">Name</Label>
        <Input id="account-name" placeholder="Your name" />
      </div>
    </FieldSet>
  </ComponentExample>
</template>
