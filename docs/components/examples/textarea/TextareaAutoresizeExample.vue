<script setup lang="ts">
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="growing-text">Message</Label>
    <Textarea id="growing-text" autoresize placeholder="Start typing to grow this field..." />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Autoresize"
    description="Let the field grow to fit its content."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-2">
      <Label for="growing-text">Message</Label>
      <Textarea id="growing-text" autoresize placeholder="Start typing to grow this field..." />
    </div>
  </ComponentExample>
</template>
