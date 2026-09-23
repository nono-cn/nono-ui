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
  <div class="w-full max-w-none rounded-lg border border-border p-6">
    <FieldSet
      class="w-full"
      legend="Contact details"
      description="We’ll use this information to contact you."
    >
      <div class="grid gap-2">
        <Label for="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
    </FieldSet>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Group related controls under a legend and description."
    :code="code"
    :show-reset="false"
  >
    <div class="w-full max-w-none rounded-lg border border-border p-6">
      <FieldSet
        class="w-full"
        legend="Contact details"
        description="We’ll use this information to contact you."
      >
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </FieldSet>
    </div>
  </ComponentExample>
</template>
