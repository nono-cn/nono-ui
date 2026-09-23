<script setup lang="ts">
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-2">
    <Label for="name">Name</Label>
    <Input
      id="name"
      placeholder="Enter your name"
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Associate a visible label with a form control."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-sm gap-2">
      <Label for="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  </ComponentExample>
</template>
