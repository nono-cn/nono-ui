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
    <Label for="custom-color">Custom color</Label>
    <Textarea
      id="custom-color"
      color="#7c3aed"
      severity="error"
      :highlight="true"
      placeholder="This custom color overrides severity."
    />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Custom color"
    description="Use a custom color that takes precedence over severity."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-2">
      <Label for="custom-color">Custom color</Label>
      <Textarea
        id="custom-color"
        color="#7c3aed"
        severity="error"
        :highlight="true"
        placeholder="This custom color overrides severity."
      />
    </div>
  </ComponentExample>
</template>
