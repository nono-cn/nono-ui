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
  <div class="grid w-full max-w-lg gap-2">
    <Label for="amount-input">Amount</Label>
    <Input id="amount-input" type="number" min="0" placeholder="0.00">
      <template #leading>$</template>
      <template #trailing>USD</template>
    </Input>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Leading and trailing"
    description="Place short supporting content beside the native input."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-2">
      <Label for="amount-input">Amount</Label>
      <Input id="amount-input" type="number" min="0" placeholder="0.00">
        <template #leading>$</template>
        <template #trailing>USD</template>
      </Input>
    </div>
  </ComponentExample>
</template>
